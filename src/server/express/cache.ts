import { createCache, memoryStore } from "cache-manager";
import fetch from "node-fetch";

enum MemoKeys {
  UserNameAndId = "userNameId",
  UserRaws = "userRaws",
  UserProfiles = "userProfiles",
  UserProfileRaws = "userProfileRaws",
}
const memoryCache = createCache(
  memoryStore({
    max: Number(process.env.CACHE_SIZE),
    ttl: Number(process.env.CACHE_LIFE_SPAN) /*milliseconds*/,
    refreshThreshold: Number(process.env.CACHE_REFRESH_THRESHOLD_TIMER),
    onBackgroundRefreshError: (error) => {
      console.log("BackgroundRefreshError", error);
    },
  })
);

async function fetchAndCache(url: string, key: MemoKeys) {
  await memoryCache.wrap(key, async () => {
    const res = await fetch(url);

    if (res.statusText === "No Content") {
      return;
    }

    return await res.json();
  });
}

export { memoryCache, MemoKeys, fetchAndCache };
