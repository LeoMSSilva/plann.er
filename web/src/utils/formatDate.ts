import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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

export function formatPresentationDay(date: string) {
  return `Dia ${format(date, "d")}`;
}

export function formatPresentationWeekDay(date: string) {
  return format(date, "EEEE", { locale: ptBR });
}

export function formatPresentationTime(date: string) {
  return `${format(date, "HH:mm")}h`;
}
