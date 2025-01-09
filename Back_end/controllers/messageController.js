const Message = require("../models/message");

// Gửi Tin Nhắn
exports.sendMessage = async (req, res) => {
    const { conversationId, senderId, content } = req.body;
  
    try {
      const message = await Message.create({
        conversationId,
        sender: senderId,
        content,
      });
  
      res.status(201).json({
        status: "success",
        data: message,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
  
  // Lấy Tin Nhắn
  exports.getMessages = async (req, res) => {
    const { conversationId } = req.params;
  
    try {
      const messages = await Message.find({ conversationId })
        .populate("sender", "name avatar") // Lấy thông tin người gửi (tùy vào User model của bạn)
        .sort({ createdAt: 1 }); // Sắp xếp theo thứ tự thời gian
  
      res.status(200).json({
        status: "success",
        data: messages,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };