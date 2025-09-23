export class ForbiddenError extends Error {
    public details?: any;
    constructor(message: string, details?: any) {
        super(message);
        this.name = ForbiddenError.name;
        this.details = details;
    }
}
