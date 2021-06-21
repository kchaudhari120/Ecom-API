function getUsers(req, res) {
    res.json({ 'message': 'user API running .... from controller' })
}

module.exports = { getUsers }