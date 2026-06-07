import * as customerService from '../services/customerService.js';
import * as matchService from '../services/matchService.js';
import * as noteService from '../services/noteService.js';

export function getCustomers(req, res) {
  try {
    const list = customerService.getCustomers();
    return res.json(list);
  } catch (error) {
    console.error("Controller Error in getCustomers:", error);
    return res.status(500).json({ error: "Failed to load customers" });
  }
}

export function getCustomerById(req, res) {
  try {
    const customer = customerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.json(customer);
  } catch (error) {
    console.error("Controller Error in getCustomerById:", error);
    return res.status(500).json({ error: "Failed to load customer" });
  }
}

export function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;

    let customer = customerService.getCustomerById(id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    if (body.partnerPriorities) {
      return res.status(400).json({ error: "Partner priorities are read-only and cannot be altered." });
    }

    // Add note
    if (body.note) {
      customer = noteService.addNote(id, body.note);
    }

    // Propose Match
    if (body.action === 'propose') {
      customer = matchService.proposeMatch(id, body.match);
    }

    // Update Proposal Status
    if (body.action === 'update_proposal') {
      customer = matchService.updateProposalStatus(id, body.profileId, body.status);
    }

    // Toggle Paused
    if (body.action === 'toggle_paused') {
      customer = customerService.togglePaused(id);
    }

    // Toggle Closed
    if (body.action === 'toggle_closed') {
      customer = customerService.toggleClosed(id);
    }

    return res.json(customer);
  } catch (error) {
    console.error("Controller Error in updateCustomer:", error);
    return res.status(500).json({ error: "Failed to update customer" });
  }
}
