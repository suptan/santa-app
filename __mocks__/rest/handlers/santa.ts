import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

const santaRests = [
  http.get(
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json",
    () => {
      return HttpResponse.json([
        { username: "foo", uid: "730b04" },
        { username: "john.cena", uid: "730b06a6" },
      ]);
    }
  ),
  http.get(
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json",
    () => {
      return HttpResponse.json([
        {
          userUid: "730b0412",
          address: `${faker.location.zipCode()}, ${faker.location.streetAddress(
            true
          )}`,
          birthdate: faker.date.past({ years: 10 }),
        },
        {
          userUid: "730b06a6",
          address: `${faker.location.zipCode()}, ${faker.location.streetAddress(
            true
          )}`,
          birthdate: faker.date.past({ years: 10 }),
        },
      ]);
    }
  ),
];

export { santaRests };
