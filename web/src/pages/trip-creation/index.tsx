import { type FormEvent, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { DestinationAndDateStep } from "../../Components";
import type { IParticipant } from "../../Interfaces";
import { api } from "../../lib/api";
import { formatPresentationDate, formatValidationEmail } from "../../utils";
import {
  Footer,
  Header,
  InviteGuestsAndConfirmTheTripStep,
  Layout,
} from "./Components";

export function TripCreation() {
  const navigate = useNavigate();
  const [isEditableLocalAndDate, setIsEditableLocalAndDate] = useState(true);
  const [inputLocal, setInputLocal] = useState("");
  const [datePickerRange, setDatePickerRange] = useState<
    DateRange | undefined
  >();
  const [inputParticipants, setInputParticipants] = useState<IParticipant[]>(
    [],
  );
  const [inputInviterName, setInputInviterName] = useState("");
  const [inputInviterEmail, setInputInviterEmail] = useState("");

  const presentationDate =
    (datePickerRange && formatPresentationDate(datePickerRange)) || "";

  function handleAddNewEmailToInvite(
    event: FormEvent<HTMLFormElement>,
  ): boolean {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;

    if (!email || !name) {
      alert("Preencha todos os campos");
      return false;
    }

    if (!formatValidationEmail(email)) return false;

    if (
      inputParticipants.map((participant) => participant.email).includes(email)
    ) {
      alert("Este email ja foi adicionado");
      return false;
    }

    const newParticipant: IParticipant = {
      id: String(inputParticipants.length + 1),
      name,
      email,
      is_confirmed: false,
    };

    setInputParticipants([...inputParticipants, newParticipant]);
    return true;
  }

  function handleRemoveEmailFromInvites(participantEmail: string) {
    setInputParticipants((participant) =>
      participant.filter(
        (participant) => participant.email !== participantEmail,
      ),
    );
  }

  async function handleConfirmTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;

    if (!email || !name) {
      alert("Preencha todos os campos");
      return;
    }

    if (!formatValidationEmail(email)) return;

    if (inputParticipants.map((p) => p.email).includes(email)) {
      alert("Seu e-mail não pode ser o mesmo dos convidados");
    }

    if (
      !inputLocal ||
      !datePickerRange?.from ||
      !inputParticipants ||
      !inputInviterEmail ||
      !inputInviterName
    ) {
      return;
    }

    const trip = {
      destination: inputLocal,
      participants: inputParticipants.map((participant) => ({
        name: participant.name,
        email: participant.email,
      })),
      starts_at: datePickerRange.from.toString(),
      ends_at: datePickerRange.to
        ? datePickerRange.to.toString()
        : datePickerRange.from.toString(),
      owner_name: inputInviterName,
      owner_email: inputInviterEmail,
    };

    const {
      data: { tripId },
    } = await api.post("/trips", trip);

    navigate(`/trips/${tripId}`);
  }

  return (
    <Layout>
      <Header />
      <div className="space-y-4">
        <DestinationAndDateStep
          datePickerRange={datePickerRange}
          setDatePickerRange={setDatePickerRange}
          inputLocal={inputLocal}
          setInputLocal={setInputLocal}
          isEditableLocalAndDate={isEditableLocalAndDate}
          setIsEditableLocalAndDate={setIsEditableLocalAndDate}
        />

        {!isEditableLocalAndDate && (
          <InviteGuestsAndConfirmTheTripStep
            displayDate={presentationDate}
            inputLocal={inputLocal}
            inputParticipants={inputParticipants}
            handleAddNewEmailToInvite={handleAddNewEmailToInvite}
            handleRemoveEmailFromInvites={handleRemoveEmailFromInvites}
            inputInviterName={inputInviterName}
            setInputInviterName={setInputInviterName}
            inputInviterEmail={inputInviterEmail}
            setInputInviterEmail={setInputInviterEmail}
            handleConfirmTrip={handleConfirmTrip}
          />
        )}
      </div>
      <Footer />
    </Layout>
  );
}
