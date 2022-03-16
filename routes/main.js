const express = require("express");
const router = express.Router();

// const authMiddleware = require("../middlewares/auth-middleware");
const controller = require("../controller/main");

// 메인페이지 신상품
router.get("/main", controller.mainpage);

// 서브페이지 베스트
router.get("/detail/:postId", controller.detailpage);


module.exports = router;