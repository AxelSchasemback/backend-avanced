import { productManager } from "../dao/index.dao.js";

export const getProductJSON = async (req, res) => {

    try {
        const getProducts = await productManager.findMany()
        res.status(200).json(getProducts)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}