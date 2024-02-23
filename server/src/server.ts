import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
import multer from 'multer';

import fs from 'fs';
import path from 'path';
import { config as dotenvConfig } from 'dotenv';

import { ErrorHandlerMiddleware, CheckValidUser } from './middleware';

import TopicManager from './managers/topicManager';
import AuthManager from './managers/authManager';
import AssetManager from './managers/assetManager';

// Loading env variables
dotenvConfig();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir;
    if (req.body.staffid) {
      dir = 'public/profilepic/';
    } else {
      const departmentMap = {
        1: 'CSE',
        2: 'IT',
        3: 'ECE',
        4: 'EEE',
      };
      dir =
        'public/data/' +
        req.body.syllabus +
        '/' +
        departmentMap[req.body.department as keyof typeof departmentMap] +
        '/' +
        req.body.year +
        '/' +
        req.body.semester +
        '/' +
        req.body.subjectCode;
    }
    fs.mkdirSync(path.join(__dirname, '../' + dir), { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let fileName;
    if (req.body.staffid) {
      fileName =
        req.body.staffid + 'profilepic.' + file.originalname.split('.').pop();
    } else {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      fileName =
        req.body.fileName +
        '_' +
        formattedDate +
        '.' +
        file.originalname.split('.').pop();
    }
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

// Express app configuration
const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use('/public', express.static('public'));

// Prisma client configuration
const prisma = new PrismaClient();

// Basic Routes
app.get('/', (req, res) => {
  const staffCount = prisma.staff.count();
  const topicCount = prisma.topic.count();
  const assetCount = prisma.asset.count();

  res.status(200).send({
    staffCount,
    topicCount,
    assetCount,
  });
});

// Auth Routes
const authManager = new AuthManager();

app.post('/verify-token', CheckValidUser, upload.none(), (req, res) => {
  authManager.verifyTokenHandler(req, res);
});

app.post('/login', upload.none(), (req, res) => {
  authManager.loginHandler(req, res);
});

// Topic Routes
const topicManager = new TopicManager();

app.post('/addtopic', CheckValidUser, upload.single('file'), (req, res) => {
  topicManager.addTopicHandler(req, res);
});

app.get('/gettopics', CheckValidUser, upload.none(), (req, res) => {
  topicManager.getTopicHandler(req, res);
});

app.delete('/deletetopic/:id', upload.none(), (req, res) => {
  topicManager.deleteTopicHandler(req, res, Number(req.params.id));
});

// Asset Routes

const assetManager = new AssetManager();

app.post('/addasset', CheckValidUser, upload.single('file'), (req, res) => {
  assetManager.addAssetHandler(req, res);
});

app.get('/getassets', CheckValidUser, upload.none(), (req, res) => {
  assetManager.getAssetHandler(req, res);
});

app.delete('/deleteasset/:id', CheckValidUser, upload.none(), (req, res) => {
  assetManager.deleteAssetHandler(req, res, Number(req.params.id));
});

// Error handling middleware
app.use(ErrorHandlerMiddleware);

// Server configuration
app.listen(3001, (): void => {
  console.log('\nServer Ready\n> Port : 3001');
});
