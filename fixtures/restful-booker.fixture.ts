import { test as base } from "@playwright/test";
import { AuthApi } from "../src/restful_booker/api/clients/auth.api";

type BookerFixtures = {
  authToken: string;
};

export const test = base.extend<BookerFixtures>({
  authToken: async ({ request }, use) => {
    const authApi = new AuthApi(request);

    const auth = await authApi.createToken({
      username: "admin",
      password: "password123",
    });

    await use(auth.token);
  },
});

export { expect } from "@playwright/test";
