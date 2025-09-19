import 'dotenv/config';
import app from './app.ts';

//import express from 'express'

// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

// import routes from "./routes/index.ts"
// app.use(routes)

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// app.get("/", (req, res) => {
//     res.send(JSON.stringify('API is working'))
// })

// app.post("/post", (req, res) => {
//     const data = req.body;
//     res.status(201).json({"message": "Item created", "Item" : data})
// })
//app.get("/views", router)
