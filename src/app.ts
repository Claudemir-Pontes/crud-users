//express application configuration file
import express from 'express'
import  routers  from './api'

const app = express()

app.use(express.json())
app.use('/',routers)

export { app }