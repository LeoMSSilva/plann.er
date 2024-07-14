import { ptBR } from "date-fns/locale";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { type DateRange, DayPicker } from "react-day-picker";
import { ModalContainer, ModalHeaderContainer } from "../../../Components";
import { formatPresentationDate } from "../../../utils";
import "react-day-picker/dist/style.css";

interface IDatePickerModalProps {
  datePickerRange: DateRange | undefined;
  setDatePickerRange: (value: DateRange | undefined) => void;
  isDisabled: boolean;
}
export const DatePickerModal = ({
  datePickerRange,
  setDatePickerRange,
  isDisabled,
}: IDatePickerModalProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function handleToggleIsDatePickerOpen(state: boolean) {
    setIsDatePickerOpen(state);
  }

  return (
    <>
      <button
        disabled={isDisabled}
        type="button"
        className="flex items-center gap-2 text-zinc-400"
        onClick={() => handleToggleIsDatePickerOpen(true)}
      >
        <Calendar className="size-5 text-zinc-400" />
        {datePickerRange ? (
          <div className="text-zinc-100">
            {datePickerRange && formatPresentationDate(datePickerRange)}
          </div>
        ) : (
          "Quando?"
        )}
      </button>

      {isDatePickerOpen && (
        <ModalContainer size="fit">
          <ModalHeaderContainer
            title="Selecione a data"
            handleToggle={handleToggleIsDatePickerOpen}
          >
            <DayPicker
              locale={ptBR}
              mode="range"
              selected={datePickerRange}
              onSelect={setDatePickerRange}
            />
          </ModalHeaderContainer>
        </ModalContainer>
      )}
    </>
  );
};
