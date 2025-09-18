// CsrfService: double-submit + Origin/Referer
export interface CsrfService {
  issue(): Promise<{ cookie: string; value: string }>;
  validate(cookieVal: string, headerVal: string): boolean;
  isAllowedOrigin(originOrReferer: string): boolean;
}
