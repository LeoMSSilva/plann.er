import { Link2, Tag } from "lucide-react";
import { type FormEvent, useState } from "react";
import {
  Button,
  Input,
  InputContainer,
  ModalContainer,
  ModalHeaderContainer,
} from "../../../Components";

interface IImportantLinksModalProps {
  handleToggleCreateLinksModal: (value: boolean) => void;
  handleCreateLinkModal: (
    value: FormEvent<HTMLFormElement>,
  ) => Promise<boolean>;
}

export const ImportantLinksModal = ({
  handleToggleCreateLinksModal,
  handleCreateLinkModal,
}: IImportantLinksModalProps) => {
  const [inputLinkTitle, setInputLinkTitle] = useState("");
  const [inputLinkOccursAt, setInputLinkOccursAt] = useState("");

  function clearFields() {
    setInputLinkTitle("");
    setInputLinkOccursAt("");
    handleToggleCreateLinksModal(false);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const isSuccess = await handleCreateLinkModal(event);
    isSuccess && clearFields();
  }

  return (
    <ModalContainer>
      <ModalHeaderContainer
        title="Cadastrar link"
        handleToggle={handleToggleCreateLinksModal}
      >
        <p className="text-sm text-zinc-400">
          Todos convidados podem visualizar os links importantes.{" "}
        </p>
      </ModalHeaderContainer>
      <form
        onSubmit={onSubmit}
        className="space-y-4 w-full"
      >
        <InputContainer variant="secondary">
          <Input
            placeholder="Título do link"
            type="text"
            name="title"
            value={inputLinkTitle}
            setValue={setInputLinkTitle}
          >
            <Tag className="size-5 text-zinc-400" />
          </Input>
        </InputContainer>
        <InputContainer variant="secondary">
          <Input
            placeholder="URL"
            type="text"
            name="url"
            value={inputLinkOccursAt}
            setValue={setInputLinkOccursAt}
          >
            <Link2 className="size-5 text-zinc-400" />
          </Input>
        </InputContainer>
        <Button
          size="full"
          type="submit"
        >
          Salvar link
        </Button>
      </form>
    </ModalContainer>
  );
};
