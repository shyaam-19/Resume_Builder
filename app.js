//importing important packages
import express from 'express'
import dotenv from 'dotenv'
import Connectdb from '../CV.com-main/config/db.js'
import morgan from 'morgan'
import authRoute from '../CV.com-main/routes/authRoute.js'
import cors from 'cors'

//making express app
const app = express();


//configure dotenv file
dotenv.config();


//middlware for dubbging
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Connecting to database
Connectdb();

app.use('/api/v1/auth',authRoute);


app.get('/',(req,res)=>{
    res.send('<h1>Hii i am harsh</h1>');
})

app.listen(process.env.PORT,()=>{
    console.log(`App is running succesfully on port ${process.env.PORT}`);
})