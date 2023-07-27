export function formatTimeAgo(date: Date) {
  const currentDate = new Date();
  const timeDifference = Math.abs(currentDate.getTime() - date.getTime());
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
