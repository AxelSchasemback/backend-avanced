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
    stock: { type: Number, required: true }
}, {
    versionKey: false,
    strict: 'throw'
})

schemaProduct.plugin(mongoosePaginate)

export const Product = mongoose.model("products", schemaProduct);

// --------------------------------------------------------

export class ProductDao {

    async creteProduct(dataProduct) {
        dataProduct._id = randomUUID()
        const products = await Product.create(dataProduct)
        return products.toObject();
    };

    async findMany() {
        return await Product.find().lean()
    };

    async findOne(criteria) {
        const searchProd = await Product.findById(criteria).lean()
        if (!searchProd) {
            throw new Error('error al buscar: producto no encontrado')
        }
        return searchProd
    };

    async updateOne(id, update) {
        const updateProd = await Product.findByIdAndUpdate(id, { $set: update }, { new: true }).lean()
        if (!updateProd) {
            throw new Error('error al actualizar: producto no encontrado')
        }
        return updateProd
    }

    async deleteOne(id) {
        const deleteProd = await Product.findByIdAndDelete(id).lean()
        if (!deleteProd) {
            throw new Error('error al actualizar: producto no encontrado')
        }
        return deleteProd
    }
}