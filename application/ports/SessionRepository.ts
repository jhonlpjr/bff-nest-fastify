// SessionRepository: gestión de sesiones opacas
import { Session } from '../../domain/entities/Session';

export interface SessionRepository {
  save(session: Session): Promise<void>;
  findById(id: string): Promise<Session | null>;
  delete(id: string): Promise<void>;
  listByUser(userId: string): Promise<Session[]>;
}
