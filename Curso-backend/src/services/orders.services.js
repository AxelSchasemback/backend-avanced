import { us, or } from '../dao/index.dao.js'

export class OrderService {
    async createOrderServices(email, ref, products) {

        const user = await us.getUserByEmail(email)
 
        if (!user) throw new Error('el usuario solicitado no existe')

        const filterProduct = products.filter((product) => product)

        const total = filterProduct.reduce((total, product) => total + (product.quantity * product.product.price), 0)

        const order = await or.createOrder(email, ref, filterProduct, total)

        return order
    }
}