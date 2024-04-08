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

    /**
     * @param {string} cartId
     */
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


    /**
     * @param {String} cartId
     * @param {String} productId
     */
    async addCart(cartId, productId) {

        try {

            const cart = await Carts.findById(cartId);

            const existingProduct = cart.products.find(products => products.product === productId);

            if (!existingProduct) {

                const addCart = await Carts.findByIdAndUpdate(
                    cartId,
                    { $push: { products: { product: productId, quantity: 1 } } },
                    { new: true }
                );
                return addCart
            } else {
                const updatedCart = await Carts.findOneAndUpdate(
                    { _id: cartId, 'products.product': productId },
                    { $inc: { 'products.$.quantity': 1 } },
                    { new: true }
                );
                return updatedCart;

            }
        } catch (error) {
            throw new Error('Error al añadir el producto al carrito: ' + error);
        }
    };

    async findMany() {
        try {
            return await Carts.find().lean()

        } catch (error) {
            throw new Error('error al obtener todos los carritos: ' + error)
        }
    };

    /**
     * @param {String} productId
     */
    async findOneCartToPopulate(productId) {
        try {
            return await Carts.findById(productId).populate('products.product').lean()

        } catch (error) {
            throw new Error('error al hacer populate al id del carrito: ' + error)
        }
    }

    /**
     * @param {String} criteria
     */
    async findOne(criteria) {
        try {
            const searchCart = await Carts.findById(criteria).lean()
            return searchCart
        } catch (error) {
            throw new Error('error al buscar: Carrito no encontrado ' + error)
        }
    }

    /**
     * @param {String} cartId
     */
    async findOneCartToProducts(cartId) {
        try {
            const cart = await Carts.findById(cartId).lean()
            if (cart) {
                const product = cart.products.map(product => product)
                return product
            }
        } catch (error) {
            throw new Error('Error al obtener los productos: ' + error)
        }
    }

    /**
     * @param {String} cartId
     */
    async restarCart(cartId) {
        const updatedCart = await Carts.findByIdAndUpdate(
            cartId,
            { $set: { products: [] } },
            { new: true }
        ).lean();
        return updatedCart
    }

    /**
     * @param {String} id
     */
    async deleteOne(id) {
        try {

            const deleteCart = await Carts.findByIdAndDelete(id).lean()
            return deleteCart

        } catch (error) {
            throw new Error('error al borrar: Carrito no encontrado ' + error)
        }
    }

    /**
     * @param {String} cartId
     * @param {String} productId
     */
    async deleteProductsToCart(cartId, productId) {
        try {

            const cart = await Carts.findById(cartId).lean()

            const productsinCart = cart.products.find(producto => producto.product === productId)

            if (productsinCart) {
                const delProdCart = await Carts.findByIdAndUpdate(
                    cartId,
                    { $pull: { products: { product: productId } } },
                    { new: true }
                ).lean();

                return delProdCart
            }

        } catch (error) {
            throw new Error('error al encontrar el Carrito: ' + error)
        }
    }

    /**
     * @param {String} id
     * @param {any} update
     */
    async updateOne(id, update) {
        try {

            const updateCart = await Carts.findByIdAndUpdate(id, { $set: { products: update } }, { new: true }).lean()
            return updateCart

        } catch (error) {
            throw new Error('error al actualizar carrito: ' + error)

        }
    }

    /**
     * @param {String} cartId
     * @param {String} productId
     * @param {Number} quantity
     */
    async updateQuantityToProduct(cartId, productId, quantity) {
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