import express from "express";

import userController from "../controllers/userController";

const userRouter = express.Router();
userRouter.post("/signup", userController.signupUser);
userRouter.get("/all", userController.getAllUsers);
userRouter.get('/:id', userController.getOneUser);
userRouter.patch('/:id', userController.UpdateOneUser);
userRouter.delete('/:id', userController.DeleteOneUser);


export default userRouter;