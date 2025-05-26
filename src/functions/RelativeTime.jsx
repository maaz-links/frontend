
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { useTime } from "../context/TimeContext";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
export default function RelativeTime({ timestamp }) {
  const currentTime = useTime(); // Triggers re-render every minute

  const date = dayjs(timestamp);

  if (date.isToday()) {
    const diffMinutes = dayjs(currentTime).diff(date, 'minute');
    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;

    const diffHours = dayjs(currentTime).diff(date, 'hour');
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }

  if (date.isYesterday()) {
    return `Yesterday at ${date.format('h:mm A')}`;
  }

  return date.format('MMM D, YYYY [at] h:mm A');
};