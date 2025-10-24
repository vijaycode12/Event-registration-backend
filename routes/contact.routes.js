import { Router } from "express";

import { sendContactEmail } from "../controllers/contact.controller.js";

const contactRouter = Router();

contactRouter.post("/",sendContactEmail);

export default contactRouter;