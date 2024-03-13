import { cartManager } from "../dao/index.dao.js";

export const getAllCarts = async (req, res) => {
    try {
        res.status(200).json(await cartManager.getCarts());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { idCarrito, idProducto } = req.params;

        const addCart = await cartManager.addCart(idCarrito, idProducto);

        res.status(201).json(addCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCart = async (req, res) => {
    try {
        const { Cid } = req.params;

        const cartProduct = await cartManager.getCartProduct(Cid)

        res.status(200).json(cartProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const cartInfo = async (req, res) => {
    try {
        const data = await cartManager.getPopulate(req.params['Cid']);

        if (data) {
            res.status(200).json(data.products);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCart = async (req, res) => {
    try {
        const products = req.body;

        const updateCarrito = await cartManager.updateCart(req.params['Cid'], products);

        res.status(201).json(updateCarrito);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const resetCart = async (req, res) => {
    try {
        const restart = await cartManager.restarCart(req.params['Cid']);

        res.status(201).json(restart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCart = async (req, res) => {
    try {
        const delCart = await cartManager.delCart(req.params['Cid']);

        res.status(201).json({ productoBorrado: delCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}