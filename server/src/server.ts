import app from './app.ts'

//import express from 'express'

// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({extended: false}))


const PORT = 3001;

// import routes from "./routes/index.ts"
// app.use(routes)

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))


// app.get("/", (req, res) => {
//     res.send(JSON.stringify('API is working'))
// })

// app.post("/post", (req, res) => {
//     const data = req.body;
//     res.status(201).json({"message": "Item created", "Item" : data})
// })
//app.get("/views", router)