import dayjs, { ConfigType } from "dayjs";

function getAge(birthday: ConfigType) {
  const birth = dayjs(birthday);
  return dayjs().diff(birth, "year");
}

export { getAge };
