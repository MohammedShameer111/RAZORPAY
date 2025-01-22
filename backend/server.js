import app from './app.js';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config({path:"config/config.env"});
const cors = require('cors');


const port=process.env.PORT || 3000

export const instance=new Razorpay({
  key_id:process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_API_SECRET
})



app.use(cors({
  origin: 'https://razorpay-5-96rl.onrender.com',
  credentials: true,
}));
app.listen(port,()=>{
  console.log(`server running ${port}`);
  
})