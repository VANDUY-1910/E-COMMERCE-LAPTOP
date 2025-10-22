import { prisma } from "config/client"

const getProduct = async () => {
    const products = prisma.product.findMany();
    return products;
}

export {
    getProduct
}