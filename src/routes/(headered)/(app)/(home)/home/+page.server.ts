import { redirect } from "@sveltejs/kit";

export function load({ url, locals }) {
  console.log(locals.session);
  if (!locals.session ) throw redirect(302, `/login?continue=${url.pathname}`);
}