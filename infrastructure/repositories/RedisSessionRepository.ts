import { Session } from '../../domain/entities/Session';
import { SessionRepository } from '../../application/ports/SessionRepository';
import Redis from 'ioredis';

export class RedisSessionRepository implements SessionRepository {
  constructor(private readonly redis: Redis, private readonly ttlMin: number) {}

  async save(session: Session): Promise<void> {
    const key = `session:${session.id}`;
    await this.redis.set(key, JSON.stringify(session), 'EX', this.ttlMin * 60);
    await this.redis.sadd(`user_sessions:${session.userId}`, session.id);
  }

  async findById(id: string): Promise<Session | null> {
    const data = await this.redis.get(`session:${id}`);
    return data ? Object.assign(new Session('', '', '', '', 'pwd', new Date(), new Date()), JSON.parse(data)) : null;
  }

  async delete(id: string): Promise<void> {
    const session = await this.findById(id);
    if (session) {
      await this.redis.del(`session:${id}`);
      await this.redis.srem(`user_sessions:${session.userId}`, id);
    }
  }

  async listByUser(userId: string): Promise<Session[]> {
    const ids = await this.redis.smembers(`user_sessions:${userId}`);
    const sessions = await Promise.all(ids.map(id => this.findById(id)));
    return sessions.filter(Boolean) as Session[];
  }
}
