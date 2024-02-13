import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";

import { tokenDecodeType } from "../../types/tokenDecodeType";

export default class AuthManager {
  private prisma: PrismaClient;
  private SECRET_KEY: string;

  constructor() {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY not found");
    }

    this.prisma = new PrismaClient();
    this.SECRET_KEY = process.env.SECRET_KEY;
  }

  authUser = (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    return new Promise<tokenDecodeType>((resolve, reject) => {
      jwt.verify(token, this.SECRET_KEY, (err, decoded: any) => {
        if (err) {
          res.status(401).send({ error: "Unauthorized" });
          return;
        }
        if (typeof decoded === "object" && decoded !== null) {
          if ("staffid" in decoded.user) {
            resolve(decoded as tokenDecodeType);
          } else if ("regNo" in decoded.user) {
            resolve(decoded as tokenDecodeType);
          } else {
            reject(0);
          }
        }
      });
    });
  };

  verifyTokenHandler = (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    this.authUser(req, res)
      ?.then((data) => {
        // console.log(data);
        if ("staffid" in data.user) {
          res.status(200).send({ staffID: data.user.id });
        } else if ("regNo" in data.user) {
          res.status(200).send({ regNo: data.user.regNo });
        } else {
          res.status(401).send({ error: "Unauthorized" });
        }
      })
      .catch((error) => {
        res.status(401).send({ error: "Unauthorized" });
      });
  };

  loginHandler = async (req: Request, res: Response) => {
    let user;
    if ("staffID" in req.body) {
      user = await this.prisma.staff.findUnique({
        where: { staffid: req.body.staffID },
      });

      if (!user) {
        res.status(400).send({ error: "User not found" });
        return;
      }

      if (user.password !== req.body.password) {
        res.status(400).send({ error: "Invalid password" });
        return;
      }
    } else {
      user = { regNo: req.body.regNo };
    }
    const accessToken = jwt.sign({ user }, this.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).send({ accessToken: accessToken, user: user });
  };
}
