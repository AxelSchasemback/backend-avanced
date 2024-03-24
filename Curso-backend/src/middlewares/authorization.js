const listOfRolesForAdminContent = ['admin']

const listOfRolesForApremiumContent = ['premium']

const listOfRolesForUserContent = ['user', 'premium', 'admin']

export async function usersOnly(req, res, next) {
  if (!listOfRolesForUserContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}

export async function premiumsOnly(req, res, next) {
    if (!listOfRolesForApremiumContent.includes(req.user['rol'])) {
      return next(new Error('not authorized'))
    }
    next()
  }

export async function adminsOnly(req, res, next) {
  if (!listOfRolesForAdminContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}