import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

export const app = express();  // app is root router

const router = express.Router();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));


router.get('/me', (req, res) => {
  res.send({ me: 'Hey!' });
});

const routes = ['get /dog', 'get /dpg/:id', 'post /dog', 'put /dog/:id', 'delete /dog/:id'];

// app.route()...
router.route('/dog')
  .get()
  .post();

//app.route()...
router.route('/dog/:id')
  .get()
  .put()
  .delete();


app.use('/api', router);

const log = (req, res, next) => {
  console.log('logging');
  next();
};

app.use(log);

app.get('/data', log, (req, res) => {
  res.status(200).send('Hello World!');
});

app.post('/data', [log, log, log], (req, res) => {
  console.log('request body:', req.body);
  res.status(201).send(req.body);
});

export const start = () => {
  app.listen('4000');
};
