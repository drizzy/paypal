import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { mongodb } from './config/mongoose';
import routes from './routes/index';

/* Init app */
const app = express();
 
/* Iniciar mongodb*/
mongodb();

/* Middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  req.header('Access-Control-Allow-Origin', 'http://localhost3000'); //Domain
  req.header('Access-Control-Allow-Credentials', 'true');
  req.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
  req.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  next();
})
app.use(cors());

routes(app);

export default app;
