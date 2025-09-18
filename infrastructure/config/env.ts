// env.ts: lee variables de entorno y lanza error si falta
export function getEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing env: ${key}`);
  return val;
}
