export class BadRequestError extends Error {
    public details?: any;
    constructor(message: string, details?: any) {
        super(message);
        this.name = BadRequestError.name;
        this.details = details;
    }
}
