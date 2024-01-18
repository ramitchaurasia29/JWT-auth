const express=require("express");
const { registerDeal, loginDeal, currentDeal } = require("../controllers/dealController");
const router=express.Router();
const app=express()

router.post("/register",registerDeal)
router.post("/login",loginDeal)
router.get("/current",currentDeal)

module.exports=router