import * as matchService from '../services/matchService.js';

export async function getMatches(req, res) {
  try {
    const { id } = req.params;
    const result = await matchService.getMatches(id);
    if (!result) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.json(result);
  } catch (error) {
    console.error("Controller Error in getMatches:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
