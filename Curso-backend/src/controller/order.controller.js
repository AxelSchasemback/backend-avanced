import { OrderService } from "../services/orders.services.js";

export const createOrder = async (req, res) => {
    try {
        const { email, ref, products } = req.body

        const filterProducts = products.filter(e => e)

        const order = await new OrderService().createOrderServices(email, ref, filterProducts)

        res.json(order)
        
    } catch (error) {
        console.error('Error al crear orden de compra:', error);
        res.status(500).json({ error: 'Error interno del servidor al crear orden de compra' });
    }
}