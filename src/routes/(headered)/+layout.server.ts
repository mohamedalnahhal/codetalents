export function load({ locals }) {
  return {
    theme: locals.session?.user.theme,
    user: locals.session? {
      username: locals.session.user.username,
      rating: locals.session.user.rating,
      emailVerified: locals.session.user.emailVerified
    } : undefined
  }
}