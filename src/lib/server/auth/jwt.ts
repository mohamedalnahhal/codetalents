import * as jose from "jose";

// Random HMAC key with SHA-256
const jwtHS256Key = await jose.generateSecret("HS256");
export const jwtExpirationSeconds = 60 * 5; // 5 minutes

export async function createSessionJwt(session: App.Session): Promise<string> {
	const now = new Date();
  
  const jwt = await new jose.SignJWT({
    id: session.id,
    createdAt: Math.floor(session.createdAt.getTime() / 1000),
    user: session.user
  })
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt(now)
    .setExpirationTime(Math.floor(now.getTime() / 1000) + jwtExpirationSeconds)
    .setIssuer('https://codetalents.com')
    .setAudience('https://codetalents.com')
    .sign(jwtHS256Key);

	return jwt;
}

export async function validateSessionJwt(jwt: string): Promise<App.Session | null> {
  const now = new Date();

  return new Promise((resolve) => {
    jose.jwtVerify<Omit<App.Session, 'createdAt'> & {createdAt: number}>(jwt, jwtHS256Key, {
      algorithms: ["HS256"],
      issuer: 'https://codetalents.com',
      audience: 'https://codetalents.com',
      currentDate: now
    }).then((res) => {
      const parsedSession = res.payload;
      const session = {
        id: parsedSession.id,
        createdAt: new Date(parsedSession.createdAt * 1000),
        user: parsedSession.user
      };
      return resolve(session);
    })
    .catch(() => {
      return resolve(null);
    });
  });
}