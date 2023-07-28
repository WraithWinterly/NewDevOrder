import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import {JsonDB, Config} from 'node-json-db';
import {bountiesSeed, bountiesSetup} from './bounties';
import {memberSeed, membersSetup} from './members';
import {teamsSeed, teamsSetup} from './teams';

export const db = new JsonDB(new Config('jsonDB', true, false, '/'));

dotenv.config();

export const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('New Dev Order Development Server is running');
});

// NOT needed for actual app, used for testing data
app.get('/seed', async (req: Request, res: Response) => {
  await bountiesSeed();
  await memberSeed();
  await teamsSeed();
  res.status(200).send();
});

app.get('/alive', (req: Request, res: Response) => {
  res.send('Alive!');
});

bountiesSetup();
membersSetup();
teamsSetup();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});