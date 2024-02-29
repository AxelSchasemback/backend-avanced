import mongoose from "mongoose";

const schemaCart = new mongoose.Schema({
    _id: { type: String, ref: 'users' },
    products:
        [{
            product: { type: String, ref: "products" },
            quantity: { type: Number }
        }]
}, {
    versionKey: false,
    strict: 'throw',
    _id: false
})

export const Carts = mongoose.model("carts", schemaCart);

// -----------------------------------------------------


export class CartDao {

    async createCart(cartId) {
        try {
            const existingCart = await Carts.findOne({ _id: cartId });
    
            if (existingCart) {
                return existingCart.toObject();
            }
    
            const cart = await Carts.create({ _id: cartId, products: [] });
    
            return cart.toObject();
            
        } catch (error) {
            throw new Error('error al crear el carrito: ' + error)
        }

    }


    async addCart(cartId, productId) {

        try {

            const cart = await Carts.findById(cartId);

            if (cart) {

                const existingProduct = cart.products.find(product => product.product === productId);

                if (!existingProduct) {

                    await Carts.findByIdAndUpdate(
                        cartId,
                        { $push: { products: { product: productId, quantity: 1 } } },
                        { new: true }
                    );
                } else {
                    const updatedCart = await Carts.findOneAndUpdate(
                        { _id: cartId, 'products.product': productId },
                        { $inc: { 'products.$.quantity': 1 } },
                        { new: true }
                    );

                    return updatedCart;
                }
            }
        } catch (error) {
            console.error('Error al añadir el producto al carrito:', error);
        }
    };

    async getCarts() {
        try {
            return await Carts.find().lean()
            
        } catch (error) {
            throw new Error('error al obtener todos los carritos: ' + error)
        }
    };

    async getPopulate(productId) {
        try {
            return await Carts.findById(productId).populate('products.product').lean()
            
        } catch (error) {
            throw new Error('error al hacer populate al id del carrito: ' + error)
        }
    }

    async getCartById(id) {
        try {
            const searchCart = await Carts.findById(id).lean()
            return searchCart
        } catch (error) {
            throw new Error('error al buscar: Carrito no encontrado ' + error)
        }
    }

    async getCartProduct(cartId, productId) {
        try {
            const cart = await Carts.findById(cartId).lean()
            const product = cart.products.find(prod => prod.product === productId)
            return product
            
        } catch (error) {
            throw new Error('Error al obtener los productos: ' + error)
        }
    }

    async restarCart(cartId) {
        const updatedCart = await Carts.findByIdAndUpdate(
            cartId,
            { $set: { products: [] } },
            { new: true }
        ).lean();
        return updatedCart
    }

    async delCart(id) {
        try {

            const deleteCart = await Carts.findByIdAndDelete(id).lean()
            return deleteCart

        } catch (error) {
            throw new Error('error al borrar: Carrito no encontrado ' + error)
        }
    }

    async delProdCart(cartId, productId) {
        try {

            const cart = await Carts.findById(cartId).lean()

            if (cart) {

                const productsinCart = cart.products.find(producto => producto._id === productId)

                if (productsinCart) {
                    await Carts.findByIdAndUpdate(
                        cartId,
                        { $pull: { products: { product: productId } } },
                        { new: true }
                    ).lean();
                } else {
                    throw new Error('error producto no encontrado')
                }

            }
        } catch (error) {
            throw new Error('error al encontrar el Carrito: ' + error)
        }

    }

    async updateCart(id, update) {
        try {

            const updateCart = await Carts.findByIdAndUpdate(id, { $set: { products: update } }, { new: true }).lean()
            return updateCart

        } catch (error) {
            throw new Error('error al actualizar carrito: ' + error)

        }
    }

    async updateQuantity(cartId, productId, quantity) {
        try {
            const updateQuantity = await Carts.findByIdAndUpdate(cartId, {
                $set: {
                    products: {
                        product: productId,
                        quantity
                    }
                }
            },
                { new: true }
            )
            return updateQuantity

        } catch (error) {
            throw new Error('error al actualizar la cantidad del carrito: ' + error)

        }
    }
}