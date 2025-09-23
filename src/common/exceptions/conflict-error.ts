export class ConflictError extends Error {
    public details?: any;
    constructor(message: string, details?: any) {
        super(message);
        this.name = ConflictError.name;
        this.details = details;
    }
}
