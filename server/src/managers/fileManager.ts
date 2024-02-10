import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import AuthManager from './authManager';
import fs from 'fs';

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
                syllabus: req.body.syllabus,
                year: req.body.year,
                department: req.body.department,
                semester: req.body.semester,
                subjectcode: req.body.subjectCode,
                filename: req.body.fileName,
                fileurl: req.file.path,
                staffid: staff.user.id
            }
        });

        res.status(200).send();
    }

    getFileHandler = async (req: Request, res: Response) => {
        let searchQuery: any = {};

        if ('staffId' in req.query) {
            searchQuery.staffid = Number(req.query.staffId);
        } else {
            const queryParameters = ['syllabus', 'department', 'year', 'semester', 'subjectCode', 'fileName'];
            queryParameters.forEach(param => {
                if (req.query[param] != '') searchQuery[param.toLowerCase()] = req.query[param];
            });
        }

        const file = await this.prisma.file.findMany({
            where: searchQuery
        });

        if (!file) {
            res.status(400).send({ error: 'File not found' });
            return;
        }

        res.status(200).send({ file });
    }

    deleteFileHandler = async (req: Request, res: Response, id: number, authManager: AuthManager) => {
        const staff = await authManager.authUser(req, res);

        if (!staff || !('id' in staff.user)) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        const file = await this.prisma.file.findUnique({
            where: {
                id: id
            }
        });

        if (!file) {
            res.status(400).send({ error: 'File not found' });
            return;
        }

        if (file.staffid !== staff.user.id) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        await this.prisma.file.delete({
            where: {
                id: id
            }
        });

        const filePath = file.fileurl;
        fs.unlinkSync(filePath);

        res.status(200).send();
    }
}