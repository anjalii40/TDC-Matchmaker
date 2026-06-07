// Mock authentication controller
// Real credentials: matchmaker / tdc123

export function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    if (username.trim().toLowerCase() === 'matchmaker' && password === 'tdc123') {
      return res.json({ 
        success: true, 
        message: "Authentication successful", 
        token: "mock-jwt-token-tdc-matchmaker" 
      });
    }

    return res.status(401).json({ error: "Invalid username or password. Please try again." });
  } catch (error) {
    console.error("Controller Error in login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export function logout(req, res) {
  return res.json({ success: true, message: "Logged out successfully" });
}
