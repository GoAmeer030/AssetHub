import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

export default class AdminManager {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getStaffHandler = async (req: any, res: Response) => {
    let staff = await this.prisma.staff.findUnique({
      where: {
        id: parseInt(req.query.staffID),
      },
    });

    if (!staff) {
      res.status(404).send({ message: 'Staff not found' });
    } else {
      res.status(200).send(staff);
    }
  };
}
