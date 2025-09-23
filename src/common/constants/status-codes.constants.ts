import { HttpStatus } from "@nestjs/common";
import { CreateResponse } from "../api/responses/create-response";
import { ErrorResponse } from "../api/responses/error-response";
import { OkResponse } from "../api/responses/ok-response";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ConflictError } from "../exceptions/conflict-error";
import { DatabaseError } from "../exceptions/database-error";
import { ForbiddenError } from "../exceptions/forbidden-error";
import { InternalServerError } from "../exceptions/internal-server-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { TooManyRequestsError } from "../exceptions/too-many-requests-error";
import { UnauthorizedError } from "../exceptions/unauthorized-error";
import { ValidationError } from "../exceptions/validation-error";

export const STATUS_CODE_FOR_RESPONSES = {
    [CreateResponse.name]: HttpStatus.CREATED,
    [OkResponse.name]: HttpStatus.OK,
    [ErrorResponse.name]: HttpStatus.INTERNAL_SERVER_ERROR, // Por defecto, puede ser sobreescrito por el error
};  

export const STATUS_CODE_FOR_EXCEPTIONS = {
    [BadRequestError.name]: HttpStatus.BAD_REQUEST,
    [ConflictError.name]: HttpStatus.CONFLICT,
    [DatabaseError.name]: HttpStatus.INTERNAL_SERVER_ERROR,
    [ForbiddenError.name]: HttpStatus.FORBIDDEN,
    [InternalServerError.name]: HttpStatus.INTERNAL_SERVER_ERROR,
    [NotFoundError.name]: HttpStatus.NOT_FOUND,
    [TooManyRequestsError.name]: HttpStatus.TOO_MANY_REQUESTS,
    [UnauthorizedError.name]: HttpStatus.UNAUTHORIZED,
    [ValidationError.name]: HttpStatus.BAD_REQUEST, // Desde class-validator
}