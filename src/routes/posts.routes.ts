import { Router } from "express"
import PostController from "../controllers/postsController"

const postRoutes = Router()

const postController = new PostController()

postRoutes.get("/", postController.getAll)
postRoutes.get("/:id", postController.getById)
postRoutes.post("/", postController.create)
postRoutes.put("/:id", postController.update)
postRoutes.patch("/:id", postController.updatePartial)
postRoutes.delete("/:id", postController.delete)

export default postRoutes