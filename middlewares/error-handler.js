function handleErrors(error, req, res, next) {
    try {
        if(res.statusCode==200) res.status(500);
        res.json({error: error.message,
            "info": "message from error handler"
    })
    } catch (error) {
        next();
    }
}


module.exports = handleErrors;