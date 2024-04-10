import { userManager } from "../dao/index.dao.js";
import { emailServices } from "../services/email.service.js";
import { sendDeleteUser } from "../services/configEmail/sendDeleteUser.js";
import { logger } from "./logger.js";

export async function deleteInactiveUser() {
  try {
    const inactivityLimit = new Date(Date.now() - (2 * 24 * 60 * 60 * 1000));
    const inactivos = await userManager.findMany({ last_connection: { $lt: inactivityLimit } });

    for (const usuario of inactivos) {
      await emailServices.send(
        usuario.email,
        'Cuenta Borrada',
        sendDeleteUser(`Cuenta Borrada`)
      );
      await userManager.deleteOne(usuario._id);
      // @ts-ignore
      logger.user(`Usuario - ${usuario.email} - eliminado debido a inactividad.`);
    }

    logger.info('Proceso de eliminación de cuentas inactivas completado.');
  } catch (error) {
    throw new Error('Error al eliminar cuentas inactivas ' + error.message);
  }
}