import { Calendar, LoaderCircle, Tag } from "lucide-react";
import { type FormEvent, useState } from "react";
import {
  Button,
  Input,
  InputContainer,
  ModalContainer,
  ModalHeaderContainer,
} from "../../../Components";

interface IActivityModalProps {
  handleToggleCreateActivitiesModal: (value: boolean) => void;
  handleActivityModal: (value: FormEvent<HTMLFormElement>) => Promise<boolean>;
  isLoading: boolean;
}

export const ActivityModal = ({
  handleToggleCreateActivitiesModal,
  handleActivityModal,
  isLoading,
}: IActivityModalProps) => {
  const [inputActivityTitle, setInputActivityTitle] = useState("");
  const [inputActivityURL, setInputActivityURL] = useState("");

  function clearFields() {
    setInputActivityTitle("");
    setInputActivityURL("");
    handleToggleCreateActivitiesModal(false);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const isSuccess = await handleActivityModal(event);
    isSuccess && clearFields();
  }

  return (
    <ModalContainer>
      <ModalHeaderContainer
        title="Cadastrar atividade"
        handleToggle={handleToggleCreateActivitiesModal}
      >
        <p className="text-sm text-zinc-400">
          Todos convidados podem visualizar as atividades.
        </p>
      </ModalHeaderContainer>
      <form
        onSubmit={onSubmit}
        className="space-y-4 w-full"
      >
        <InputContainer variant="secondary">
          <Input
            placeholder="Qual a atividade?"
            type="text"
            name="title"
            value={inputActivityTitle}
            setValue={setInputActivityTitle}
          >
            <Tag className="size-5 text-zinc-400" />
          </Input>
        </InputContainer>
        <InputContainer variant="secondary">
          <Input
            placeholder="Data e horário da atividade"
            type="datetime-local"
            name="occurs_at"
            value={inputActivityURL}
            setValue={setInputActivityURL}
          >
            <Calendar className="size-5 text-zinc-400" />
          </Input>
        </InputContainer>
        <Button
          size="full"
          type="submit"
          disabled={isLoading}
        >
          Salvar atividade
          {isLoading && <LoaderCircle className="size-5 animate-spin" />}
        </Button>
      </form>
    </ModalContainer>
  );
};
