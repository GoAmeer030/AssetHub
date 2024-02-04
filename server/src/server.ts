import express from "express";
import { PrismaClient } from "@prisma/client";
import { config as dotenvConfig } from "dotenv";
import cors from "cors";
import multer from "multer";

import FileManager from "./managers/fileManager";
import AuthManager from "./managers/authManager";

dotenvConfig();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
};
app.use(cors(corsOptions));

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


app.listen(3001, (): void => {
    console.log("\nServer Ready\n> Port : 3001");
});