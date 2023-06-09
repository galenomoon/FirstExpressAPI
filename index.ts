import 'express-async-errors'
import express from 'express'
import cors from "cors"

const server = express()

// ~ Middlewares
server.use(express.json()) // all requests as JSON
server.use(cors()) // no cors errors

let data = [
  { id: 1, title: "Primeiro", description: "Hello Express" },
  { id: 2, title: "Segundo", description: "Hello Node!" }
]

// ~ Routes

server.get("/", (req, res) => res.status(200).json({ success: "OK" }))

server.get("/posts", (_, res) => res.status(200).json(data))

server.get("/posts/:id", (req, res) => {
  const { id } = req.params
  const post = data.find(post => post.id === Number(id))

  if (!post) {
    return res.status(404).json({ message: "Post not found" })
  }

  return res.status(200).json(post)
})

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params

  if (!data.some(post => post.id === Number(id))) {
    return res.status(404).json({ message: "Post not found" })
  }

  data = data.filter(post => post.id !== Number(id))

  return res.status(200).json(data)
})

server.post("/posts/", (req, res) => {
  const { title, description } = req.body
  if (!title || !description) {
    return res.status(400).json({ message: "Missing required params" })
  }

  data.push({ id: data.length + 1, title, description })

  return res.status(201).json(data)
})

server.put("/posts/:id", (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  const post_index = data.findIndex(post => post.id === Number(id))
  data[post_index] = { id: Number(id), title: title || null, description: description || null }
  return res.status(200).json(data[post_index])
})

server.patch("/posts/:id", (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  const post_index = data.findIndex(post => post.id === Number(id))

  data[post_index].title = title || data[post_index].title
  data[post_index].description = description || data[post_index].description
  return res.status(200).json(data[post_index])
})


server.listen(8000, () => console.log("API running!"))