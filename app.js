import express from 'express';
import { IndexController } from './controller/index.controller.js';

const app = express();
const port = 3000;

//serve public folder
app.use(express.static('public'));

//extract request body to json format
app.use(express.json());

//init controller
new IndexController().init(app);

//start server
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});