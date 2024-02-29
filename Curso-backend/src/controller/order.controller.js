import { OrderService } from "../services/orders.services.js";
import { productsServices } from "../services/products.services.js";

export const createOrder = async (req, res) => {
    try {
        const { email, ref, products } = req.body

        const filterProducts = products.filter(e => e)

        const validarStock = await new productsServices().stockProduct(filterProducts)

        const order = await new OrderService().createOrderServices(email, ref, filterProducts, validarStock)

        res.status(201).json(order)

    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
}