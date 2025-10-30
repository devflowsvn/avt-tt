import Fish from "../models/fish-model.js";

const upsertFishChecker = async (req, res) => {
  const { username, type } = req.body; // type: "cast" hoặc "fish"

  try {
    if (!username) {
      return res.json({
        message: "Username is required",
        error: 400,
      });
    }

    // Xác định field cần update
    let updateFields = {};
    if (type === "cast") {
      updateFields = { $inc: { castCount: 1 } };
    } else if (type === "fish") {
      updateFields = { $inc: { fishCount: 1 } };
    }

    // Nếu type không hợp lệ, chỉ tạo user
    if (!type) {
      updateFields = {};
    }

    // Dùng findOneAndUpdate với upsert: true
    const updatedUser = await Fish.findOneAndUpdate(
      { username },
      {
        $setOnInsert: { username }, // nếu chưa có thì thêm
        ...updateFields, // nếu có type thì update
      },
      {
        new: true, // trả về document mới nhất sau update
        upsert: true, // tự động tạo nếu chưa có
      }
    );

    return res.json({
      message: "Upsert successful",
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

const getFishChecker = async (req, res) => {
  try {
    const response = await Fish.find();
    return res.json({
      response,
      code: 200,
    });
  } catch (error) {
    return res.json({
      message: "Server Error",
      code: 500,
    });
  }
};

export { upsertFishChecker, getFishChecker };
