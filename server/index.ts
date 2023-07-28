import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('New Dev Order Development Server is running');
});

app.get('/alive', (req: Request, res: Response) => {
  res.send('Alive!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
