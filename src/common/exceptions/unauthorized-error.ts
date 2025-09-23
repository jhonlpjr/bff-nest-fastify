export class UnauthorizedError extends Error {
    public details?: any;
    constructor(details?: any) {
        super(typeof details === 'string' ? details : "Unauthorized");
        this.name = UnauthorizedError.name;
        this.details = details;
    }
}