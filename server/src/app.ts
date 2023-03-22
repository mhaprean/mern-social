import express, { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import upload, { UploadedFile } from 'express-fileupload';

import { v2 as cloudinary } from 'cloudinary';

const app = express();
dotenv.config();

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log the configuration
console.log(cloudinary.config());

// app middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(upload());

app.post('/api/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  try {
    let sampleFile = (req as any).files.image;
    const b64 = Buffer.from(sampleFile.data).toString('base64');

    const dataURI = 'data:' + sampleFile.mimetype + ';base64,' + b64;

    const uploadedImage = await cloudinary.uploader.upload(dataURI, {
      folder: 'mern-social',
      public_id: sampleFile.name,
    });

    return res.status(200).json({ message: 'hello from upload route', uploadedImage: uploadedImage });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

app.get('/', (req, res) => {
  return res.send('welcome to our MERN Social app API.');
});

export default app;
