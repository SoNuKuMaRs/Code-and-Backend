class ApiResponse {
    constructor(statusCode, data, message = "success"){
        this.statusCode = statusCode
        this.data
        this.message
        this.success = statusCode <400 
    }
}