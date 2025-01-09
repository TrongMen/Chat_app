const Conversation = require("../models/conversation");

exports.getOrCreateConversation = async (req, res) => {
    const { senderId, recipientId } = req.body;
  
    try {
      // Kiểm tra nếu hội thoại đã tồn tại
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, recipientId] },
      });
  
      // Nếu chưa có thì tạo mới
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, recipientId],
        });
      }
  
      res.status(200).json({
        status: "success",
        data: conversation,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  
  