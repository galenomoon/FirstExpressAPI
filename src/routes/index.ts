import { Router } from "express";

//CRUD'S
import postRoutes from "./posts.routes";

const routes = Router()

routes.use("/posts", postRoutes)

routes.get("/", (_, res) => res.status(200).json({ success: "OK" }))

export default routes
