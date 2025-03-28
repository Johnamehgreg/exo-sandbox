import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    NEXTAUTH_SECRET: z.string(),
    FIREBASE_KEY: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_APP_ID: z.string(),
    FIREBASE_MEASUREMENT_ID: z.string(),
    FIREBASE_MESSAGING_SENDER_ID: z.string(),
    // NEXTAUTH_SECRET:
    //   process.env.NODE_ENV === "production"
    //     ? z.string()
    //     : z.string().optional(),
    // NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    //   (str) => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    //   process.env.VERCEL ? z.string() : z.string().url()
    // ),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_ROLLBAR_POST_CLIENT_ITEM_ACCESS_TOKEN: z.string(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string(),
    NEXT_PUBLIC_CUSTOMER_DETAILS_PAGE_ENABLED: z.boolean(),
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_API_URL_DIANA_API: z.string(),
    NEXT_PUBLIC_API_URL_DIANA: z.string(),
    NEXT_PUBLIC_API_URL_FIBONACCI: z.string(),
    NEXT_PUBLIC_ENABLE_BATCH_ANALYSIS: z.boolean(),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    FIREBASE_KEY: process.env.FIREBASE_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_API_URL_FIBONACCI: process.env.NEXT_PUBLIC_API_URL_FIBONACCI,
    NEXT_PUBLIC_API_URL_DIANA_API: process.env.NEXT_PUBLIC_API_URL_DIANA_API,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ROLLBAR_POST_CLIENT_ITEM_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_ROLLBAR_POST_CLIENT_ITEM_ACCESS_TOKEN,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_CUSTOMER_DETAILS_PAGE_ENABLED:
      process.env.NEXT_PUBLIC_CUSTOMER_DETAILS_PAGE_ENABLED === 'true'
        ? true
        : false,
    NEXT_PUBLIC_API_URL_DIANA: process.env.NEXT_PUBLIC_API_URL_DIANA,
    NEXT_PUBLIC_ENABLE_BATCH_ANALYSIS:
      process.env.NEXT_PUBLIC_ENABLE_BATCH_ANALYSIS === 'true' ? true : false,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: true,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: false,
});
