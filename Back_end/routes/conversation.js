const express = require("express");
const authController = require("../controllers/authController");
const router = require("express").Router();
const conversationController = require("../controllers/conversationController");

// Middleware bảo vệ tất cả các route (chỉ cho phép người dùng đã đăng nhập)
router.use(authController.protect);

// Tạo conversation mới
router.post("/", conversationController.createConversation);

// Lấy danh sách conversation của người dùng
router.get("/", conversationController.getConversations);

// Xóa một conversation
router.delete("/:conversationId", conversationController.deleteConversation);

module.exports = router;
