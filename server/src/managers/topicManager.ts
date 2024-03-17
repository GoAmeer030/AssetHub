import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

import { extendedRequest } from '../../types/extendedTypes';

export default class TopicManager {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  addTopicHandler = async (req: extendedRequest | any, res: Response) => {
    const staff = req.user;

    if (!staff || !('id' in staff.user)) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }

    const existingStaff = await this.prisma.staff.findUnique({
      where: { id: staff.user.id },
    });
    if (!existingStaff) {
      res.status(400).send({ message: 'Staff not found' });
      return;
    }

    await this.prisma.topic.create({
      data: {
        topicname: req.body.topicName,
        topicdesc: req.body?.topicDesc,
        syllabus: req.body.syllabus,
        year: req.body.year,
        department: req.body.department,
        semester: req.body.semester,
        subjectcode: req.body.subjectCode,
        staffid: staff.user.id,
      },
    });

    res.status(200).send();
  };

  getTopicHandler = async (req: extendedRequest | any, res: Response) => {
    const user = req.user;

    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }

    let searchQuery: any = {};

    if ('staffId' in req.query) {
      searchQuery.staffid = Number(req.query.staffId);
    } else {
      const queryParameters = [
        'syllabus',
        'department',
        'year',
        'semester',
        'subjectCode',
        'topicName',
        'staffId',
      ];
      queryParameters.forEach((param) => {
        if (req.query[param] != '')
          searchQuery[param.toLowerCase()] = req.query[param];
      });
    }

    const topic = await this.prisma.topic.findMany({
      where: searchQuery,
    });

    if (!topic) {
      res.status(400).send({ message: 'No Topics found' });
      return;
    }

    res.status(200).send({ topic });
  };

  deleteTopicHandler = async (req: extendedRequest | any, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) {
      res.status(400).send({ message: 'Invalid id' });
      return;
    }

    const staff = req.user;
    if (!staff || !('id' in staff.user)) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }

    const topic = await this.prisma.topic.findUnique({
      where: {
        id: id,
      },
    });

    if (!topic) {
      res.status(400).send({ message: 'Topic not found' });
      return;
    }

    if (topic.staffid != staff.user.id) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }

    await this.prisma.topic.delete({
      where: {
        id: id,
      },
    });
  };
}
