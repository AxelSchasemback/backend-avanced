import { productManager } from "../dao/index.dao.js"

export class productsServices {

    async stockProduct(products) {
        try {

            const getProduct = await productManager.getProduct()

            await products.forEach(productos => {

                const bdProduct = getProduct.find(search => search._id === productos.product._id)

                const newStockProduct = bdProduct.stock - productos.quantity

                const { title, category, description, price, thumbnail, code } = bdProduct

                if (newStockProduct < 0) {
                    const putStock = productManager.updateProduct(bdProduct._id, { title, category, description, price, thumbnail, code, stock: newStockProduct })

                    return putStock
                }

            })
        } catch (error) {
            throw new Error("Error en calcular el stock de producto: " + error)
        }
    }

    async stockvalidate(products) {
        try {

            const getProduct = await productManager.getProduct()

            let failure = []

            products.forEach(productos => {

                const bdProduct = getProduct.find(search => search._id === productos.product._id)

                if (productos.quantity > bdProduct.stock) {
                    failure.push(productos)
                }

                if (productos.product.stock <= 0) {
                    failure.push(productos)
                }
            })

            return failure.length ? false : true

        } catch (error) {
            throw new Error('Error: los stock de los productos no son correctos: ' + error)
        }
    }

}