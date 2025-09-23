import { EnvironmentsEnum } from "src/common/enums/environments.enum";
import { AuthApiHttpAdapter } from "../adapters/http/auth-api.http.adapter";
import { AuthApiHttpAdapterMock } from "../adapters/http/auth-api.http.adapter.mock";
import { AUTH_HTTP_ADAPTER } from "./types";

const isTest = process.env.NODE_ENV === EnvironmentsEnum.Test;
export const AuthProviders = [
    { provide: AUTH_HTTP_ADAPTER, useClass: isTest ? AuthApiHttpAdapterMock : AuthApiHttpAdapter },
];