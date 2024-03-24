import { OrderService } from "../services/orders.service.js";
import { orderManager } from "../dao/index.dao.js";
import { productsServices } from "../services/products.service.js";

export const createOrder = async (req, res) => {
    try {
        const { email, ref, products } = req.body

        const filterProducts = products.filter(e => e)

        const validarStock = await new productsServices().stockvalidate(filterProducts)

        if (validarStock) {
            await new productsServices().stockProduct(filterProducts)
        }

        const order = await new OrderService().createOrderServices(email, ref, filterProducts, validarStock)

        res.status(201).json(order)

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const getOrderById = await orderManager.getOrderById(req.params['id'])
        res.status(200).json(getOrderById)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getOrder = async (req, res) => {
    try {
        const getOrder = await orderManager.getOrder()
        res.status(200).json(getOrder)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const putOrder = async (req, res) => {
    try {
        const order = req.body;

        const updateOrder = await orderManager.updateOrder(req.params['Cid'], order);

        res.status(201).json(updateOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const delOrder = async (req, res) => {
    try {
        const delOrder = await orderManager.delOrder(req.params['Cid']);

        res.status(201).json({ productoBorrado: delOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}