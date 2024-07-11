import { santaRests } from "./santa";
import { wishRests } from "./wish";

const restHandlers = [...wishRests, ...santaRests];

export { restHandlers };
