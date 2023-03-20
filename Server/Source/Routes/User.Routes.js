import express from 'express';

import { CreateUser, GetAllUsers, GetUserInfoByID } from '../Controllers/User.Controller.js';

const router = express.Router();

router.route("/").get(GetAllUsers)
router.route("/:id").get(GetUserInfoByID)
router.route("/").post(CreateUser)

export default router