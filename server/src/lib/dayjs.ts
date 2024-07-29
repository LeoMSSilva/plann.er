import dayjs from "dayjs";
import localizedFormated from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");
dayjs.extend(localizedFormated);

export function formattedDate(date: Date) {
  return dayjs(date).format("LL");
}

export { dayjs };
