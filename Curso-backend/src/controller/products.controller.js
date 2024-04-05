import { productManager } from "../dao/index.dao.js"
import { Product } from "../dao/product.dao.js"

export const getsProducts = async (req, res) => {
    try {

        res.status(200).json(await productManager.findMany())

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {

    try {

        const filter = req.query.category ? { category: req.query.category } : {}

        const pagination = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: req.query.sort || null,
            lean: true
        }

        let data;

        if (req.query.sort === 'asc') {

            // @ts-ignore
            data = await Product.paginate(filter, { ...pagination, sort: { price: 1 } });

        } else if (req.query.sort === 'desc') {

            // @ts-ignore
            data = await Product.paginate(filter, { ...pagination, sort: { price: -1 } });
        } else {

            // @ts-ignore
            data = await Product.paginate(filter, pagination);
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getById = async (req, res) => {
    try {
        const search = await productManager.findOne({ _id: req.params['id'] })
        res.status(200).json(search)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { title, category, description, price, thumbnail, code, stock } = req.body;
        const dataProducts = await productManager.creteProduct({ title, category, description, price, thumbnail, code, stock })
        res.status(201).json(dataProducts)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { title, category, description, price, thumbnail, code, stock } = req.body;
        const update = await productManager.updateOne(id, { title, category, description, price, thumbnail, code, stock })
        res.status(201).json(update)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productManager.findOne({_id: id})
        await productManager.deleteOne(id)
        res.status(201).json({ productoBorrado: product })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}