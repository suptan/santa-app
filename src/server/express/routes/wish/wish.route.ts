import { Request, Response } from "express";
import Router from "express-promise-router";
import { queue, Task } from "@/server/express/queues";
import { MemoKeys, memoryCache } from "@/server/express/cache";
import { UserProfile } from "@/server/express/user.types";
import { wishValidator, WishBody } from "./wish.validator";
import { initializeUser, initializeUserProfile } from "../../user";

const wishRouter = Router();

// TODO: refactor with prefix
wishRouter.route("/wish").post(
  wishValidator,
  async function (req: Request<{}, {}, WishBody>, res: Response) {
    const { body } = req;
    try {
      let auth = (await memoryCache.get(MemoKeys.UserNameAndId)) as Record<
        string,
        string
      >;

      if (!auth) {
        await initializeUser()
        await initializeUserProfile()
      }

      auth = (await memoryCache.get(MemoKeys.UserNameAndId)) as Record<
        string,
        string
      >;
      const userId = auth?.[body.name];

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // TODO: reject empty wish

      const profileList = (await memoryCache.get(
        MemoKeys.UserProfiles
      )) as Record<string, UserProfile>;
      const profile = profileList[userId];

      if (profile.age >= 10) {
        return res
          .status(400)
          .json({ message: "Santa won't send a gift to grown up" });
      }

      queue.push({
        id: 33,
        type: "email",
        message: {
          reciever: process.env.EMAIL_RECIEVER,
          body: [
            `child username: ${body.name}`,
            `child address: ${profile.address}`,
            `request: ${body.msg}`,
          ].join("\n"),
        },
      } as Task);

      res.status(204).send();
    } catch (e: any) {
      res.status(500).json(e);
    }
  }
);

export { wishRouter };
