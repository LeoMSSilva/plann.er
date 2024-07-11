import {
  ArrowRight,
  AtSign,
  Calendar,
  Mail,
  MapPin,
  Settings2,
  User,
  UserRoundPlus,
  X,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import {
  Button,
  Input,
  InputContainer,
  ModalContainer,
  ModalHeaderContainer,
  SeparatorY,
} from "../../Components";
import type { IParticipant } from "../../Interfaces";
import { Footer, Header, Layout } from "./Components";

const mockParticipant: IParticipant = {
  id: "1",
  name: "teste",
  email: "teste@teste.com",
  is_confirmed: false,
};
export function TripCreation() {
  const [inputLocal, setInputLocal] = useState("");
  const [inputDate, setInputDate] = useState("");

  const [inputParticipantName, setInputParticipantName] = useState("");
  const [inputParticipantEmail, setInputParticipantEmail] = useState("");
  const [inputParticipants, setInputParticipants] = useState<IParticipant[]>([
    mockParticipant,
  ]);

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  function handleToggleIsGuestsInputOpen(state: boolean) {
    setIsGuestsInputOpen(state);
  }

  function handleToggleGuestModalOpen(state: boolean) {
    setIsGuestModalOpen(state);
  }

  function handleToggleConfirmationModalOpen(state: boolean) {
    setIsConfirmationModalOpen(state);
  }

  function handleAddNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Adicionado com sucesso!");
  }

  function handleRemoveEmailFromInvites(participantId: string) {
    alert(`${participantId} removido com sucesso!`);
  }

  function handleConfirmTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Confirmado com sucesso!");
  }

  return (
    <Layout>
      <Header />
      <div className="space-y-4">
        <InputContainer>
          <Input
            disabled={isGuestsInputOpen}
            placeholder="Para onde você vai?"
            value={inputLocal}
            setValue={setInputLocal}
          >
            <MapPin className="size-5 text-zinc-400" />
          </Input>
          <Input
            disabled={isGuestsInputOpen}
            placeholder="Quando?"
            value={inputDate}
            setValue={setInputDate}
          >
            <Calendar className="size-5 text-zinc-400" />
          </Input>
          <SeparatorY />
          <Button
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

        {isGuestsInputOpen && (
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

            <Button
              disabled={inputParticipants.length === 0}
              type="button"
              onClick={() => handleToggleConfirmationModalOpen(true)}
            >
              Confirmar viagem
              <ArrowRight className="size-5" />
            </Button>
          </InputContainer>
        )}

        {isGuestModalOpen && (
          <ModalContainer>
            <ModalHeaderContainer
              title="Selecionar convidados"
              handleToggle={handleToggleGuestModalOpen}
            >
              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
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
                    onClick={() => handleRemoveEmailFromInvites(id)}
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
        )}

        {isConfirmationModalOpen && (
          <ModalContainer>
            <ModalHeaderContainer
              title="Confirmar criação da viagem"
              handleToggle={handleToggleConfirmationModalOpen}
            >
              <p className="text-sm text-zinc-400">
                Para concluir a criação da viagem para{" "}
                <span className="text-zinc-100 font-semibold">
                  {inputLocal}
                </span>{" "}
                nas datas de{" "}
                <span className="text-zinc-100 font-semibold">{inputDate}</span>{" "}
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
                  value={inputParticipantName}
                  setValue={setInputParticipantName}
                >
                  <User className="size-5 text-zinc-400" />
                </Input>
              </InputContainer>
              <InputContainer variant="secondary">
                <Input
                  placeholder="Seu e-mail pessoal"
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
                Criar viagem
              </Button>
            </form>
          </ModalContainer>
        )}
      </div>
      <Footer />
    </Layout>
  );
}
