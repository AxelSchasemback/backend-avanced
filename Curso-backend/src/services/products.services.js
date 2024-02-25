import { productManager } from "../dao/index.dao.js"

export class productsServices {

    async stockProduct(products) {

        try {
            const getProduct = await productManager.getProduct()

            const moreForStock = products.filter(prod => prod.stock > getProduct.stock)

            console.log({ moreForStock: moreForStock })

            const lessForStock = products.filter(prod => prod.stock <= 0)

            console.log({ lessForStock: lessForStock })

            if (moreForStock == [] && lessForStock == []) {

                return true
            }

            return false

        } catch (error) {
            throw new Error('Error: los stock de los productos no son correctos')
        }
    }

}