const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { GetObjectCommand } = require('@aws-sdk/client-s3');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

app.post('/generate-upload-url', async (req, res) => {
  const { filename, filetype } = req.body;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    ContentType: filetype,
  });

  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 900 }); // 15 minutes
    res.json({ url: signedUrl });
  } catch (err) {
    console.error('Error generating signed URL:', err);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend is running on http://localhost:${PORT}`);
});

app.get('/generate-download-url', async (req, res) => {
    const filename = req.query.filename;
    if (!filename) return res.status(400).json({ error: 'Missing filename' });
  
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename
    });
  
    try {
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 900 }); // 15 min
      res.json({ url: signedUrl });
    } catch (err) {
      console.error('Error generating download URL:', err);
      res.status(500).json({ error: 'Failed to generate download URL' });
    }
  });