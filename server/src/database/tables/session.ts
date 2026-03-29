import type { Timestamp } from "@server/database/types";
import type { Insertable, Selectable, Updateable } from "kysely";

export interface SessionTable {
  id: string;
  userId: string;
  token: string;
  expiresAt: Timestamp;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;
