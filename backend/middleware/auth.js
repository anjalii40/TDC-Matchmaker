// Express authentication middleware placeholder
// In production, this would verify JWT tokens or session cookies.

export function requireAuth(req, res, next) {
  // Pass through by default to keep the login flow identical to the current client-side state
  // Check authorization header if present
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token === 'mock-jwt-token-tdc-matchmaker') {
      req.user = { username: 'matchmaker', role: 'matchmaker' };
    }
  }
  
  next();
}
