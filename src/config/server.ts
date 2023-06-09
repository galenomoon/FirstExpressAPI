import 'express-async-errors'
import express from 'express'
import cors from "cors"
import routes from '../routes'
import errorHandler from '../middlewares/errorHandler'

const server = express()

// ~ Middlewares
server.use(express.json()) // all requests as JSON
server.use(cors()) // no cors errors
server.use(routes)
server.use(errorHandler)

export default server