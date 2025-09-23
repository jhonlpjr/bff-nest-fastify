import { ResponseMappingInterceptor } from 'src/common/interceptors/response-mapping.interceptor';

export const GlobalInterceptors = [
  ResponseMappingInterceptor,
];
