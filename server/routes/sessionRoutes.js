import express from "express";
import verifyToken from "../middleware/verifyToken";
import verifyAccess from "../middleware/verifyAccess";

import SessionController from "../controllers/sessionController";

const SessionRouter = express.Router();
SessionRouter.post("/signup",verifyToken, verifyAccess("user"),SessionController.SessionDetails);
SessionRouter.get("/all", verifyToken, verifyAccess("user"),SessionController.getAllSessionDetails);
SessionRouter.get('/:id',verifyToken, verifyAccess("user"), SessionController.getOneSession);
SessionRouter.patch('/:id/approved',verifyToken, verifyAccess("mentor"), SessionController.updateSessionStatusApproved);
SessionRouter.patch('/:id/decline',verifyToken, verifyAccess("mentor"), SessionController.updateSessionStatusDecline);
SessionRouter.patch('/:id', verifyToken, verifyAccess("user"),SessionController.UpdateOneSession);
SessionRouter.delete('/:id',verifyToken, verifyAccess("admin"),SessionController.DeleteOneSession);


export default SessionRouter;