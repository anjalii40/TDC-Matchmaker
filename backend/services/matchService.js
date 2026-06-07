import fs from 'fs';
import { getMatchesForCustomer } from '../lib/matching/matchmaker.js';
import { getAIIntroduction } from '../lib/ai/openai.js';
import { getCustomerById, updateCustomerFields } from './customerService.js';
import { profilesPath as filePath, customersPath as customersFilePath } from '../config/db.js';

// Low-level helper to load profiles database
function loadProfilesJSON() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Low-level helper to load customers database
function loadCustomersJSON() {
  const data = fs.readFileSync(customersFilePath, 'utf8');
  return JSON.parse(data);
}

// Low-level helper to save customers database
function saveCustomersJSON(data) {
  fs.writeFileSync(customersFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Fetch matches list for a customer (and update matchesGenerated to true)
export async function getMatches(customerId) {
  const customer = getCustomerById(customerId);
  if (!customer) return null;

  // Auto-flag matchesGenerated to true if false/falsy
  if (!customer.matchesGenerated) {
    updateCustomerFields(customerId, { matchesGenerated: true });
  }

  const pool = loadProfilesJSON();
  const matches = getMatchesForCustomer(customer, pool);

  // Generate AI/Fallback introductions for matches
  const matchesWithIntros = await Promise.all(
    matches.map(async (m) => {
      const intro = await getAIIntroduction(customer, m.profile, m);
      return {
        ...m,
        intro
      };
    })
  );

  // Get customer again to return latest updated computed state
  const updatedCustomer = getCustomerById(customerId);

  return {
    customer: updatedCustomer,
    matches: matchesWithIntros
  };
}

// Propose a new match recommendation
export function proposeMatch(customerId, match) {
  const customers = loadCustomersJSON();
  const index = customers.findIndex(c => c.id === customerId);
  if (index === -1) return null;

  const customer = customers[index];
  if (!customer.sentMatches) {
    customer.sentMatches = [];
  }

  const existing = customer.sentMatches.find(m => m.profileId === match.profileId);
  if (!existing) {
    customer.sentMatches.push({
      profileId: match.profileId,
      firstName: match.firstName,
      lastName: match.lastName,
      designation: match.designation,
      city: match.city,
      score: match.score,
      intro: match.intro,
      status: 'Proposed',
      sentAt: new Date().toISOString()
    });
    saveCustomersJSON(customers);
  }

  return getCustomerById(customerId);
}

// Update the status of a proposal
export function updateProposalStatus(customerId, profileId, status) {
  const customers = loadCustomersJSON();
  const index = customers.findIndex(c => c.id === customerId);
  if (index === -1) return null;

  const customer = customers[index];
  if (customer.sentMatches) {
    const pIndex = customer.sentMatches.findIndex(m => m.profileId === profileId);
    if (pIndex !== -1) {
      customer.sentMatches[pIndex].status = status;
      saveCustomersJSON(customers);
    }
  }

  return getCustomerById(customerId);
}
