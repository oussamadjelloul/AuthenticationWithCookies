import express from 'express';
import http, { Server } from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './Routers';
const app = express();

app.use(cors({ credentials: true, origin: true }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
const server: Server = http.createServer(app);

const Mongdb_url: string = 'mongodb+srv://oussamadjelloul9:tvyz88GmhYKZ4B7g@cluster0.elooh92.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(Mongdb_url);
mongoose.connection.on('error', (err: Error) => {
    console.log(err.message);
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.use('/', router());


