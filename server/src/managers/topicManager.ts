import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import AuthManager from './authManager';
import fs from 'fs';

export default class TopicManager {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    addTopicHandler = async (req: Request, res: Response, authManager: AuthManager) => {
        const staff = await authManager.authUser(req, res);

        if (!staff || !('id' in staff.user)) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        await this.prisma.topic.create({
            data: {
                topicname: req.body.topicName,
                topicdisc: req.body?.topicDisc,
                syllabus: req.body.syllabus,
                year: req.body.year,
                department: req.body.department,
                semester: req.body.semester,
                subjectcode: req.body.subjectCode,
                staffid: staff.user.id,
            }
        });

        res.status(200).send();
    }

    getTopicHandler = async (req: Request, res: Response) => {
        let searchQuery: any = {};

        if ('staffId' in req.query) {
            searchQuery.staffid = Number(req.query.staffId);
        } else {
            const queryParameters = ['syllabus', 'department', 'year', 'semester', 'subjectCode', 'fileName', 'staffId'];
            queryParameters.forEach(param => {
                if (req.query[param] != '') searchQuery[param.toLowerCase()] = req.query[param];
            });
        }

        const topic = await this.prisma.topic.findMany({
            where: searchQuery
        });

        if (!topic) {
            res.status(400).send({ error: 'No Topics found' });
            return;
        }

        res.status(200).send({ topic });
    }

    deleteTopicHandler = async (req: Request, res: Response, id: number, authManager: AuthManager) => {
        const staff = await authManager.authUser(req, res);

        if (!staff || !('id' in staff.user)) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        const topic = await this.prisma.topic.findUnique({
            where: {
                id: id
            }
        });

        if (!topic) {
            res.status(400).send({ error: 'Topic not found' });
            return;
        }

        if (topic.staffid !== staff.user.id) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }

        await this.prisma.topic.delete({
            where: {
                id: id
            }
        });
    }
}