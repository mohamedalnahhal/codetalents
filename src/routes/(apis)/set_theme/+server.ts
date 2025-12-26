import { db } from '$lib/server/db/index.js';
import { users } from '$lib/server/db/tables.js';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ url, locals }) {
  if (!locals.session) return new Response(undefined, {status: 401});
  const theme = url.searchParams.get("theme");
  if (theme === "dark" || theme === "light" || theme === "sys") {
    await db.update(users).set({ theme }).where(eq(users.id, locals.session.user.id));
    return new Response();
  }
  return new Response(undefined, {status: 400});
}