// @ts-nocheck
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

        const user = req.user || ''

        const pagination = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: req.query.sort,
            lean: true
        }

        let data;

        if (req.query.sort === 'asc') {

            data = await Product.paginate(filter, { ...pagination, sort: { price: 1 } });

        } else if (req.query.sort === 'desc') {

            data = await Product.paginate(filter, { ...pagination, sort: { price: -1 } });
        } else {

            data = await Product.paginate(filter, pagination);
        }

        const context = {
            userExist: req.user,
            session: req.user,
            cartId: user.cartId,
            products: data.docs,
            docs: data.docs,
            titulo: 'PG - Productos',
            sortExist: req.query.sort,
            sort: req.query.sort,
            pageTitle: 'paginado',
            limit: data.limit,
            page: data.page,
            totalPages: data.totalPages,
            hasNextPage: data.hasNextPage,
            nextPage: data.nextPage,
            hasPrevPage: data.hasPrevPage,
            prevPage: data.prevPage,
        };

        res.status(200).render('producto', context)
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
        const product = await productManager.findOne({ _id: id })
        await productManager.deleteOne(id)
        res.status(201).json({ productoBorrado: product })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}