import { AtSign, User, X } from "lucide-react";
import type { FormEvent } from "react";
import {
  Button,
  Input,
  InputContainer,
  ModalContainer,
  ModalHeaderContainer,
} from "../../../Components";
import type { IParticipant } from "../../../Interfaces";

interface ISelectGuestsModalProps {
  inputParticipants: IParticipant[];
  handleToggleGuestModalOpen: (value: boolean) => void;
  inputParticipantName: string;
  setInputParticipantName: (value: string) => void;
  inputParticipantEmail: string;
  setInputParticipantEmail: (value: string) => void;
  handleAddNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  handleRemoveEmailFromInvites: (value: string) => void;
}

export const SelectGuestsModal = ({
  inputParticipants,
  handleToggleGuestModalOpen,
  inputParticipantName,
  setInputParticipantName,
  inputParticipantEmail,
  setInputParticipantEmail,
  handleRemoveEmailFromInvites,
  handleAddNewEmailToInvite,
}: ISelectGuestsModalProps) => {
  return (
    <ModalContainer>
      <ModalHeaderContainer
        title="Selecionar convidados"
        handleToggle={handleToggleGuestModalOpen}
      >
        <p className="text-sm text-zinc-400">
          Os convidados irão receber e-mails para confirmar a participação na
          viagem.
        </p>
      </ModalHeaderContainer>

      <div className="flex flex-wrap gap-2">
        {inputParticipants.map(({ id, email }) => (
          <div
            key={id}
            className="py-1.5 px-2.5 flex items-center gap-2 rounded-md bg-zinc-800"
          >
            <span className="text-zinc-300">{email}</span>
            <button
              type="button"
              onClick={() => handleRemoveEmailFromInvites(email)}
            >
              <X className="size-4 text-zinc-400" />
            </button>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleAddNewEmailToInvite}
        className="space-y-4 w-full"
      >
        <InputContainer variant="secondary">
          <Input
            placeholder="Digite o nome do convidado"
            type="text"
            name="name"
            value={inputParticipantName}
            setValue={setInputParticipantName}
          >
            <User className="size-5 text-zinc-400" />
          </Input>
        </InputContainer>
        <InputContainer variant="secondary">
          <Input
            placeholder="Digite o e-mail do convidado"
            type="email"
            name="email"
            value={inputParticipantEmail}
            setValue={setInputParticipantEmail}
          >
            <AtSign className="size-5 text-zinc-400" />
          </Input>
        </InputContainer>
        <Button
          size="full"
          type="submit"
        >
          Convidar pessoa
        </Button>
      </form>
    </ModalContainer>
  );
};
