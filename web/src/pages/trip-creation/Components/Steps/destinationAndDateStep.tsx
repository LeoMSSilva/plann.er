import { ArrowRight, MapPin, Settings2 } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { DatePickerModal } from "..";
import {
  Button,
  Input,
  InputContainer,
  SeparatorY,
} from "../../../../Components";

interface IDestinationAndDateStepProps {
  datePickerRange: DateRange | undefined;
  setDatePickerRange: (value: DateRange | undefined) => void;
  inputLocal: string;
  setInputLocal: (value: string) => void;
  isGuestsInputOpen: boolean;
  setIsGuestsInputOpen: (value: boolean) => void;
}
export function DestinationAndDateStep({
  datePickerRange,
  setDatePickerRange,
  inputLocal,
  setInputLocal,
  isGuestsInputOpen,
  setIsGuestsInputOpen,
}: IDestinationAndDateStepProps) {
  function handleToggleIsGuestsInputOpen(state: boolean) {
    setIsGuestsInputOpen(state);
  }

  return (
    <InputContainer>
      <Input
        disabled={isGuestsInputOpen}
        placeholder="Para onde você vai?"
        value={inputLocal}
        setValue={setInputLocal}
      >
        <MapPin className="size-5 text-zinc-400" />
      </Input>

      <DatePickerModal
        datePickerRange={datePickerRange}
        setDatePickerRange={setDatePickerRange}
        isGuestsInputOpen={isGuestsInputOpen}
      />

      <SeparatorY />

      <Button
        disabled={!(inputLocal && datePickerRange)}
        type="button"
        variant={isGuestsInputOpen ? "secondary" : "primary"}
        onClick={() => handleToggleIsGuestsInputOpen(!isGuestsInputOpen)}
      >
        {isGuestsInputOpen ? (
          <>
            Alterar local/data
            <Settings2 className="size-5" />
          </>
        ) : (
          <>
            Continuar
            <ArrowRight className="size-5" />
          </>
        )}
      </Button>
    </InputContainer>
  );
}
