import { CreateResponse } from "../api/responses/create-response";
import { ErrorResponse } from "../api/responses/error-response";
import { OkResponse } from "../api/responses/ok-response";

export namespace ResponseMapper {
    export function okResponse<T>(data: T): OkResponse<T> {
            return new OkResponse(data);
    }

    export function createdResponse<T>(data: T): CreateResponse<T> {
        // Semánticamente igual a okResponse, pero para 201 Created
            return new CreateResponse(data);
    }

    export function errorResponse(error: any): ErrorResponse {
        // Si es una excepción HTTP tipada
        if (error && typeof error.statusCode === 'number') {
            return {
                success: false,
                message: error.message,
                errors: error.details
            };
        }
        // Fallback para errores genéricos
        return {
            success: false,
            message: error?.message || 'Internal server error',
            errors: error?.details || undefined
        };
    }
}

