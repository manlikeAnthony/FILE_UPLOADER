const CustomAPIError = require('./customerror');
const {StatusCodes} = require('http-status-codes');

class BadRequest extends CustomAPIError{
    constructor(message,statusCode){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest;