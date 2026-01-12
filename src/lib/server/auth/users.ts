import { eq, or } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import * as argon2 from "argon2";
import { EMAIL_NOT_VERIFIED_EXPIRE_ERROR } from "../text-maps/errors";

const maxEmailNotVerified = 60 * 60 * 24; // 1 day

export async function createUser(username: string, email: string, signUpMethod: "creds" | "google", emailNotifications: boolean, password?: string) {
  await db.insert(users).values({
    username,
    email,
    signUpMethod,
    passwordHash: password ? await argon2.hash(password) : undefined,
    emailNotifications
  });
}

export async function validateUser(username: string, passowrd: string): Promise<ValidatedUser | { error: string } |null> {
  const now = new Date();

  const results = await db.select({
    id: users.id,
    passwordHash: users.passwordHash,
    role: users.role,
    emailVerified: users.emailVerified,
    registeredAt: users.registeredAt
  }).from(users)
    .where(or(eq(users.username, username), eq(users.email, username)));
  const user = results[0];

  if (!user || !user.passwordHash) return null;
  if (!user.emailVerified && now.getTime() - user.registeredAt.getTime() >= maxEmailNotVerified * 1000) {
    return { error: EMAIL_NOT_VERIFIED_EXPIRE_ERROR }
  }

  if (await argon2.verify(user.passwordHash, passowrd))
    return {
      id: user.id,
      role: user.role,
      emailVerified: user.emailVerified
    };
  else return null;
}

export interface ValidatedUser {
	id: string,
	role: App.UserRole,
	emailVerified: boolean,
	error?: undefined
}