import express, { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// app middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.get('/', (req, res) => {
  return res.send('welcome to our MERN Social app API.');
});


export default app;