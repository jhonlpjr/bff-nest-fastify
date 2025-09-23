export class AuthServicePortResponse<T> {
    success: boolean;
    data: T;
    errors?: any;
}
