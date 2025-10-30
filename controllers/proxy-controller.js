import Proxy from "../models/proxy-model.js";

const addProxies = async (req, res) => {
  try {
    const body = req.body;

    // ⚠️ Validate cơ bản
    if (!Array.isArray(body) || body.length === 0) {
      return res.status(400).json({
        message: "Body must be an array of proxy strings (host:port:user:pass)",
        code: 400,
      });
    }

    const pushData = [];

    body.forEach((item) => {
      // Ví dụ: 127.0.0.1:8080:user:pass
      const parts = item.split(":");

      if (parts.length < 2) return; // Bỏ qua dòng lỗi

      const [host, port, username = "", password = ""] = parts;

      pushData.push({
        host,
        port,
        username,
        password,
      });
    });

    if (pushData.length === 0) {
      return res.status(400).json({
        message: "Không có proxy hợp lệ nào được gửi lên.",
        code: 400,
      });
    }

    // 🧠 Thêm vào database
    const result = await Proxy.insertMany(pushData, { ordered: false });

    return res.status(200).json({
      message: `✅ Đã thêm ${result.length} proxy thành công`,
      code: 200,
    });
  } catch (error) {
    console.error("❌ addProxies Error:", error);
    return res.status(500).json({
      message: "Server Error",
      code: 500,
      error: error.message,
    });
  }
};

const getProxy = async (req, res) => {
  try {
    // Tìm 1 proxy có usedCount < 50 và tăng lên 1 ngay lập tức
    const proxy = await Proxy.findOneAndUpdate(
      { usedCount: { $lt: 50 } }, // điều kiện
      { $inc: { usedCount: 1 } }, // tăng 1
      { new: true } // trả về object sau khi update
    );

    if (!proxy) {
      return res.status(404).json({
        message: "No proxy available (all reached limit)",
        code: 404,
      });
    }

    return res.json({
      host: proxy.host,
      port: proxy.port,
      username: proxy.username,
      password: proxy.password,
      usedCount: proxy.usedCount,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Server Error",
      code: 500,
    });
  }
};

const resetProxies = async (req, res) => {
  try {
    await Proxy.updateMany({}, { usedCount: 0 });
    return res.json({
      message: "All proxies reset successfully",
      code: 200,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Server Error",
      code: 500,
    });
  }
};
const deleteAllProxies = async (req, res) => {
  try {
    const result = await Proxy.deleteMany({});
    return res.json({
      message: "All proxies deleted successfully",
      deletedCount: result.deletedCount,
      code: 200,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Server Error",
      code: 500,
    });
  }
};

const getAllProxies = async (req, res) => {
  try {
    const proxies = await Proxy.find().sort({ usedCount: -1 });
    return res.json(proxies);
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Server Error",
      code: 500,
    });
  }
};
export { addProxies, getProxy, resetProxies, deleteAllProxies, getAllProxies };
