import { productManager, userManager } from "../dao/index.dao.js"
import { sendEmail } from "./configEmail/sendEmail.js"
import { emailServices } from "./email.service.js"

export class productsServices {

    async createOwnerValidate(email, rol) {
        try {
            if (rol === 'admin' || rol === 'premium') {
                return email
            } else {
                throw new Error('el rol no es valido')
            }
        } catch (error) {
            throw new Error('Error al verificar el dueño del producto: ' + error.message)
        }
    }

    async deleteIsPremium(owner) {
        try {
            const user = await userManager.findOne({ email: owner })
            if (!user) {
                throw new Error('Error al obtener datos del usuario')
            }

            if(user.rol === 'premium') {
                await emailServices.send(
                    user.email,
                    'producto Borrado',
                    sendEmail('producto Borrado')
                )
            }

        } catch (error) {
            throw new Error('Error al verificar el dueño del producto: ' + error.message)
        }
    }

    async stockProduct(products) {
        try {

            const getProduct = await productManager.findMany()

            await products.forEach(productos => {

                const bdProduct = getProduct.find(search => search._id === productos.product._id)

                const newStockProduct = bdProduct.stock - productos.quantity

                const { title, category, description, price, thumbnail, code } = bdProduct

                if (newStockProduct < 0) {
                    const putStock = productManager.updateOne(bdProduct._id, { title, category, description, price, thumbnail, code, stock: newStockProduct })

                    return putStock
                }

            })
        } catch (error) {
            throw new Error("Error en calcular el stock de producto: " + error.message)
        }
    }

    async stockvalidate(products) {
        try {

            const getProduct = await productManager.findMany()

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
            throw new Error('Error: los stock de los productos no son correctos: ' + error.message)
        }
    }

}