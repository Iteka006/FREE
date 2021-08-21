import express from "express";
import Validator from "../middleware/validator";
import userController from "../controllers/userController";

import Datachecker from "../middleware/dataChecker";
import verifyToken from "../middleware/verifyToken";
import verifyAccess from "../middleware/verifyAccess";
import bcrypt from "bcrypt";
const userRouter = express.Router();

userRouter.post ("/signup",
Validator.newAccountRules(),
Validator.ValidateInput,
Datachecker.validateEmailDuplication,
Datachecker.checkAge,
userController.signupUser);

userRouter.get("/all", userController.getAllUsers);
userRouter.get("/mentors",verifyToken, verifyAccess("user"), userController.GetAllMentors);
userRouter.get('/:id', userController.getOneUser);
userRouter.get('/:id', userController.getOneMentor);

userRouter.patch('/:id',verifyToken, verifyAccess("user"),
Validator.newAccountRules(),
Validator.ValidateInput,
Datachecker.checkAge, userController.UpdateOneUser);

userRouter.delete('/:id', verifyToken, verifyAccess("admin"), userController.DeleteOneUser);
userRouter.post("/signin", userController.signinUser);
userRouter.patch("/:id/role", verifyToken, verifyAccess("admin"), userController.UpdateOneUserRole);



export default userRouter;
