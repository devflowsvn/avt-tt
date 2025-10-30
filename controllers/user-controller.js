import User from "../models/user-model.js";

const upsertUser = async (req, res) => {
  const { username, password, coins, money, status } = req.body;

  try {
    if (!username) {
      return res.json({
        message: "Username is required",
        error: 400,
      });
    }

    // Nếu có truyền coins thì cộng thêm, nếu không thì mặc định +0
    const coinValue = typeof coins === "number" ? coins : 0;
    const isActive = status === "active";

    const updatedUser = await User.findOneAndUpdate(
      { username },
      {
        $setOnInsert: { username, password }, // nếu chưa có thì tạo mới
        $set: { coins: coinValue, money: money, isActive }, // nếu có thì cộng thêm
      },
      {
        new: true, // trả về document mới
        upsert: true, // tự động tạo nếu chưa có
      }
    );

    return res.json({
      message: "User upsert successful",
      data: updatedUser,
      error: 0,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Server Error",
      error: 500,
    });
  }
};
const updateUserStatus = async (req, res) => {
  console.log("update status");
  const { username, isOnline } = req.body;

  try {
    if (!username) {
      return res.json({ message: "Username is required", error: 400 });
    }

    // update user (nếu chưa có thì tạo mới)
    const updatedUser = await User.findOneAndUpdate(
      { username },
      {
        $setOnInsert: { username },
        $set: {
          isOnline: !!isOnline, // ép kiểu boolean
          lastActiveAt: new Date(),
        },
      },
      { new: true, upsert: true }
    );

    return res.json({
      message: "User status updated successfully",
      data: updatedUser,
      error: 0,
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Server Error", error: 500 });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const data = await User.find({});
    return res.json({
      data,
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Server Error",
      error: 500,
    });
  }
};

const removeAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    return res.json({
      message: "Remove all users successfully",
      code: 200,
    });
  } catch (error) {
    return res.json({
      message: "Server Error",
      code: 500,
    });
  }
};
export { upsertUser, getAllUsers, updateUserStatus, removeAllUsers };
