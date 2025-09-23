export namespace ApiLogoutMapper {
    export function fromRequest(req: any): { jti?: string } {
        // Extrae el jti del usuario autenticado
        return { jti: req.user?.jti };
    }
}
