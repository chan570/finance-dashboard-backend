const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Role not found.",
      });
    }

    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have permission for this action.",
      });
    }

    next();
  };
};

export default allowRoles;