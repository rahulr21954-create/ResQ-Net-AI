import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import emergencyRoutes from './routes/emergencyRoutes.js'
import hospitalRoutes from "./routes/hospitalRoutes.js";
import policeRoutes from "./routes/policeRoutes.js";
import aiRoutes from './routes/aiRoutes.js'
import floodAlertRoutes from "./routes/floodAlertRoutes.js";
import floodPredictionRoutes from "./routes/floodPredictionRoutes.js";



const app=express();

app.use(cors({
    origin: [
  "http://localhost:5173",
  "https://res-q-net-ai-eta.vercel.app"
]
,
    credentials:true,

}))

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/emergency',emergencyRoutes)
app.use("/api/hospitals", hospitalRoutes);
app.use('/api/police',policeRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/flood-alerts", floodAlertRoutes);
app.use(
  "/api/flood-prediction",
  floodPredictionRoutes
);


app.get('/',(req,res)=>{
    res.send("ResQ Net AI Backend Running!")
})

export default app;
