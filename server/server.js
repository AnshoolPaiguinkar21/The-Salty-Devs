import express from 'express'
import router from "./Routes/postRoutes.js"

// const app = express()
const app = router;

app.use(express.json())

// app.get("/", (req, res) => {
//     res.send(JSON.stringify('API is working'))
// })

// app.post("/post", (req, res) => {
//     const data = req.body;
//     res.status(201).json({"message": "Item created", "Item" : data})
// })


app.get("/views", router)

const PORT = 3001;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))