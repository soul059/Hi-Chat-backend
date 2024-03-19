import {Router} from "express"
import { createChat, deleteChat, getAllChatsInARoom } from "../controllers/chat.controller.js";
import { verifingJWT } from "../middleware/auth.middleware.js";
const  router = Router();

router.use(verifingJWT);

router.route("/:roomId").get(getAllChatsInARoom).post(createChat)
router.route("/:chatId").delete(deleteChat)

export default router