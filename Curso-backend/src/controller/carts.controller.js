import { CartManagerMongo } from "../dao/cart.dao.js"

const cm = new CartManagerMongo()

export const addToCart = async (req, res) => {
    const { idCarrito, idProducto } = req.params;

    try {
        const updatedCart = await cm.addCart(idCarrito, idProducto);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const getCart = async (req, res) => {

    try {
        const { Cid, Pid } = req.params
        const cartProduct = await cm.getCartProduct(Cid, Pid)
        res.json(cartProduct)
    } catch (error) {
        res.send(error.message)
    }
}

export const cartInfo = async (req, res) => {

    const data = await cm.getPopulate(req.params['Cid'])

    res.json(data.products)
}

export const updateCart = async (req, res) => {
    try {
        const products = req.body

        const updateCarrito = await cm.updateCart(req.params['Cid'], products)

        res.json(updateCarrito)
    } catch (error) {
        res.send(error.message)
    }
}

export const resetCart = async (req, res) => {
    try {
        const restart = await cm.restarCart(req.params['Cid'])
        res.json(restart)
    } catch (error) {
        res.send(error.message)
    }
}

export const updateProductToCart = async (req, res) => {
    try {
        const { quantity } = req.body
        const updateQuantity = await cm.updateQuantity(req.params['Cid'], req.params['Pid'], quantity)
        res.json(updateQuantity)
    } catch (error) {
        res.send(error.message)
    }
}

export const deleteCart = async (req, res) => {
    try {
        const delCart = await cm.delCart(req.params['Cid'])
        res.json(delCart)
    } catch (error) {
        res.send(error.message)
    }
}