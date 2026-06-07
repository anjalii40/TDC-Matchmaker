import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve static JSON database paths located in the database/seed folder.
const customersPath = path.resolve(__dirname, '../../database/seed/customers.json');
const profilesPath = path.resolve(__dirname, '../../database/seed/profiles.json');

export {
  customersPath,
  profilesPath
};

export function connectDB() {
  console.log("DB Connection: Connected to JSON File Database successfully.");
}
