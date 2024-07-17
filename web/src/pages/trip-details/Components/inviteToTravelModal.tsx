import { Mail, User } from "lucide-react";
import { type FormEvent, useState } from "react";
import {
  Button,
  Input,
  InputContainer,
  ModalContainer,
  ModalHeaderContainer,
} from "../../../Components";

interface IInviteToTravelModalProps {
  inputLocal: string;
  inputDate: string;
  handleToggleInviteToTravelModal: (value: boolean) => void;
  handleInviteToTravelModal: (
    value: FormEvent<HTMLFormElement>,
  ) => Promise<boolean>;
}

export const InviteToTravelModal = ({
  inputLocal,
  inputDate,
  handleToggleInviteToTravelModal,
  handleInviteToTravelModal,
}: IInviteToTravelModalProps) => {
  const [inputParticipantName, setInputParticipantName] = useState("");
  const [inputParticipantEmail, setInputParticipantEmail] = useState("");

  function clearFields() {
    setInputParticipantName("");
    setInputParticipantEmail("");
    handleToggleInviteToTravelModal(false);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const isSuccess = await handleInviteToTravelModal(event);
    isSuccess && clearFields();
  }

  return (
    <ModalContainer>
      <ModalHeaderContainer
        title="Confirmar participação"
        handleToggle={handleToggleInviteToTravelModal}
      >
        <p className="text-sm text-zinc-400">
          Você foi convidado(a) para participar de uma viagem para{" "}
          <span className="text-zinc-100 font-semibold">{inputLocal}</span> nas
          datas de{" "}
          <span className="text-zinc-100 font-semibold">{inputDate}</span>.
        </p>

        <p className="text-sm text-zinc-400">
          Para confirmar sua presença na viagem, preencha os dados abaixo:
        </p>
      </ModalHeaderContainer>
      <form
        onSubmit={onSubmit}
        className="space-y-4 w-full"
      >
        <InputContainer variant="secondary">
          <Input
            placeholder="Seu nome completo"
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
            placeholder="Seu e-mail"
            type="email"
            name="email"
            value={inputParticipantEmail}
            setValue={setInputParticipantEmail}
          >
            <Mail className="size-5 text-zinc-400" />
          </Input>
        </InputContainer>
        <Button
          size="full"
          type="submit"
        >
          Confirmar minha presença
        </Button>
      </form>
    </ModalContainer>
  );
};
