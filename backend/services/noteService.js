import fs from 'fs';
import { getCustomerById } from './customerService.js';
import { customersPath as customersFilePath } from '../config/db.js';

// Low-level helper to load customers database
function loadCustomersJSON() {
  const data = fs.readFileSync(customersFilePath, 'utf8');
  return JSON.parse(data);
}

// Low-level helper to save customers database
function saveCustomersJSON(data) {
  fs.writeFileSync(customersFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Add note to a customer profile
export function addNote(customerId, noteText) {
  const customers = loadCustomersJSON();
  const index = customers.findIndex(c => c.id === customerId);
  if (index === -1) return null;

  const customer = customers[index];
  if (!customer.notes) {
    customer.notes = [];
  }

  customer.notes.unshift({
    id: String(Date.now()),
    text: noteText,
    date: new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  });

  saveCustomersJSON(customers);
  return getCustomerById(customerId);
}
