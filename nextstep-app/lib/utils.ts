export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const capitalize = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const containsIgnoreCase = (str: string, query: string) => {
  return str.toLowerCase().includes(query.toLowerCase());
};

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const i in intervals) {
    const interval = Math.floor(seconds / intervals[i]);
    if (interval >= 1) {
      return `${interval} ${i}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}
