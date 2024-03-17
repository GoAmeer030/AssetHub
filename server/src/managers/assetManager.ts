import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

import { extendedRequest } from '../../types/extendedTypes';

export default class AssetManager {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  addAssetHandler = async (req: extendedRequest | any, res: Response) => {
    const staff = req.user;

    if (!staff || !('id' in staff.user)) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
    let topic = await this.prisma.topic.findUnique({
      where: {
        id: Number(req.body.topicId),
      },
    });

    if (!topic) {
      res.status(400).send({ error: 'Topic not found' });
      return;
    }

    if (topic.staffid != staff.user.id) {
      res.status(402).send({ error: 'Staff ID mismatch' });
      return;
    }

    await this.prisma.asset.create({
      data: {
        topicid: Number(req.body.topicId),
        assetname: req.body.assetName,
        assettype: req.body.assetType,
        asseturl: req.body.assetUrl ? req.body.assetUrl : req.files[0].path,
      },
    });

    res.status(200).send();
  };

  getAssetHandler = async (req: extendedRequest | any, res: Response) => {
    const user = req.user;

    if (!user) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }

    let searchQuery: any = {};

    if ('topicId' in req.query) {
      searchQuery.topicid = Number(req.query.topicId);
    } else {
      const queryParameters = ['assetName', 'assetType', 'topicId'];
      queryParameters.forEach((param) => {
        if (req.query[param] != '')
          searchQuery[param.toLowerCase()] = req.query[param];
      });
    }

    const asset = await this.prisma.asset.findMany({
      where: searchQuery,
    });

    if (!asset) {
      res.status(400).send({ error: 'No Assets found' });
      return;
    }

    res.status(200).send({ asset });
  };

  deleteAssetHandler = async (req: extendedRequest | any, res: Response) => {
    console.log(req.params);
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) {
      res.status(400).send({ error: 'Invalid id' });
      return;
    }

    const staff = req.user;
    if (!staff || !('id' in staff.user)) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }

    const asset = await this.prisma.asset.findUnique({
      where: {
        id: id,
      },
    });

    if (!asset) {
      res.status(400).send({ error: 'Asset not found' });
      return;
    }

    const topic = await this.prisma.topic.findUnique({
      where: {
        id: asset.topicid,
      },
    });

    if (!topic) {
      res.status(400).send({ error: 'Topic not found' });
      return;
    }

    if (topic.staffid != staff.user.id) {
      res.status(402).send({ error: 'Staff ID mismatch' });
      return;
    }

    await this.prisma.asset.delete({
      where: {
        id: id,
      },
    });

    const assetPath = asset.asseturl;

    if (assetPath.includes('public/data')) {
      const fs = require('fs');
      fs.unlinkSync(assetPath);
    }

    res.status(200).send();
  };
}
