import cors from 'cors';
import express from 'express';

import multer from 'multer';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { config as dotenvConfig } from 'dotenv';

import fs from 'fs';
import path from 'path';

import { ErrorHandlerMiddleware, CheckValidUser } from './middleware';

import AdminManager from './managers/adminManager';
import UserManager from './managers/userManager';
import TopicManager from './managers/topicManager';
import AuthManager from './managers/authManager';
import AssetManager from './managers/assetManager';
import MailManager from './managers/mailManager';

// Loading env variables
dotenvConfig();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir;
    if (file.fieldname === 'photo') {
      dir = 'public/profilepic/';
    } else if (file.fieldname === 'contact') {
      dir = `public/contact/`;
    } else {
      dir = 'public/data/' + req.body.topicId;
    }
    fs.mkdirSync(path.join(__dirname, '../' + dir), { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let fileName;
    if (req.body.staffID) {
      req.body.staffID = req.body.staffID.replace('/', '_');
      fileName =
        req.body.staffID + '_profilepic.' + file.originalname.split('.').pop();
    } else if (file.fieldname === 'contact') {
      fileName = file.originalname.replace(/ /g, '_');
    } else {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}_${date.getMinutes()}}`;
      fileName =
        file.originalname.replace(/ /g, '_').split('.')[0] +
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

// Logger
app.use(morgan('dev'));

// Prisma client configuration
const prisma = new PrismaClient();

// Basic Routes
app.get('/', async (req, res) => {
  const staffCount = await prisma.staff.count();
  const topicCount = await prisma.topic.count();
  const assetCount = await prisma.asset.count();

  res.status(200).send({
    staffCount,
    topicCount,
    assetCount,
  });
});

// Admin Routes
const adminManager = new AdminManager();

app.post(
  '/admin/staff-register',
  upload.single('photo'),
  adminManager.addStaffHandler,
);

// User Routes
const userManager = new UserManager();

app.get(
  '/getstaffdetails',
  CheckValidUser,
  upload.none(),
  userManager.getStaffHandler,
);

// Auth Routes
const authManager = new AuthManager();

app.post(
  '/verify-token',
  CheckValidUser,
  upload.none(),
  authManager.verifyTokenHandler,
);
app.post('/login', upload.none(), authManager.loginHandler);

// Topic Routes
const topicManager = new TopicManager();

app.post(
  '/addtopic',
  CheckValidUser,
  upload.single('file'),
  topicManager.addTopicHandler,
);
app.get(
  '/gettopics',
  CheckValidUser,
  upload.none(),
  topicManager.getTopicHandler,
);
app.delete(
  '/deletetopic/:id',
  CheckValidUser,
  upload.none(),
  topicManager.deleteTopicHandler,
);

// Asset Routes

const assetManager = new AssetManager();

app.post(
  '/addasset',
  CheckValidUser,
  upload.array('file', 1),
  assetManager.addAssetHandler,
);
app.get(
  '/getassets',
  CheckValidUser,
  upload.none(),
  assetManager.getAssetHandler,
);
app.delete(
  '/deleteasset/:id',
  CheckValidUser,
  upload.none(),
  assetManager.deleteAssetHandler,
);

// Mail Routes
const mailManager = new MailManager();

app.post(
  '/sendmail',
  CheckValidUser,
  upload.array('contact'),
  mailManager.sendMail,
);

// Error handling middleware
app.use(ErrorHandlerMiddleware);

// Server configuration
app.listen(3001, (): void => {
  console.log('\nServer Ready\n> Port : 3001\n');
});
