import express from "express"
import routes from "@routes/index.ts"
import cookieParser from "cookie-parser"

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routes)

export default app;