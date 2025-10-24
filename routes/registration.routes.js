import { Router } from "express";

import { registerEvent } from "../controllers/registration.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const registrationRouter = Router();

//For this process first we need to login successfully and for registering we need to copy the token of user and paste in auth and pass eventId as param
registrationRouter.post('/:eventId',protect,registerEvent);

export default registrationRouter;