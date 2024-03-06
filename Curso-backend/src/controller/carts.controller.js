import { cartManager } from "../dao/index.dao.js";

export const getAllCarts = async (req, res) => {
    try {
        res.status(200).json(await cartManager.getCarts())
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addToCart = async (req, res) => {
    const { idCarrito, idProducto } = req.params;

    try {
        const updatedCart = await cartManager.addCart(idCarrito, idProducto);
        res.status(201).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCart = async (req, res) => {

    try {
        const { Cid, Pid } = req.params
        const cartProduct = await cartManager.getCartProduct(Cid, Pid)
        res.status(200).json(cartProduct)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const cartInfo = async (req, res) => {
    try {
        const data = await cartManager.getPopulate(req.params['Cid'])
        res.status(200).json(data.products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const updateCart = async (req, res) => {
    try {
        const products = req.body

        const updateCarrito = await cartManager.updateCart(req.params['Cid'], products)

        res.status(201).json(updateCarrito)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const resetCart = async (req, res) => {
    try {
        const restart = await cartManager.restarCart(req.params['Cid'])
        res.status(201).json(restart)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProductToCart = async (req, res) => {
    try {
        const { quantity } = req.body
        const updateQuantity = await cartManager.updateQuantity(req.params['Cid'], req.params['Pid'], quantity)
        res.status(201).json(updateQuantity)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCart = async (req, res) => {
    try {
        const delCart = await cartManager.delCart(req.params['Cid'])
        res.status(201).json(delCart)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}