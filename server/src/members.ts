import {app, db} from '.';

import {RoleDict, type Member} from '../../src/stores/membersStore';

import * as Types from '../../sharedTypes';
import {Request, Response} from 'express';
import {GetRole} from '../../src/stores/membersStore';

export const SAMPLE_MEMBERS: Array<Member> = [
  {
    id: '24418568-1852-4719-917E-84E17133B56A',
    firstName: 'Aydens',
    tag: '@aydens1234',
    bio: 'lorem20',
    level: '1',
    roles: [GetRole('Bounty Hunter')],
    playingRole: RoleDict[0],
    bountiesWon: 0,
    teamsJoined: [],
    membersInvited: 0,
    completedWelcome: false,
  },
  {
    id: '7A5E0B7D-B202-494F-BB66-174FBE55FDD3',
    firstName: 'Rocky',
    tag: '@rocky',
    bio: 'lorem20',
    level: '2',
    roles: [GetRole('Bounty Hunter'), GetRole('Bounty Validator')],
    playingRole: RoleDict[1],
    bountiesWon: 24,
    teamsJoined: ['1', '2', '3'],
    membersInvited: 12,
    completedWelcome: true,
  },
  {
    id: 'AB65B816-66A5-4322-A950-453F62C9E86E',
    firstName: 'Comp1',
    tag: '@comp1',
    bio: 'lorem20',
    level: '3',
    roles: [GetRole('Bounty Hunter'), GetRole('Bounty Hunter')],
    playingRole: RoleDict[2],
    bountiesWon: 21,
    teamsJoined: [],
    membersInvited: 92,
    completedWelcome: true,
  },
  {
    id: 'F16849F2-8078-4CA0-8A90-2FE84A36E3F1',
    firstName: 'Comp2',
    tag: '@comp2',
    bio: 'lorem20',
    level: '4',
    roles: [GetRole('Bounty Hunter'), GetRole('Bounty Designer')],
    playingRole: RoleDict[3],
    bountiesWon: 20,
    teamsJoined: [],
    membersInvited: 21,
    completedWelcome: true,
  },
  {
    id: '0F773A3A-AB12-4E01-80E8-B891497A46E1',
    firstName: 'Comp3',
    tag: '@comp4',
    bio: 'lorem20',
    level: '40',
    roles: [GetRole('Bounty Hunter'), GetRole('Bounty Hunter')],
    playingRole: RoleDict[2],
    bountiesWon: 20,
    teamsJoined: [],
    membersInvited: 21,
    completedWelcome: true,
  },
];

export async function memberSeed() {
  await db.push('/members', SAMPLE_MEMBERS, true);
}

export function membersSetup() {
  app.get('/getMember:id', async (req: Request, res: Response) => {
    const currMembers = (await db.getObjectDefault('/members'), undefined) as
      | Member[]
      | undefined;

    const member = currMembers?.find(member => member.id == req.params.id);
    if (!member) {
      res.status(404).send('Member not found');
    }
    res.send(member);
  });

  app.post('/create-profile', async (req: Request, res: Response) => {
    const m = req.body as Types.CreateProfile;

    const localErrors: string[] = [];
    if (!m.username || m.username.trim().length < 3) {
      localErrors.push('Username must be at least 3 characters long');
    }
    if (!m.firstName || m.firstName.trim().length < 2) {
      localErrors.push('First Name must be at least 2 characters long');
    }
    if (!m.lastName || m.lastName.trim().length < 2) {
      localErrors.push('Last Name must be at least 2 characters long');
    }
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (
      !m.email ||
      m.email.trim().length < 2 ||
      !emailReg.test(m.email.trim())
    ) {
      localErrors.push('Email is required and must be valid');
    }
    if (localErrors.length > 0) {
      res.status(400).send(localErrors);
    }
    const newMember: Member = {
      username: m.username,
      firstName: m.firstName,
      lastName: m.lastName,
      email: m.email,
      bio: '',
      bountiesWon: 0,
      completedWelcome: true,
      id: '',
      level: '',
      membersInvited: 0,
      playingRole: RoleDict[0],
      roles: [],
      tag: '',
      teamsJoined: [],
    };

    const currMembers = (await db.getObjectDefault('/members'), undefined) as
      | Member[]
      | undefined;

    if (currMembers?.find(mem => mem?.walletAddress === m.walletAddress)) {
      res.status(400).send('Member already exists');
    }
    db.push('/members', newMember);

    res.status(200).send();
    res.send().status(200);
    console.log();
  });
}
