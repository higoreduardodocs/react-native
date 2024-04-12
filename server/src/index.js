import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import { errors } from './middlewares/error-handler.js'
import requestInterceptor from './middlewares/request-interceptor.js'
import connectWithRetry from './config/mongo.js'
import routes from './routes/index.js'

/* START */
dotenv.config()
const app = express()

/* CONST */
const serverPort = process.env.SERVER_PORT || 8000

/* CONFIGURATIONS */
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

/* MONGOOSE SETUP */
connectWithRetry()

/* ROUTES */
app.all('*', requestInterceptor)
app.use('/', routes)

/* ERRORS */
app.use(errors)

/* LISTEN */
app.listen(serverPort, () => {
  console.log(`🚀 running on: http://localhost:${serverPort}`)
})
