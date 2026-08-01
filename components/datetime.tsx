import { CalendarIcon } from "lucide-react";
import { getFormatter } from "next-intl/server";

export default async function DateTime({ date }: { date: string }) {
  const format = await getFormatter();

  // `timeZone: "UTC"` matters: "2025-06-28" parses as UTC midnight, so
  // formatting it in any negative-offset zone renders the previous day.
  const formattedDate = format.dateTime(new Date(date), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
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
