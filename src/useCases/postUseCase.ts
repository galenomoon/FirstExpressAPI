import { ICreatePost, IUpdatePost } from "../interfaces/posts"
import PostModel from "../models/postModel"
import AppError from "../errors/appError"

const postModel = new PostModel()

class PostUseCase {
  async getAll() {
    return await postModel.getAll()
  }

  async getById(id: number) {
    const post = await postModel.getById(id)
    if (!post) throw new AppError("Post not found", 404);
    return post
  }

  async delete(id: number) {
    if (!this.getById(id)) throw new AppError("Post not found", 404);
    return await postModel.delete(id)
  }

  async create({ title, description }: ICreatePost) {
    if (!title || !description) throw new AppError("Missing required params");

    return await postModel.create({ title, description })
  }

  async update(id: number, { title, description }: IUpdatePost) {
    if (!this.getById(id)) throw new AppError("Post not found", 404);
    return await postModel.update(id, { title, description })
  }

  async updatePartial(id: number, { title, description }: IUpdatePost) {
    if (!this.getById(id)) throw new AppError("Post not found", 404);
    return await postModel.updatePartial(id, { title, description })
  }
}

export default PostUseCase