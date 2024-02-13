import { productManager } from "../dao/index.dao.js";

export const getProductJSON = async (req, res) => {

    try {
        const getProducts = await productManager.getProduct()
        res.json(getProducts)
    } catch (error) {
        res.send(error.message)
    }
}