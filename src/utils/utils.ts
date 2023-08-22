import {Bounty, RoleType} from 'src/sharedTypes';

export function formatTimeAgo(date: Date) {
  const ensuredDate = new Date(date);

  const currentDate = new Date();
  const timeDifference = Math.abs(
    currentDate.getTime() - ensuredDate.getTime(),
  );
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);
  const weeksDifference = Math.floor(daysDifference / 7);
  const monthsDifference = Math.floor(daysDifference / 30);

  if (monthsDifference >= 1) {
    if (monthsDifference === 1) {
      return '1 month ago';
    } else {
      return monthsDifference + ' months ago';
    }
  } else if (weeksDifference >= 1) {
    if (weeksDifference === 1) {
      return '1 week ago';
    } else {
      return weeksDifference + ' weeks ago';
    }
  } else if (daysDifference >= 1) {
    if (daysDifference === 1) {
      return '1 day ago';
    } else {
      return daysDifference + ' days ago';
    }
  } else if (hoursDifference >= 1) {
    if (hoursDifference === 1) {
      return '1 hour ago';
    } else {
      return hoursDifference + ' hours ago';
    }
  } else if (minutesDifference >= 1) {
    if (minutesDifference === 1) {
      return '1 minute ago';
    } else {
      return minutesDifference + ' minutes ago';
    }
  } else {
    return 'just now';
  }
}

export function didIApprove(bounty: Bounty, playingRole: RoleType) {
  if (!bounty?.id) {
    return;
  }
  let didIApprove = false;
  switch (playingRole) {
    case RoleType.Founder:
      didIApprove = bounty.approvedByFounder;
      break;
    case RoleType.BountyManager:
      didIApprove = bounty.approvedByManager;
      break;
    case RoleType.BountyValidator:
      didIApprove = bounty.approvedByValidator;
      break;
    default:
      didIApprove = false;
  }
  return didIApprove;
}

export default function addSpaceCase(str: string | undefined) {
  if (!str) return undefined;
  if (typeof str != 'string') return undefined;
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2') || '';
  return str;
}

export function fireDate(timestamp: any) {
  const jsTimestamp = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
  );
  return jsTimestamp;
}

// const firestoreTime = {
//   seconds: 1613748319,
//   nanoseconds: 47688698687,
// };

// const jsDate = fireDate(firestoreTime);
// const date = jsDate.toDateString();
// const atTime = jsDate.toLocaleTimeString();

// console.log(date, atTime);
