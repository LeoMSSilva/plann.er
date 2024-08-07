import { LoaderCircle, Mail, User } from "lucide-react";
import type { FormEvent } from "react";
import {
  Button,
  Input,
  InputContainer,
  ModalContainer,
  ModalHeaderContainer,
} from "../../../Components";

interface IConfirmationButtonModalProps {
  inputLocal: string;
  displayDate: string;
  handleToggleConfirmationModalOpen: (value: boolean) => void;
  inputInviterName: string;
  setInputInviterName: (value: string) => void;
  inputInviterEmail: string;
  setInputInviterEmail: (value: string) => void;
  handleConfirmTrip: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}
export const ConfirmationButtonModal = ({
  inputLocal,
  displayDate,
  handleToggleConfirmationModalOpen,
  inputInviterName,
  setInputInviterName,
  inputInviterEmail,
  setInputInviterEmail,
  handleConfirmTrip,
  isLoading,
}: IConfirmationButtonModalProps) => {
  return (
    <ModalContainer>
      <ModalHeaderContainer
        title="Confirmar criação da viagem"
        handleToggle={handleToggleConfirmationModalOpen}
      >
        <p className="text-sm text-zinc-400">
          Para concluir a criação da viagem para{" "}
          <span className="text-zinc-100 font-semibold">{inputLocal}</span> nas
          datas de{" "}
          <span className="text-zinc-100 font-semibold">{displayDate}</span>{" "}
          preencha seus dados abaixo:
        </p>
      </ModalHeaderContainer>
      <form
        onSubmit={handleConfirmTrip}
        className="space-y-4 w-full"
      >
        <InputContainer variant="secondary">
          <Input
            placeholder="Seu nome completo"
            type="text"
            name="name"
            value={inputInviterName}
            setValue={setInputInviterName}
          >
            <User className="size-5 text-zinc-400" />
          </Input>
        </InputContainer>
        <InputContainer variant="secondary">
          <Input
            placeholder="Seu e-mail pessoal"
            type="email"
            name="email"
            value={inputInviterEmail}
            setValue={setInputInviterEmail}
          >
            <Mail className="size-5 text-zinc-400" />
          </Input>
        </InputContainer>
        <Button
          disabled={isLoading}
          size="full"
          type="submit"
        >
          Criar viagem
          {isLoading && <LoaderCircle className="size-5 animate-spin" />}
        </Button>
      </form>
    </ModalContainer>
  );
};
