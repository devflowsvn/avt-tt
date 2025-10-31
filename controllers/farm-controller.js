import Farm from "../models/farm-model.js";

// Tạo mới hoặc cập nhật user nếu đã quá 4 giờ
const addOrUpdateFarm = async (req, res) => {
  try {
    const {
      username,
      userId,
      serverAddress,
      isOpenedChest,
      isOpenedPlant,
      isOpenedAnimals,
    } = req.body;

    if (
      !username ||
      !userId ||
      !serverAddress ||
      !isOpenedChest ||
      !isOpenedPlant ||
      !isOpenedAnimals
    ) {
      return res.status(400).json({
        message: "Missing username or serverAddress or isOpenedChest",
      });
    }

    // Tìm user trong database
    let user = await Farm.findOne({ userId, serverAddress });
    const now = new Date();

    if (!user) {
      // ✅ Nếu chưa có => tạo mới
      user = new Farm({
        username,
        userId,
        serverAddress,
        isOpenedChest: true,
        isOpenedAnimals: true,
        isOpenedPlant: true,
        seedAt: now,
      });
      await user.save();
      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    }

    // ✅ Nếu đã có => kiểm tra thời gian chênh lệch
    const diffMs = now - user.seedAt; // khoảng cách mili-giây
    const diffHours = diffMs / (1000 * 60 * 60); // đổi sang giờ

    if (diffHours >= 4) {
      user.seedAt = now;
      await user.save();
      return res.status(200).json({
        message: "User seedAt updated (more than 4 hours passed)",
        user,
      });
    }

    // Nếu chưa đủ 4h thì không update
    return res.status(200).json({
      message: `No update needed (only ${diffHours.toFixed(2)} hours passed)`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🟩 GET user → trả về diffMinutes để client tự xử lý hiển thị
const getFarm = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Farm.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const now = new Date();
    const diffMs = now - user.seedAt;
    const diffMinutes = Math.floor(diffMs / (1000 * 60)); // số phút đã trôi qua
    const isOpenedChest = user.isOpenedChest;

    res.status(200).json({
      diffMinutes: diffMinutes,
      isOpenedChest: isOpenedChest,
      isOpenedAnimals: user.isOpenedAnimals,
      isOpenedPlant: user.isOpenedPlant,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getAllFarms = async (req, res) => {
  try {
    const response = await Farm.find();
    return res.json({
      response,
      code: 200,
    });
  } catch (error) {
    return res.json({
      err: error.message,
      message: "Server Error",
      code: 500,
    });
  }
};

export { addOrUpdateFarm, getFarm, getAllFarms };
