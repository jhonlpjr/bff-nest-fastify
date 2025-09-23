// Mapper para transformar la respuesta de verifyMfa a un DTO de resultado

export class VerifyMfaMapper {
  static toResult(apiResponse: any) {
    // Aquí deberías mapear explícitamente los campos según el contrato de salida
    // Por ahora, se retorna tal cual
    return apiResponse;
  }
}
