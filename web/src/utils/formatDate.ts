import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

export function formatPresentationDate({ from, to }: DateRange) {
  if (typeof from === "undefined") return "";

  if (typeof to === "undefined") {
    return format(from, "d' de 'LLL");
  }
  return format(from, "d' de 'LLL")
    .concat(" até ")
    .concat(format(to, "d' de 'LLL"));
}
