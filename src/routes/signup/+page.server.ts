import { fail } from "@sveltejs/kit";

export const actions = {
  signup: async ({ request }) => {
    const data = await request.formData();
    const firstname = data.get('firstname');
    const lastname = data.get('lastname');
    const email = data.get('email');
    const password = data.get('password');
    const confirmpassword = data.get('confirmpassword');
    if (!firstname) {
      return fail(400, { firstNameMissing: true });
    }
    if (!lastname) {
      return fail(400, { lastNameMissing: true });
    }
    if (!email) {
      return fail(400, { emailMissing: true });
    }
    if (!password) {
      return fail(400, { passwordMissing: true });
    }
    if (!confirmpassword) {
      return fail(400, { confirmpasswordMissing: true });
    }
    if (password != confirmpassword) {
      return fail(400, { passwordsNotEqual: true });
    }
    if (password.toString().length < 8) {
      return fail(400, { passwordTooShort: true });
    }
    return { setAvatar: true };
  },
  setAvatar: async ({ request }) => {
    const data = await request.formData();
    const avatar = data.get('avatar');
    if (avatar) {
    }
    return { chooseWhoAreYou: true };
  },
  setWhoAmI: async ({ request }) => {
    const data = await request.formData();
    const iam = data.get('iam');
    if (!iam) {
      return fail(400, { chooseWhoAreYou: true, iamMissing: true });
    }
  }
}