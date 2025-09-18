// ApiGateway: proxy seguro a API Movies
export interface ApiGateway {
  call(
    method: string,
    pathWithQuery: string,
    accessToken: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<{
    status: number;
    headers: Record<string, string>;
    body: any;
  }>;
}
