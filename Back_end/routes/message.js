const express = require("express");
const authController = require("../controllers/authController");
const router = require("express").Router();
const messageController = require("../controllers/messageController")

// Middleware bảo vệ tất cả các route (chỉ cho phép người dùng đã đăng nhập)
router.use(authController.protect);

// Gửi tin nhắn
router.post("/", messageController.sendMessage);

// Lấy tin nhắn của một conversation
router.get("/:conversationId", messageController.getMessages);

// Xóa tin nhắn
// router.delete("/:messageId", messageController.deleteMessage);

module.exports = router;
