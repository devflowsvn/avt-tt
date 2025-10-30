import animalModel from "../models/animal-model.js";

const takeCareAnimals = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }

    // Tìm user theo username
    let user = await animalModel.findOne({ username });

    const now = new Date();

    // Nếu chưa có user → tạo mới
    if (!user) {
      user = await animalModel.create({
        username,
        takeCareAt: now,
      });

      return res.status(201).json({
        message: "Created new animal record",
        nextCareInMinutes: 30,
      });
    }

    // Nếu có rồi → kiểm tra thời gian chênh lệch
    const diffMs = now - user.takeCareAt;
    const diffMinutes = diffMs / 1000 / 60; // đổi ms sang phút

    if (diffMinutes >= 30) {
      // Cập nhật lại thời gian mới
      user.takeCareAt = now;
      await user.save();

      return res.status(200).json({
        message: "Updated takeCareAt successfully",
        nextCareInMinutes: 30,
      });
    } else {
      // Nếu chưa đủ 30 phút → tính thời gian còn lại
      const remaining = Math.ceil(30 - diffMinutes);

      return res.status(200).json({
        message: `Please wait ${remaining} more minute(s) before next care.`,
        nextCareInMinutes: remaining,
        lastCareAt: user.takeCareAt,
      });
    }
  } catch (error) {
    console.error("takeCareAnimals error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { takeCareAnimals };
