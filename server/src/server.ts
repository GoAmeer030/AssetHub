import express from "express";
import { PrismaClient } from "@prisma/client";
import { config as dotenvConfig } from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from 'fs';
import path from 'path';

import FileManager from "./managers/fileManager";
import AuthManager from "./managers/authManager";

dotenvConfig();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const departmentMap = {
            1: 'CSE',
            2: 'IT',
            3: 'ECE',
            4: 'EEE'
        }
        const dir = 'public/data/' + req.body.batch + '/' + departmentMap[req.body.department as keyof typeof departmentMap] + '/' + req.body.year + '/' + req.body.semester + '/' + req.body.subjectCode;
        fs.mkdirSync(path.join(__dirname, '../' + dir), { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        cb(null, req.body.fileName + '_' + formattedDate + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage: storage });

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
};
app.use(cors(corsOptions));
app.use('/public', express.static('public'));

const prisma = new PrismaClient();

app.get("/",async (req, res) => {
    const staffCount = await prisma.staff.count();
    res.json({ staffCount });
})


const authManager = new AuthManager();

app.post("/verify-token", upload.none(), (req, res) => {
    authManager.verifyTokenHandler(req, res);
});

app.post("/login", upload.none(), (req, res) => {
    authManager.loginHandler(req, res);
});


const fileManager = new FileManager();

app.post("/addfile", upload.single('file'), (req, res, next) => {
    fileManager.addFileHandler(req, res, authManager);
});

app.get("/getfiles", upload.none(), (req, res) => {
    fileManager.getFileHandler(req, res);
});

app.delete("/deletefile/:id", upload.none(), (req, res) => {
    fileManager.deleteFileHandler(req, res, Number(req.params.id), authManager);
});

app.listen(3001, (): void => {
    console.log("\nServer Ready\n> Port : 3001");
});