export class DatabaseError extends Error {
    public details?: any;
    constructor(details?: any) {
        super('Database error');
        this.name = DatabaseError.name;
        this.details = details;
    }
}
