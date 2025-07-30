import { CalendarIcon } from "lucide-react";

export default function DateTime({ date }: { date: string }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <time
      className="text-slate-500 inline-flex items-center gap-1 text-xs"
      dateTime={date}
    >
      <CalendarIcon size={12} />
      {formattedDate}
    </time>
  );
}
