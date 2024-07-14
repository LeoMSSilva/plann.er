import { type FormEvent, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { DestinationAndDateStep } from "../../Components";
import type { IParticipant } from "../../Interfaces";
import { formatPresentationDate, formatValidationEmail } from "../../utils";
import {
  Footer,
  Header,
  InviteGuestsAndConfirmTheTripStep,
  Layout,
} from "./Components";

export function TripCreation() {
  const [inputLocal, setInputLocal] = useState("");
  const [datePickerRange, setDatePickerRange] = useState<
    DateRange | undefined
  >();
  const presentationDate =
    (datePickerRange && formatPresentationDate(datePickerRange)) || "";
  const [isEditableLocalAndDate, setIsEditableLocalAndDate] = useState(true);

  const navigate = useNavigate();

  const [inputParticipantName, setInputParticipantName] = useState("");
  const [inputParticipantEmail, setInputParticipantEmail] = useState("");
  const [inputParticipants, setInputParticipants] = useState<IParticipant[]>(
    [],
  );

  const [inputInviterName, setInputInviterName] = useState("");
  const [inputInviterEmail, setInputInviterEmail] = useState("");

  function handleAddNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;

    if (!email || !name) {
      alert("Preencha todos os campos");
      return;
    }

    if (!formatValidationEmail(email)) return;

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

    if (!formatValidationEmail(email)) return;

    const id = 123;
    navigate(`/trips/${id}`);
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
            inputParticipantName={inputParticipantName}
            setInputParticipantName={setInputParticipantName}
            inputParticipantEmail={inputParticipantEmail}
            setInputParticipantEmail={setInputParticipantEmail}
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
