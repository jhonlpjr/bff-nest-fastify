import { AuthApiHttpAdapter } from "../adapters/http/auth-api.http.adapter";
import { AUTH_HTTP_ADAPTER } from "./types";

export const AuthProviders = [
    { provide: AUTH_HTTP_ADAPTER, useClass: AuthApiHttpAdapter },
];