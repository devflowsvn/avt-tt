import Account from "../models/account-model.js";
const addAccountsList = async (req, res) => {
  const body = req.body;

  const pusData = [];
  body.forEach((item) => {
    const account = item.split("|");
    const obj = {
      username: account[0],
      password: account[1],
    };
    pusData.push(obj);
  });

  await Account.insertMany(pusData, { ordered: false });
};
const getAccount = async (req, res) => {
  console.log("🔍 Request getAccount");

  try {
    // Dùng findOneAndUpdate để đảm bảo chỉ 1 thread lấy được 1 account duy nhất
    const account = await Account.findOneAndUpdate(
      { isUsed: false }, // chỉ lấy account chưa dùng
      { $set: { isUsed: true } }, // đánh dấu là đang dùng
      { new: true } // ưu tiên lấy acc cũ nhất
    );

    // Nếu không còn tài khoản trống
    if (!account) {
      return res.status(404).json({
        message: "Không còn tài khoản trống để sử dụng",
        code: 404,
      });
    }

    // ✅ Trả về thông tin tài khoản
    return res.json({
      username: account.username,
      password: account.password,
      code: 200,
    });
  } catch (error) {
    console.error("❌ Lỗi getAccount:", error);
    return res.status(500).json({
      message: "Server Error",
      code: 500,
    });
  }
};

const deleteAllAccounts = async (req, res) => {
  try {
    await Account.deleteMany({});
    return res.json({
      message: "deleted all users",
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      code: 500,
    });
  }
};

const resetAccount = async (req, res) => {
  try {
    const result = await Account.updateMany(
      {}, // áp dụng cho tất cả tài khoản
      { $set: { isUsed: false } } // đặt lại trạng thái
    );

    return res.status(200).json({
      message: `✅ Đã reset trạng thái cho ${result.modifiedCount} tài khoản`,
      code: 200,
    });
  } catch (error) {
    console.error("❌ Lỗi resetAccount:", error);
    return res.status(500).json({
      message: "Server Error",
      code: 500,
    });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Trang hiện tại
    const limit = parseInt(req.query.limit) || 20; // Số dòng mỗi trang

    const skip = (page - 1) * limit;

    const [accounts, total] = await Promise.all([
      Account.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Account.countDocuments(),
    ]);

    return res.status(200).json({
      data: accounts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return res.status(500).json({
      message: "Server Error",
      code: 500,
    });
  }
};
export {
  addAccountsList,
  getAccount,
  getAllAccounts,
  resetAccount,
  deleteAllAccounts,
};
