import { ArrowRight, LoaderCircle, MapPin, Settings2 } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button, Input, InputContainer, SeparatorY } from ".";
import { DatePickerModal } from "../pages/trip-creation/Components";

interface IDestinationAndDateStepProps {
  datePickerRange: DateRange | undefined;
  setDatePickerRange: (value: DateRange | undefined) => void;
  inputLocal: string;
  setInputLocal: (value: string) => void;
  isEditableLocalAndDate: boolean;
  setIsEditableLocalAndDate: (value: boolean) => void;
  handleContinue?: () => void;
  isLoading?: boolean;
}
export function DestinationAndDateStep({
  datePickerRange,
  setDatePickerRange,
  inputLocal,
  setInputLocal,
  isEditableLocalAndDate,
  setIsEditableLocalAndDate,
  handleContinue,
  isLoading,
}: IDestinationAndDateStepProps) {
  function handleToggleIsEditableLocalAndDate(state: boolean) {
    setIsEditableLocalAndDate(state);
    if (isEditableLocalAndDate && handleContinue) {
      handleContinue();
    }
  }

  return (
    <InputContainer>
      <Input
        disabled={!isEditableLocalAndDate}
        placeholder="Para onde você vai?"
        value={inputLocal}
        setValue={setInputLocal}
      >
        <MapPin className="size-5 text-zinc-400" />
      </Input>

      <DatePickerModal
        datePickerRange={datePickerRange}
        setDatePickerRange={setDatePickerRange}
        isDisabled={!isEditableLocalAndDate}
      />

      <SeparatorY />

      <Button
        disabled={!(inputLocal && datePickerRange) || isLoading}
        type="button"
        variant={
          !isEditableLocalAndDate && !isLoading ? "secondary" : "primary"
        }
        onClick={() =>
          handleToggleIsEditableLocalAndDate(!isEditableLocalAndDate)
        }
      >
        {!isEditableLocalAndDate && !isLoading ? (
          <>
            Alterar local/data
            <Settings2 className="size-5" />
          </>
        ) : (
          <>
            Continuar
            {isLoading ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <ArrowRight className="size-5" />
            )}
          </>
        )}
      </Button>
    </InputContainer>
  );
}
