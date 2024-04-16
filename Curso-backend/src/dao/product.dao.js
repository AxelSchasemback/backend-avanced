import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { randomUUID } from 'crypto'

const schemaProduct = new mongoose.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    owner: {type: String, default: 'schasemback_axel@hotmail.com'}
}, {
    versionKey: false,
    strict: 'throw'
})

schemaProduct.plugin(mongoosePaginate)

export const Product = mongoose.model("products", schemaProduct);

// --------------------------------------------------------

export class ProductDao {

    /**
     * @param {{ title?: string; category?: string; description?: string; price?: number; thumbnail?: string; code?: string; stock?: number; _id?: string; }} dataProduct
     */
    async creteProduct(dataProduct) {
        dataProduct._id = randomUUID()
        const products = await Product.create(dataProduct)
        console.log(products)
        return products.toObject();
    };

    async findMany(criteria) {
        return await Product.find(criteria).lean()
    };

    /**
     * @param {{ criteria: any }} criteria
     */
    async findOne(criteria) {
        const searchProd = await Product.findOne(criteria).lean()
        if (!searchProd) {
            throw new Error('error al buscar: producto no encontrado')
        }
        return searchProd
    };

    async findById(id) {
        return await Product.findById(id).lean()
    };

    /**
     * @param {string} id
     */
    async updateOne(id, update) {
        const updateProd = await Product.findByIdAndUpdate(id, { $set: update }, { new: true }).lean()
        if (!updateProd) {
            throw new Error('error al actualizar: producto no encontrado')
        }
        return updateProd
    }

    /**
     * @param {string} id
     */
    async deleteOne(id) {
        const deleteProd = await Product.findByIdAndDelete(id).lean()
        if (!deleteProd) {
            throw new Error('error al actualizar: producto no encontrado')
        }
        return deleteProd
    }
}