import express from 'express'

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send(JSON.stringify('yoooooooooooooooooooooooooooooo'))
})

app.post("/post", (req, res) => {
    const data = req.body;
    res.status(201).json({"message": "Item created", "Item" : data})
})

const PORT = 3001;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))