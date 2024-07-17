import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { type FormEvent, useState } from "react";
import { InviteToTravelModal } from ".";
import { Button } from "../../../Components";
import type { IParticipant } from "../../../Interfaces";

interface IInviteToTravelListProps {
  inputLocal: string;
  inputDate: string;
  inputParticipants: IParticipant[];
  handleInviteToTravelModal: (
    value: FormEvent<HTMLFormElement>,
  ) => Promise<boolean>;
}
export const InviteToTravelList = ({
  inputLocal,
  inputDate,
  inputParticipants,
  handleInviteToTravelModal,
}: IInviteToTravelListProps) => {
  const [isInviteToTravelModalOpen, setIsInviteToTravelModalOpen] =
    useState(false);

  function handleToggleInviteToTravelModal(state: boolean) {
    setIsInviteToTravelModalOpen(state);
  }

  return (
    <>
      <div className="space-y-6">
        <span className="text-xl font-semibold text-zinc-50">
          Confirmar participação
        </span>
        <div className="space-y-5">
          {inputParticipants.length > 0 ? (
            inputParticipants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <span className="block font-medium text-zinc-100">
                    {participant.name}
                  </span>
                  <a
                    href={participant.email}
                    className="block text-zinc-400 hover:text-zinc-200  truncate"
                  >
                    {participant.email}
                  </a>
                </div>
                {participant.is_confirmed ? (
                  <CircleCheck className="size-5 text-lime-300" />
                ) : (
                  <CircleDashed className="size-5 text-zinc-400" />
                )}
              </div>
            ))
          ) : (
            <>Nenhum participante cadastrado!</>
          )}
        </div>
        <Button
          size="full"
          variant="secondary"
          onClick={() => handleToggleInviteToTravelModal(true)}
        >
          <UserCog className="size-5" />
          Gerenciar convidados
        </Button>
      </div>

      {isInviteToTravelModalOpen && (
        <InviteToTravelModal
          handleToggleInviteToTravelModal={handleToggleInviteToTravelModal}
          inputDate={inputDate}
          inputLocal={inputLocal}
          handleInviteToTravelModal={handleInviteToTravelModal}
        />
      )}
    </>
  );
};
