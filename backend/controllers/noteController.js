import * as noteService from '../services/noteService.js';

export function addNote(req, res) {
  try {
    const { id } = req.params;
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: "Note text is required" });
    }

    const updatedCustomer = noteService.addNote(id, text);
    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.json(updatedCustomer);
  } catch (error) {
    console.error("Controller Error in addNote:", error);
    return res.status(500).json({ error: "Failed to add note" });
  }
}
