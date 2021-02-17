import express from 'express';
import { IndexController } from './controller/index.controller.js';

const app = express()
const port = 3000

app.use(express.static('public'))

//extract request body to json format
app.use(express.json())

//init controller
new IndexController().init(app);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})