const router = require("express").Router();

const authRoute = require("./auth");
const userRoute = require("./user");
const messRoute = require("./message");

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/api", messRoute);

module.exports = router;