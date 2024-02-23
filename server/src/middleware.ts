import jwt from 'jsonwebtoken';

export function ErrorHandlerMiddleware(
  err: any,
  req: any,
  res: any,
  next: any,
) {
  if (err) {
    res.status(500).send();
    console.error(err);
  } else {
    next();
  }
}

export function CheckValidUser(req: any, res: any, next: any) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ error: 'Unauthorized BY middleware' });
  }

  const SECRET_KEY = process.env.SECRET_KEY;
  if (!SECRET_KEY) {
    console.error('SECRET_KEY not found');
    return res.status(500).send();
  }

  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ error: 'Unauthorized BY middleware' });
    }

    req.user = decoded;
    next();
  });
}
