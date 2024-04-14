const rolesMap = {
  user: ['user', 'premium', 'admin'],
  premium: ['premium', 'admin'],
  admin: ['admin'],
};

export const hasPermission = (requiredRoles) => async (req, res, next) => {
  const userRole = req.user.rol;
  if (!rolesMap[requiredRoles].includes(userRole)) {
    return next(new Error('Not authorized'));
  }
  next();
};