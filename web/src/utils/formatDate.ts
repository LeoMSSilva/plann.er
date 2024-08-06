import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

export function formatPresentationDate({ from, to }: DateRange) {
  if (typeof from === "undefined") return "";

  if (typeof to === "undefined") {
    return format(from, "d' de 'LLL");
  }
  return format(from, "d' de 'LLL", {locale: ptBR})
    .concat(" até ")
    .concat(format(to, "d' de 'LLL", {locale: ptBR}));
}

export function formatPresentationDay(date: string) {
  return `Dia ${format(date, "d", {locale: ptBR})}`;
}

export function formatPresentationWeekDay(date: string) {
  return format(date, "EEEE", { locale: ptBR });
}

export function formatPresentationTime(date: string) {
  return `${format(date, "HH:mm")}h`;
}
