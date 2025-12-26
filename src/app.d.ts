// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		/** number representing user role:
		 * 
		 * `0 => User`
		 * 
		 * `99 => Admin` */
		type UserRole = "user" | "admin";
		interface Session {
			id: string;
			createdAt: Date;
			user: {
				id: string;
				role: UserRole;
			}
		}
		interface SessionWithSecret extends Session {
			secretHash: string;
			lastVerifiedAt: Date;
			user: {
				id: string;
				role: UserRole;
				emailVerified: boolean
			}
		}
		interface Locals {
			session: Session | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
