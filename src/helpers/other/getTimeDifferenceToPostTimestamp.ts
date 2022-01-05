import DateDiff from 'date-diff';

export function getTimeDifferenceToPostTimestamp(timestamp: number) {

    const now = new Date();
    const timestampDate = new Date(timestamp);

    const timeDifference = new DateDiff(now, timestampDate);

    const years = Math.floor(timeDifference.years());
    if (years > 0) return `${years} year${(years > 1) ? 's' : ''}`;

    const months = Math.floor(timeDifference.months());
    if (months > 0) return `${months} month${(months > 1) ? 's' : ''}`;

    const weeks = Math.floor(timeDifference.weeks());
    if (weeks > 0) return `${weeks} week${(weeks > 1) ? 's' : ''}`;

    const days = Math.floor(timeDifference.days());
    if (days > 0) return `${days} day${(days > 1) ? 's' : ''}`;

    const hours = Math.floor(timeDifference.hours());
    if (hours > 0) return `${hours} hour${(hours > 1) ? 's' : ''}`;

    const minutes = Math.floor(timeDifference.minutes());
    return (minutes > 0) ? `${minutes} minute${(minutes > 1) ? 's' : ''}` : 'a few seconds';
}