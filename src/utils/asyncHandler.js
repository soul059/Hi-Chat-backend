const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

// Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.


export { asyncHandler }