// En tu archivo principal
import { userManager, orderManager } from '../dao/index.dao.js'
import { emailServices } from './email.service.js'
import { emailBody as emailSuccess } from './configEmail/email.Succes.js';
import { emailBody as emailFailed } from './configEmail/email.Failed.js';

export class OrderService {
    async createOrderServices(email, ref, products, validate) {
        try {
            const user = await userManager.getUserByEmail(email)

            if (!user) throw new Error('el usuario solicitado no existe')

            const filterProduct = products.filter((product) => product)

            if (validate) {
                const status = "SUCCESS"
                const total = filterProduct.reduce((total, product) => total + (product.quantity * product.product.price), 0)
                const order = await orderManager.createOrder(email, ref, status, filterProduct, total)

                // Enviar correo con contenido HTML importado
                await emailServices.send(
                    user.email,
                    'Gracias por Su Compra',
                    emailSuccess
                )

                user.orders.push(order._id)
                await userManager.updateUser(user._id, user)

                return order
            } else {
                const status = "FAILED"
                const total = filterProduct.reduce((total, product) => total + (product.quantity * product.product.price), 0)
                const order = await orderManager.createOrder(email, ref, status, filterProduct, total)

                // Enviar correo con contenido HTML importado
                await emailServices.send(
                    user.email,
                    'Algo Salio MAL',
                    emailFailed
                )

                user.orders.push(order._id)
                await userManager.updateUser(user._id, user)

                return order
            }
        } catch (error) {
            throw new Error('Error al crear Order: ' + error)
        }
    }
}