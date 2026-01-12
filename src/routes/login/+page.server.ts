import { createSessionJwt, jwtExpirationSeconds } from '$lib/server/auth/jwt';
import { createSession, maxSessionSeconds } from '$lib/server/auth/session.js';
import { validateUser } from '$lib/server/auth/users';
import { MISSING_CREDS_ERROR, WRONG_CREDS_ERROR } from '$lib/server/text-maps/errors.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, url, cookies }) => {
    const data = await request.formData();
    let usernameOrEmail = data.get("username");
    let password = data.get("password");
    if (!usernameOrEmail || !password) {
      return fail(400, { error: MISSING_CREDS_ERROR });
    }
    const user = await validateUser(usernameOrEmail.toString(), password.toString());
    if (user) {
      if (user.error !== undefined) return fail(400, { error: user.error });
      const session = await createSession(user);
      cookies.set("session_token", session.token, { path: '/', httpOnly: true, maxAge: maxSessionSeconds, secure: true, sameSite: 'lax' });

      // user email should be verified to login with jwt
      // because jwt doesn't have emailVerified proparity
      // if we want to add emailVerified to jwt it would
      // not be updated until jwt expired which may block
      // users from accessing their accounts even when
      // verifying the email for an amount of time.
      if (user.emailVerified) {
        const sessionJwt = await createSessionJwt(session);
        cookies.set("session_jwt", sessionJwt, { path: '/', httpOnly: true, maxAge: jwtExpirationSeconds, secure: true, sameSite: 'lax' });
      }
      if (url.searchParams.has('continue')) {
        redirect(303, url.searchParams.get('continue')!);
      }
      else redirect(303, "/home");
    }
    else return fail(400, { error: WRONG_CREDS_ERROR });
  }
}