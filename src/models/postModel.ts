import { ICreatePost, IUpdatePost } from "../interfaces/posts"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class PostModel {
  async getAll() {
    const posts = await prisma.post.findMany()
    return posts
  }

  async getById(id: number) {
    const post = await prisma.post.findUnique({ where: { id } })
    return post
  }

  async delete(id: number) {
    if (!this.getById(id)) return null

    await prisma.post.delete({ where: { id } })
    return this.getAll()
  }

  async create({ title, description }: ICreatePost) {    
    const post = await prisma.post.create({ data: { title, description } })
    return post
  }

  async update(id: number, { title, description }: IUpdatePost) {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title: title || "",
        description: description || ""
      }
    })
    return post
  }

  async updatePartial(id: number, { title, description }: IUpdatePost) {
    const received_post = await this.getById(id)

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: title || received_post?.title,
        description: description || received_post?.description
      }
    })

    return post
  }
}

export default PostModel