import 'express-session';
import { Request } from 'express';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}

declare module 'express' {
  interface Request {
    session: Session & Partial<SessionData>;
  }
} 