import 'dotenv/config';
import app from './app.ts';
import config from 'constants/config.ts';

const port = config.PORT   //process.env.PORT || 4000;
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
