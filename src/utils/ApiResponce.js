class ApiResponce{
    constructor(status,data,message){
        this.statusCode = status
        this.data = data
        this.message= message
    }
}

export {ApiResponce}