const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.OriginalUrl}`);
    res.status(404);
    next(error);
}



const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message;

    if (err.Name === 'CastError' && err.kind === 'objectId') {
        statusCode = 404;
        message = 'Resorce not found'
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV = 'PRODUCTION' ? null : err.stack,
    });
}

export { errorHandler, notFound };