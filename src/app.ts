//express application configuration file
import express from 'express'
import  routers  from './api'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/',routers)

export { app }