import { Router } from "express";
import { deleteUser, getCurrentUserProfile, loginUser, logoutUser, regusterUser , editUsername } from "../controllers/user.controller.js";
import {verifingJWT} from  '../middleware/auth.middleware.js'

const router = Router()

router.route("/reguster").post(regusterUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifingJWT,logoutUser)
router.route("/delete").delete(verifingJWT,deleteUser)
router.route('/current').get(verifingJWT,getCurrentUserProfile);
router.route('/edit').put(verifingJWT,editUsername);

export default router