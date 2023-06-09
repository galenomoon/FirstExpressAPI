import { Request, Response } from "express"
import PostUseCase from '../useCases/postUseCase'

const postUseCase = new PostUseCase()

class PostController {

  getAll(_: Request, res: Response) {
    const data = postUseCase.getAll()
    return res.status(200).json(data)
  }

  getById(req: Request, res: Response) {
    const { id } = req.params
    const post = postUseCase.getById(Number(id))

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    return res.status(200).json(post)
  }

  delete(req: Request, res: Response) {
    const { id } = req.params
    const data = postUseCase.delete(Number(id))
    return res.status(200).json(data)
  }

  create(req: Request, res: Response) {
    const { title, description } = req.body

    if (!title || !description) {
      return res.status(400).json({ message: "Missing required params" })
    }

    const data = postUseCase.create({ title, description })
    return res.status(201).json(data)
  }

  update(req: Request, res: Response) {
    const { id } = req.params
    const { title, description } = req.body

    const data = postUseCase.update(Number(id), { title, description })
    return res.status(200).json(data)
  }

  updatePartial(req: Request, res: Response) {
    const { id } = req.params
    const { title, description } = req.body

    const data = postUseCase.updatePartial(Number(id), { title, description })
    return res.status(200).json(data)
  }
}

export default PostController