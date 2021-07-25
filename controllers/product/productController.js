const productController = {
    async addProduct(req, res, next){
        res.json({
            data: "add product",
         });
    },

    async getAllProducts(req, res, next){
        res.json({
            data: "get all products",
         });
    }
}

export default productController;