
const isAdmin = (req, res, next) => {
    if (!req.user ) {
        return res.status(400),json({ message: "User not authenticated" });
    }

    if (req.user.role !== "admin") {
        res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
}

export default isAdmin;