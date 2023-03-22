import express from 'express';

import { CreateProperty, DeleteProperty, GetAllProperties, GetPropertyDetails, UpdateProperty } from '../Controllers/Property.Controller.js';

const router = express.Router();

router.route("/:id").delete(DeleteProperty)
router.route("/").get(GetAllProperties)
router.route("/:id").get(GetPropertyDetails)
router.route("/:id").patch(UpdateProperty)
router.route("/").post(CreateProperty)

export default router