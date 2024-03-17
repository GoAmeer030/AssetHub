import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { extendedRequest } from '../../types/extendedTypes';

export default class AuthManager {
  private prisma: PrismaClient;
  private SECRET_KEY: string;

  constructor() {
    if (!process.env.SECRET_KEY) {
      throw new Error('SECRET_KEY not found');
    }

    this.prisma = new PrismaClient();
    this.SECRET_KEY = process.env.SECRET_KEY;
  }

  verifyTokenHandler = (req: extendedRequest | any, res: Response) => {
    const user = req.user;

    if ('staffid' in user.user) {
      this.prisma.staff
        .findUnique({
          where: { staffid: user.user.staffid },
        })
        .then((staff) => {
          res.status(200).send(staff);
        })
        .catch((err) => {
          res.status(500).send({ error: 'Internal Server Error' });
        });
    } else if ('regNo' in user.user) {
      res.status(200).send({ regNo: user.user.regNo });
    } else {
      res.status(400).send({ error: 'Invalid user' });
    }
  };

  loginHandler = async (req: Request, res: Response) => {
    let user;
    if ('staffID' in req.body) {
      user = await this.prisma.staff.findUnique({
        where: { staffid: req.body.staffID.replace('/', '_') },
      });

      if (!user) {
        res.status(400).send({ error: 'User not found' });
        return;
      }

      if (user.password !== req.body.password) {
        res.status(400).send({ error: 'Invalid password' });
        return;
      }
    } else {
      user = { regNo: req.body.regNo };
    }
    const accessToken = jwt.sign({ user }, this.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).send({ accessToken: accessToken, user: user });
  };
}
