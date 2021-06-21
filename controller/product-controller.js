function getProducts(req, res) {
    res.json({ 'message': 'product API running... from controller' })
}



module.exports = { getProducts }