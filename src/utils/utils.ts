export function formatTimeAgo(date: Date) {
  const currentDate = new Date();
  const timeDifference = Math.abs(currentDate.getTime() - date.getTime());
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  if (hoursDifference === 0) {
    return 'Posted just now';
  } else if (hoursDifference === 1) {
    return 'Posted 1 hour ago';
  } else {
    return 'Posted ' + hoursDifference + ' hours ago';
  }
}

// Example usage:
const postDate = new Date('2023-07-15T08:30:00');
const formattedTime = formatTimeAgo(postDate);
console.log(formattedTime);
