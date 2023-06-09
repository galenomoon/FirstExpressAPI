
let data = [
  { id: 1, title: "Primeiro", description: "Hello Express" },
  { id: 2, title: "Segundo", description: "Hello Node!" }
]

interface ICreatePost {
   title: string,
   description: string 
}

interface IUpdatePost {
  title?: string,
  description?: string
}

class PostUseCase {
  getAll() {
    return data
  }

  getById(id:number) {
    const post = data.find(post => post.id === Number(id)) || null
    return post
  }

  delete(id:number) {
    if (!this.getById(id)) return null
    data = data.filter(post => post.id !== Number(id))
    return data
  }

  create({ title, description }: ICreatePost) {
  
    data.push({ id: data.length + 1, title, description })
    return data
  }

  update(id:number, { title, description}:IUpdatePost) {
    const post_index = data.findIndex(post => post.id === Number(id))
    data[post_index] = { id: Number(id), title: title || "", description: description || "" }
    return data[post_index]
  }

  updatePartial(id:number, { title, description}:IUpdatePost) {
    const post_index = data.findIndex(post => post.id === Number(id))

    data[post_index].title = title || data[post_index].title
    data[post_index].description = description || data[post_index].description
    return data[post_index]
  }
}

export default PostUseCase