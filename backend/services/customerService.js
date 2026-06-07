import fs from 'fs';
import { customersPath as filePath } from '../config/db.js';

// Low-level read JSON helper
function loadJSON() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Low-level write JSON helper
function saveJSON(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Helper to compute Journey Stage tag on the fly
export function computeCustomerStatus(customer) {
  const sentMatches = customer.sentMatches || [];
  const searchPaused = !!customer.searchPaused;
  const accountClosed = !!customer.accountClosed;

  if (accountClosed || searchPaused || sentMatches.some(m => m.status === 'Accepted')) {
    return 'Closed';
  }
  if (sentMatches.length > 0) {
    return 'Matched';
  }
  if (customer.matchesGenerated) {
    return 'Active';
  }
  return 'New';
}

// Get all customers with dynamic status tag and default mappings
export function getCustomers() {
  const customers = loadJSON();
  return customers.map(c => {
    const sentMatches = c.sentMatches || [];
    const searchPaused = !!c.searchPaused;
    const accountClosed = !!c.accountClosed;
    const computedStatus = computeCustomerStatus({
      ...c,
      sentMatches,
      searchPaused,
      accountClosed
    });

    return {
      ...c,
      notes: c.notes || [],
      sentMatches,
      searchPaused,
      accountClosed,
      statusTag: computedStatus
    };
  });
}

// Get customer by ID
export function getCustomerById(id) {
  const list = getCustomers();
  return list.find(c => c.id === id) || null;
}

// Toggle paused search state
export function togglePaused(id) {
  const customers = loadJSON();
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return null;

  customers[index].searchPaused = !customers[index].searchPaused;
  saveJSON(customers);
  return getCustomerById(id);
}

// Toggle account closed state
export function toggleClosed(id) {
  const customers = loadJSON();
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return null;

  customers[index].accountClosed = !customers[index].accountClosed;
  saveJSON(customers);
  return getCustomerById(id);
}

// Helper to update database properties directly (e.g. matchesGenerated)
export function updateCustomerFields(id, fields) {
  const customers = loadJSON();
  const index = customers.findIndex(c => c.id === id);
  if (index === -1) return null;

  customers[index] = {
    ...customers[index],
    ...fields
  };
  saveJSON(customers);
  return getCustomerById(id);
}
