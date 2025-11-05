import express from 'express';

import cors from 'cors';

import {PORT} from './config/env.js';

import authRouter from './routes/auth.routes.js';
import eventRouter from './routes/event.routes.js';
import registrationRouter from './routes/registration.routes.js';
import contactRouter from './routes/contact.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

app.use('/public', express.static('public'));

//This line is used to send details to frontend
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'https://events-omega-seven.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS Origin:', origin);
    // allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


// Allow OPTIONS requests to pass through arcjetMiddleware without blocking
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(arcjetMiddleware);

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/event',eventRouter);
app.use('/api/v1/register',registrationRouter);
app.use('/api/v1/contact',contactRouter);
app.use('/api/v1/workflow',workflowRouter);

app.use(errorMiddleware);

app.get('/',(req,res)=>{
    res.send('Welcome to event registration website');
});

app.listen(PORT,async()=>{
    console.log(`Welcome to event registration website on ${PORT}`);

    await connectToDatabase();
});

export default app;

