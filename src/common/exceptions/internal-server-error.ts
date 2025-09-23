export class InternalServerError extends Error {
    public details?: any;
    constructor(message: string = 'Internal server error', details?: any) {
        super(message);
        this.name = InternalServerError.name;
        this.details = details;
    }
}
