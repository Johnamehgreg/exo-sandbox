import Rollbar from "rollbar";

let rollbarInstance: Rollbar | null = null;

export const initializeErrorTracking = () => {
  if (!rollbarInstance &&  process.env.ROLLBAR_POST_CLIENT_ITEM_ACCESS_TOKEN) {
    rollbarInstance = new Rollbar({
      accessToken:  process.env.ROLLBAR_POST_CLIENT_ITEM_ACCESS_TOKEN,
      environment: process.env.NODE_ENV,
      enabled: process.env.isDev === 'true' || process.env.isProd === 'true',
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        client: {
          javascript: {
            code_version: "1.0.0",
            source_map_enabled: true,
            guess_uncaught_frames: true,
          },
        },
      },
    });
  }
  return rollbarInstance;
};

export const trackError = (error: Error, extra?: object) => {
  const rollbar = initializeErrorTracking();
  if (rollbar) {
    rollbar.error(error, extra);
  }
};

export const trackInfo = (message: string, extra?: object) => {
  const rollbar = initializeErrorTracking();
  if (rollbar) {
    rollbar.info(message, extra);
  }
};
