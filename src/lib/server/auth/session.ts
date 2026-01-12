import { eq } from "drizzle-orm";
import { db } from "../db";
import { sessions } from "../db/schema";
import { constantTimeEqual, generateSecureRandomString, hashSecret } from "./crypto";
import type { ValidatedUser } from "./users";

const sessionExpiresInSeconds = 60 * 60 * 24; // 1 day
const activityCheckIntervalSeconds = 60 * 60; // 1 hour
const inactivityTimeoutSeconds = 60 * 60 * 24 * 10; // 10 days
export const maxSessionSeconds = 60 * 60 * 24 * 30; // 30 days

export async function createSession(user: ValidatedUser): Promise<SessionWithToken> {
	const now = new Date();

	const id = generateSecureRandomString();
	const secret = generateSecureRandomString();
	const secretHash = await hashSecret(secret);

	const token = id + "." + secret;

	const session: SessionWithToken = {
		id,
		token,
		createdAt: now,
		user: {
			id: user.id,
			role: user.role,
		}
	};

	await db.insert(sessions).values([{
		id,
		userId: user.id,
		secretHash,
		lastVerifiedAt: now,
		createdAt: now
	}]);

	return session;
}

export async function validateSessionToken(token: string): Promise<App.SessionWithSecret | null>  {
	const now = new Date();

	const tokenParts = token.split(".");
	if (tokenParts.length !== 2) {
		return null;
	}
	const sessionId = tokenParts[0];
	const sessionSecret = tokenParts[1];

	const session = await getSession(sessionId);
	if (!session) {
		return null;
	}

	const tokenSecretHash = await hashSecret(sessionSecret);

	const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash);
	if (!validSecret) {
		return null;
	}

	if (now.getTime() - session.lastVerifiedAt.getTime() >= activityCheckIntervalSeconds * 1000) {
		session.lastVerifiedAt = now;
		await db.update(sessions)
			.set({ lastVerifiedAt: session.lastVerifiedAt })
			.where(eq(sessions.id, sessionId));
	}

	return session;
}

async function getSession(sessionId: string): Promise<App.SessionWithSecret | null> {
	const now = new Date();
	const session = await db.query.sessions.findFirst({
		where: (sessions, { eq }) => (eq(sessions.id, sessionId)),
		columns: {
			userId: false
		},
		with: {
			user: {
				columns: {
					id: true,
					role: true,
					emailVerified: true
				}
			}
		}
	})

	if (!session) {
		return null;
	}

	// Inactivity timeout
	if (now.getTime() - session.lastVerifiedAt.getTime() >= inactivityTimeoutSeconds * 1000 ||
			now.getTime() - session.createdAt.getTime() >= maxSessionSeconds * 1000) {
		await deleteSession(sessionId);
		return null;
	}

	return session;
}

export async function deleteSession(sessionId: string) {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export interface SessionWithToken extends App.Session {
	token: string;
}