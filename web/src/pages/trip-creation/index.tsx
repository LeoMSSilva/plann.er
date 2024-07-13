import { format } from "date-fns";
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
import { type DateRange, DayPicker } from "react-day-picker";
import { useNavigate } from "react-router-dom";
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
import "react-day-picker/dist/style.css";

export function TripCreation() {
  const navigate = useNavigate();

  const [inputLocal, setInputLocal] = useState("");
  const [datePickerRange, setDatePickerRange] = useState<
    DateRange | undefined
  >();

  const [inputParticipantName, setInputParticipantName] = useState("");
  const [inputParticipantEmail, setInputParticipantEmail] = useState("");
  const [inputParticipants, setInputParticipants] = useState<IParticipant[]>(
    [],
  );

  const [inputInviterName, setInputInviterName] = useState("");
  const [inputInviterEmail, setInputInviterEmail] = useState("");

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const displayDate = datePickerRange && formatDisplayDate(datePickerRange);

  function formatDisplayDate({ from, to }: DateRange) {
    if (typeof from === "undefined") return "";

    if (typeof to === "undefined") {
      return format(from, "d' de 'LLL");
    }
    return format(from, "d' de 'LLL")
      .concat(" até ")
      .concat(format(to, "d' de 'LLL"));
  }

  function handleToggleIsDatePickerOpen(state: boolean) {
    setIsDatePickerOpen(state);
  }

  function handleToggleIsGuestsInputOpen(state: boolean) {
    setIsGuestsInputOpen(state);
  }

  function handleToggleGuestModalOpen(state: boolean) {
    setIsGuestModalOpen(state);
  }

  function handleToggleConfirmationModalOpen(state: boolean) {
    setIsConfirmationModalOpen(state);
  }

  function emailFormatValidation(email: string) {
    if (
      !email.match(
        /^[a-z][a-zA-Z0-9]*((_|\-|\.)[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/,
      )
    ) {
      alert("Formato de email inválido");
      return false;
    }
    return true;
  }

  function handleAddNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;

    if (!email || !name) {
      alert("Preencha todos os campos");
      return;
    }

    if (!emailFormatValidation(email)) return;

    if (
      inputParticipants.map((participant) => participant.email).includes(email)
    ) {
      alert("Este email ja foi adicionado");
      return;
    }

    const newParticipant: IParticipant = {
      id: String(inputParticipants.length + 1),
      name,
      email,
      is_confirmed: false,
    };

    setInputParticipants((participant) => [...participant, newParticipant]);
    setInputParticipantName("");
    setInputParticipantEmail("");
  }

  function handleRemoveEmailFromInvites(participantEmail: string) {
    setInputParticipants((participant) =>
      participant.filter(
        (participant) => participant.email !== participantEmail,
      ),
    );
  }

  function handleConfirmTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;

    if (!email || !name) {
      alert("Preencha todos os campos");
      return;
    }

    if (!emailFormatValidation(email)) return;

    setIsConfirmationModalOpen(false);
    setInputInviterName("");
    setInputInviterEmail("");

    const id = 123;
    navigate(`/trips/${id}`);
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

          <button
            disabled={isGuestsInputOpen}
            type="button"
            className="flex items-center gap-2 text-zinc-400"
            onClick={() => handleToggleIsDatePickerOpen(true)}
          >
            <Calendar className="size-5 text-zinc-400" />
            {displayDate ? (
              <div className="text-zinc-100">{displayDate}</div>
            ) : (
              "Quando?"
            )}
          </button>

          <SeparatorY />
          <Button
            disabled={!(inputLocal && displayDate)}
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

        {isDatePickerOpen && (
          <ModalContainer>
            <ModalHeaderContainer
              title="Selecione a data"
              handleToggle={handleToggleIsDatePickerOpen}
            >
              <DayPicker
                mode="range"
                selected={datePickerRange}
                onSelect={setDatePickerRange}
              />
            </ModalHeaderContainer>
          </ModalContainer>
        )}

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
                <span className="text-zinc-100 font-semibold">
                  {displayDate}
                </span>{" "}
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
