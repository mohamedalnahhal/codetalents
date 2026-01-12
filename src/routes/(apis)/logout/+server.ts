import { deleteSession, maxSessionSeconds } from "$lib/server/auth/session.js";
import { redirect } from "@sveltejs/kit";

export async function GET({ url, cookies, locals }) {
  if (locals.session) {
    await deleteSession(locals.session.id);
    cookies.delete("session_token", { path: '/', httpOnly: true, maxAge: maxSessionSeconds, secure: true, sameSite: 'lax' });
    locals.session = null;
  }
  if (url.searchParams.has('continue')) {
    redirect(303, url.searchParams.get('continue')!);
  }
  else redirect(303, url.origin);
}