import { cartManager } from "../dao/index.dao.js";

export const getAllCarts = async (req, res) => {
    try {
        res.status(200).json(await cartManager.findMany());
    } catch (error) {
        res.status(404).json({ message: 'Error al obtener todos los carritos', error: error.message })
    }
}

export const addToCart = async (req, res) => {
    try {
        const { idCarrito, idProducto } = req.params;

        const addCart = await cartManager.addCart(idCarrito, idProducto);

        res.status(201).json(addCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto al carrito', error: error.message })
    }
}

export const getCart = async (req, res) => {
    try {
        const { Cid } = req.params;

        const cartProduct = await cartManager.findOneCartToProducts(Cid)

        res.status(200).json(cartProduct);
    } catch (error) {
        res.status(404).json({ message: 'Error al obtener el carrito', error: error.message })
    }
}

export const cartInfo = async (req, res) => {
    try {
        const data = await cartManager.findOneCartToPopulate(req.params['Cid']);

        if (data) {
            res.status(200).json(data.products);
        }

    } catch (error) {
        res.status(404).json({ message: 'Error al obtener datos de los productos dentro del carrito', error: error.message })
    }
}

export const updateCart = async (req, res) => {
    try {
        const products = req.body;

        const updateCarrito = await cartManager.updateOne(req.params['Cid'], products);

        res.status(201).json(updateCarrito);
    } catch (error) {
        res.status(500).json({ message: 'Error al Actualizar el carrito', error: error.message })
    }
}

export const updatedQuantity = async (req, res) => {
    try {
        const { Cid, Pid } = req.params
        const { quantity } = req.body
        const updatedQuantity = await cartManager.updateQuantityToProduct(Cid, Pid, quantity)
        res.status(201).json(updatedQuantity)
    } catch (error) {
        res.status(500).json({ message: 'Error al Actualizar la cantidad', error: error.message })
    }
}

export const resetCart = async (req, res) => {
    try {
        const restart = await cartManager.restarCart(req.params['Cid']);

        res.status(201).json(restart);
    } catch (error) {
        res.status(500).json({ message: 'Error al resetear el carrito', error: error.message })
    }
}

export const deleteProdCart = async (req, res) => {
    try {
        const { Cid, Pid } = req.params
        const delProduct = await cartManager.deleteProductsToCart(Cid, Pid)
        res.status(201).json({ productoBorrado: delProduct })
    } catch (error) {
        res.status(500).json({ message: 'Error al borrar el producto del carrito', error: error.message })
    }
}

export const deleteCart = async (req, res) => {
    try {
        const delCart = await cartManager.deleteOne(req.params['Cid']);

        res.status(201).json({ carritoBorrado: delCart });
    } catch (error) {
        res.status(500).json({ message: 'Error al borrar el carrito', error: error.message })
    }
}