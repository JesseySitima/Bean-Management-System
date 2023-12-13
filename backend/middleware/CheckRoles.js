// checkRole.js
export const checkAdminRole = (req, res, next) => {
    const { role } = req.user; // Assuming role is available after token verification

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }

    next(); // User is an admin, proceed to the route handler
};
