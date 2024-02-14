import { userManager, orderManager } from '../dao/index.dao.js'
import { emailServices } from './email.services.js'
import { logger } from '../utils/logger.js'

export class OrderService {
    async createOrderServices(email, ref, products) {

        const user = await userManager.getUserByEmail(email)

        if (!user) throw new Error('el usuario solicitado no existe')

        const filterProduct = products.filter((product) => product)

        const total = filterProduct.reduce((total, product) => total + (product.quantity * product.product.price), 0)

        const order = await orderManager.createOrder(email, ref, filterProduct, total)

        logger.info(order)

        await emailServices.send(
            user.email,
            'Gracias por Su Compra',
            `Su compra fue Realizada con exito \n Nro de Ticket: ${order.code}`
        )

        user.orders.push(order._id)
        
        await userManager.updateUser(user._id, user)

        return order
    }
}