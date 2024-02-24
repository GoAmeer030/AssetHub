import { PrismaClient } from '@prisma/client';

import { Response } from 'express';

import { extendedRequest } from '../../types/extendedTypes';

export default class AdminManager {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  addStaffHandler = async (req: extendedRequest | any, res: Response) => {
    await this.prisma.staff.create({
      data: {
        staffid: req.body.staffID,
        password: req.body.password,
        staffname: req.body.staffName,
        designation: req.body.designation,
        photourl: req.file?.path || '',
      },
    });

    res.status(200).send();
  };
}
