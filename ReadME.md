# Secure File Uploader – Backend (Node.js + Express)

This backend handles signed S3 URL generation for secure file uploads and downloads. Used in combination with the Angular frontend.

### 💡 Why it’s cool:

- Files are **private by default**
- Sharing works only via temporary signed links
- Backend never stores the file — it’s all on AWS S3

## ✨ Features

- `POST /generate-upload-url`  
  Returns a pre-signed URL to upload a file directly to S3

- `GET /generate-download-url?filename=xyz.pdf`  
  Returns a secure download link, valid for 15 mins

## 🛠 Tech Stack

- Node.js 16
- Express 4
- AWS SDK v3
- dotenv for environment variables

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/secure-file-uploader-backend.git
cd secure-file-uploader-backend
