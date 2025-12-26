export function generateSecureRandomString(): string {
	// Generate 24 bytes = 192 bits of entropy.
	// We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
	const bytes = new Uint8Array(24);
	crypto.getRandomValues(bytes);

  return Buffer.from(bytes.buffer).toString('base64');
}

/** @returns hex string hash */
export async function hashSecret(secret: string): Promise<string> {
	const secretBytes = new TextEncoder().encode(secret);
	const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
	return Buffer.from(secretHashBuffer).toString("hex");
}

export function constantTimeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) {
		return false;
	}
	let c = 0;
	for (let i = 0; i < a.length; i++) {
		c |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}
	return c === 0;
}