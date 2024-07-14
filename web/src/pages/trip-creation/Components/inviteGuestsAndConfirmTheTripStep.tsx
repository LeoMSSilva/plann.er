import { ArrowRight, UserRoundPlus } from "lucide-react";
import { type FormEvent, useState } from "react";
import { ConfirmationButtonModal, SelectGuestsModal } from ".";
import { Button, InputContainer } from "../../../Components";
import type { IParticipant } from "../../../Interfaces";

interface IInviteGuestsAndConfirmTheTripStepProps {
  displayDate: string;
  inputLocal: string;
  inputParticipants: IParticipant[];
  inputParticipantName: string;
  setInputParticipantName: (value: string) => void;
  inputParticipantEmail: string;
  setInputParticipantEmail: (value: string) => void;
  handleAddNewEmailToInvite: (value: FormEvent<HTMLFormElement>) => void;
  handleRemoveEmailFromInvites: (value: string) => void;
  inputInviterName: string;
  setInputInviterName: (value: string) => void;
  inputInviterEmail: string;
  setInputInviterEmail: (value: string) => void;
  handleConfirmTrip: (value: FormEvent<HTMLFormElement>) => void;
}

export function InviteGuestsAndConfirmTheTripStep({
  displayDate,
  inputLocal,
  inputParticipants,
  inputParticipantName,
  setInputParticipantName,
  inputParticipantEmail,
  setInputParticipantEmail,
  handleAddNewEmailToInvite,
  handleRemoveEmailFromInvites,
  inputInviterName,
  setInputInviterName,
  inputInviterEmail,
  setInputInviterEmail,
  handleConfirmTrip,
}: IInviteGuestsAndConfirmTheTripStepProps) {
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  function handleToggleGuestModalOpen(state: boolean) {
    setIsGuestModalOpen(state);
  }

  function handleToggleConfirmationModalOpen(state: boolean) {
    setIsConfirmationModalOpen(state);
  }

  return (
    <InputContainer>
      <div className="flex flex-1">
        <button
          type="button"
          className="flex items-center gap-2 text-zinc-400"
          onClick={() => handleToggleGuestModalOpen(true)}
        >
          <UserRoundPlus className="size-5" />
          {inputParticipants.length ? (
            <div className="text-zinc-100">
              {inputParticipants.length} pessoa(s) convidada(s)
            </div>
          ) : (
            "Quem estará na viagem?"
          )}
        </button>
      </div>

      {isGuestModalOpen && (
        <SelectGuestsModal
          inputParticipants={inputParticipants}
          handleToggleGuestModalOpen={handleToggleGuestModalOpen}
          inputParticipantName={inputParticipantName}
          setInputParticipantName={setInputParticipantName}
          inputParticipantEmail={inputParticipantEmail}
          setInputParticipantEmail={setInputParticipantEmail}
          handleAddNewEmailToInvite={handleAddNewEmailToInvite}
          handleRemoveEmailFromInvites={handleRemoveEmailFromInvites}
        />
      )}

      <Button
        disabled={inputParticipants.length === 0}
        type="button"
        onClick={() => handleToggleConfirmationModalOpen(true)}
      >
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>

      {isConfirmationModalOpen && (
        <ConfirmationButtonModal
          displayDate={displayDate}
          inputLocal={inputLocal}
          handleToggleConfirmationModalOpen={handleToggleConfirmationModalOpen}
          inputInviterEmail={inputInviterEmail}
          setInputInviterEmail={setInputInviterEmail}
          inputInviterName={inputInviterName}
          setInputInviterName={setInputInviterName}
          handleConfirmTrip={handleConfirmTrip}
        />
      )}
    </InputContainer>
  );
}
