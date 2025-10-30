import cron from "node-cron";
import User from "../models/user-model.js";

export const startUserOnlineJob = () => {
  // Chạy mỗi giây
  cron.schedule("* * * * * *", async () => {
    const now = new Date();
    const threshold = new Date(now.getTime() - 60 * 1000); // 30 giây trước

    try {
      // update tất cả user đang online nhưng không hoạt động hơn 10s
      const result = await User.updateMany(
        { lastActiveAt: { $lt: threshold }, isOnline: true },
        { $set: { isOnline: false } }
      );

      if (result.modifiedCount > 0) {
        console.log(
          `[CRON] ${
            result.modifiedCount
          } users set offline at ${now.toLocaleTimeString()}`
        );
      }
    } catch (error) {
      console.error("[CRON ERROR]", error.message);
    }
  });

  console.log("[CRON] User online status job started ✅");
};
