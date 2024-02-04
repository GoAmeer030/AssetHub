import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import AuthManager from './authManager';

export default class FileManager {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    addFileHandler = async (req: Request, res: Response, authManager: AuthManager) => {
        if (!req.file || !req.file.path) {
            res.status(400).send({ error: 'No file uploaded' });
            return;
        }

        const staff = await authManager.authUser(req, res);

        if (!staff || !('id' in staff.user)) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        const file = await this.prisma.file.create({
            data: {
                batch: req.body.batch,
                year: req.body.year,
                department: req.body.department,
                semester: req.body.semester,
                subjectcode: req.body.subjectCode,
                filename: req.body.fileName,
                fileurl: req.file.path,
                staffid: staff.user.id
            }
        });

        res.status(200);
    }

    getFileHandler = async (req: Request, res: Response) => {
        const file = await this.prisma.file.findMany();

        if (!file) {
            res.status(400).send({ error: 'File not found' });
            return;
        }

        res.status(200).send({ file });
    }
}