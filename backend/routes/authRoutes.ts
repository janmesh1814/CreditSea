import express from "express";
import { registerUser, loginUser } from "../controllers/authControllers";

console.log("registerUser:", registerUser); // <- TEMP debug line
console.log("loginUser:", loginUser); // <- TEMP debug line

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
