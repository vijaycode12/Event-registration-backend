import { Router } from "express";

import { getEvents,getEventsById } from "../controllers/event.controller.js";

const eventRouter = Router();

eventRouter.get('/',getEvents);

eventRouter.get('/:id',getEventsById);


export default eventRouter;