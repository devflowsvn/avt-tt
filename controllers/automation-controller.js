import Automation from "../models/automation.model.js";
const addAutomationSettings = async (req, res) => {
  try {
    const {
      autoKey,
      fishMap,
      toFarmTime,
      chatContent,
      dinamondMode,
      giftsCode,
      position,
      fishBait,
      rodID,
    } = req.body;

    if (!autoKey) {
      return res.status(400).json({
        message: "autoKey is required",
        code: 400,
      });
    }

    // ⚙️ Dữ liệu update
    const updateData = {
      fishMap,
      toFarmTime,
      chatContent,
      dinamondMode,
      giftsCode,
      position,
      fishBait,
      rodID,
    };

    // 🔄 Nếu chưa có → tạo mới, có rồi → update
    const automation = await Automation.findOneAndUpdate(
      { autoKey },
      { $set: updateData },
      { upsert: true, new: true } // upsert=true => nếu chưa có thì tự tạo
    );

    return res.status(200).json({
      message: "Automation settings saved successfully",
      code: 200,
      data: automation,
    });
  } catch (error) {
    console.error("Error addAutomationSettings:", error);
    return res.status(500).json({
      message: "Server Error",
      code: 500,
    });
  }
};
const getAutomationSettings = async (req, res) => {
  const { autoKey } = req.params;
  try {
    const automationSettings = await Automation.findOne({ autoKey: autoKey });
    return res.json({
      automationSettings,
      code: 201,
    });
  } catch (error) {
    return res.json({
      messag: "Server Error",
      code: 500,
    });
  }
};

const updateAutomationSettings = async (req, res) => {
  try {
    const {
      autoKey,
      fishMap,
      toFarmTime,
      chatContent,
      dinamondMode,
      giftsCode,
      position,
      fishBait,
      rodID,
    } = req.body;

    // 🧩 Kiểm tra đầu vào cơ bản
    if (!autoKey) {
      return res.status(400).json({
        message: "Missing field: autoKey",
        code: 400,
      });
    }

    // ⚡ Tạo object cập nhật (chỉ update các field có giá trị)
    const updateFields = {
      ...(fishMap !== undefined && { fishMap }),
      ...(toFarmTime !== undefined && { toFarmTime }),
      ...(chatContent && { chatContent }),
      ...(dinamondMode && { dinamondMode }),
      ...(giftsCode && { giftsCode }),
      ...(position && { position }),
      ...(fishBait !== undefined && { fishBait }),
      ...(rodID !== undefined && { rodID }),
    };

    // 🔄 Tìm và cập nhật
    const automation = await Automation.findOneAndUpdate(
      { autoKey },
      { $set: updateFields },
      { new: true, upsert: false } // upsert=false => chỉ update nếu có sẵn
    );

    if (!automation) {
      return res.status(404).json({
        message: "Automation not found",
        code: 404,
      });
    }

    // ✅ Thành công
    return res.json({
      message: "Automation updated successfully",
      code: 200,
      data: automation,
    });
  } catch (error) {
    console.error("updateAutomationSettings error:", error);
    return res.status(500).json({
      message: "Server Error",
      code: 500,
    });
  }
};

export {
  addAutomationSettings,
  getAutomationSettings,
  updateAutomationSettings,
};
