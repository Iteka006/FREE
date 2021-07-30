import express from "express";

import SessionController from "../controllers/sessionController";

const SessionRouter = express.Router();
SessionRouter.post("/signup", SessionController.SessionDetails);
SessionRouter.get("/all", SessionController.getAllSessionDetails);
SessionRouter.get('/:id', SessionController.getOneSession);
SessionRouter.patch('/:id', SessionController.UpdateOneSession);
SessionRouter.delete('/:id',SessionController.DeleteOneSession);


export default SessionRouter;