export class CreateResponse<T> {
    success: boolean = true;
    data: T;
    constructor(data: T) {
        this.data = data;
    }
}