import dayjs from "dayjs";
import { MemoKeys, fetchAndCache, memoryCache } from "./cache";
import { getAge } from "./utils/date";
import { UserResponse, UserProfile, UserProfileResponse } from "./user.types";

async function initializeUser() {
  await fetchAndCache(
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json",
    MemoKeys.UserRaws
  );
  await memoryCache.wrap(MemoKeys.UserNameAndId, async () => {
    const users = (await memoryCache.get(MemoKeys.UserRaws)) as UserResponse[];

    return users?.reduce((data, item) => {
      data[item.username] = item.uid;
      return data;
    }, {} as Record<string, string>) || {};
  });
}

async function initializeUserProfile() {
  await fetchAndCache(
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json",
    MemoKeys.UserProfileRaws
  );

  await memoryCache.wrap(MemoKeys.UserProfiles, async () => {
    const profiles = (await memoryCache.get(
      MemoKeys.UserProfileRaws
    )) as UserProfileResponse[];

    return profiles?.reduce((data, profile) => {
      data[profile.userUid] = {
        ...profile,
        age: getAge(profile.birthdate),
        birthday: dayjs(profile.birthdate),
      };
      return data;
    }, {} as Record<string, UserProfile>) || {};
  });
}

export { initializeUser, initializeUserProfile };

