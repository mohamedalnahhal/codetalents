import { createSessionJwt, jwtExpirationSeconds, validateSessionJwt } from '$lib/server/auth/jwt';
import { validateSessionToken } from '$lib/server/auth/session';

// populate session
export async function handle({ event, resolve }) {
  const sessionToken = event.cookies.get('session_token');
  const sessionJwt = event.cookies.get('session_jwt');
  if (sessionJwt) {
    event.locals.session = await validateSessionJwt(sessionJwt);
  }
  if (!event.locals.session && sessionToken) {
    const session = await validateSessionToken(sessionToken);
    if (session?.user.emailVerified) {
      const newJwt = await createSessionJwt(session);
      event.cookies.set("session_jwt", newJwt, { path: '/', httpOnly: true, maxAge: jwtExpirationSeconds, secure: true, sameSite: 'lax' })
    }
    event.locals.session = session;
  }
  const response = await resolve(event);
	return response;
};

export function handleError({ error }) {
  // example integration with https://sentry.io/
  // Sentry.captureException(error, { extra: { event } });
  console.error(error);
  return {
    message: "Oops, Something went wrong"
  };
}