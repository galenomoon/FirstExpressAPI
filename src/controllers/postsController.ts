import { Request, Response } from "express"
import PostUseCase from '../useCases/postUseCase'

const postUseCase = new PostUseCase()

class PostController {

  async getAll(_: Request, res: Response) {
    const data = await postUseCase.getAll()
    return res.status(200).json(data)
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const post = await postUseCase.getById(Number(id))
    return res.status(200).json(post)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const data = await postUseCase.delete(Number(id))
    return res.status(200).json(data)
  }

  async create(req: Request, res: Response) {
    const { title, description } = req.body

    const data = await postUseCase.create({ title, description })
    return res.status(201).json(data)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { title, description } = req.body

    const data = await postUseCase.update(Number(id), { title, description })
    return res.status(200).json(data)
  }

  async updatePartial(req: Request, res: Response) {
    const { id } = req.params
    const { title, description } = req.body

    const data = await postUseCase.updatePartial(Number(id), { title, description })
    return res.status(200).json(data)
  }
}

export default PostController