import {Router} from "express"
import { createRoom, deleteRoom, editRoom, getAllRooms, getRoom } from "../controllers/room.controller.js";
import { verifingJWT } from "../middleware/auth.middleware.js";
const  router = Router();
router.use(verifingJWT);

router.route("/").get(getAllRooms)
router.route("/:roomId").get(getRoom).delete(deleteRoom).patch(editRoom)
router.route("/create").post(createRoom)

export default router