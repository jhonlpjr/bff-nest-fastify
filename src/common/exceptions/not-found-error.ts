export class NotFoundError extends Error {
    public details?: any;
    constructor(message: string, details?: any) {
        super(message);
        this.name = NotFoundError.name;
        this.details = details;
    }
}
