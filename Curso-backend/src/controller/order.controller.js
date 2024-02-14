import { OrderService } from "../services/orders.services.js";

export const createOrder = async (req, res) => {
    try {
        const { email, ref, products } = req.body

        const filterProducts = products.filter(e => e)

        const order = await new OrderService().createOrderServices(email, ref, filterProducts)

        res.status(201).json(order)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}