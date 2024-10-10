import { HttpException, HttpStatus } from '@nestjs/common';



export class EmailNotFound extends Error {
    constructor() {
        super();
        super.message = "Email Not Found";
    }
}
