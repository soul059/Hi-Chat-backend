class ApiError extends Error {
    constructor(
        status,
        massage="somthing want wrong",
        errors = [],
        stack = ""
    ){
        super(massage);
        this.status = status
        this.data = null
        this.message = massage
        this.errors = errors;
        this.success = false

        if(stack){
            this.stack = `${this.name}: ${this.message}\n${stack}`;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError};