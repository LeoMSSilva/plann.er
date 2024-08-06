import { type FormEvent, useCallback, useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useParams } from "react-router-dom";
import { DestinationAndDateStep, SeparatorX } from "../../Components";
import type { IActivity, ILink, IParticipant } from "../../Interfaces";
import { api } from "../../lib/api";
import {
  formatPresentationDate,
  formatValidationEmail,
  formatValidationURL,
} from "../../utils";
import {
  ActivityList,
  ImportantLinksList,
  InviteToTravelList,
} from "./Components";

export function TripDetails() {
  const { tripId } = useParams();

  const [inputLocal, setInputLocal] = useState("");
  const [datePickerRange, setDatePickerRange] = useState<
    DateRange | undefined
  >();
  const [isEditableLocalAndDate, setIsEditableLocalAndDate] = useState(false);

  const [inputActivities, setInputActivities] = useState<IActivity[]>([]);
  const [inputLinks, setInputLinks] = useState<ILink[]>([]);
  const [inputParticipants, setInputParticipants] = useState<IParticipant[]>(
    [],
  );

  const presentationDate =
    (datePickerRange && formatPresentationDate(datePickerRange)) || "";

  async function handleContinue() {
    if (!inputLocal || !datePickerRange?.from) return;

    await api.put(`/trips/${tripId}`, {
      destination: inputLocal,
      starts_at: datePickerRange.from.toString(),
      ends_at: datePickerRange.to
        ? datePickerRange.to.toString()
        : datePickerRange.from.toString(),
    });
    requestActivities();
  }

  async function handleActivityModal(
    event: FormEvent<HTMLFormElement>,
  ): Promise<boolean> {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string;
    const occurs_at = data.get("occurs_at") as string;

    if (!occurs_at || !title) {
      alert("Preencha todos os campos");
      return false;
    }

    if (
      inputActivities.length > 0 &&
      inputActivities.some((activity) =>
        activity.activities.some(
          (activity) => activity.occurs_at === occurs_at,
        ),
      )
    ) {
      alert("Esta atividade já foi adicionada");
      return false;
    }

    // const newActivity: IActivity = {
    //   date: occurs_at,
    //   activities: [
    //     {
    //       id: String(inputActivities.length + 1),
    //       title,
    //       occurs_at,
    //     },
    //   ],
    // };

    // setInputActivities([...inputActivities, newActivity]);

    const response = await api.post(`trips/${tripId}/activities`, {
      title,
      occurs_at,
    });
    console.log(response);
    await requestActivities();
    return true;
  }

  async function handleCreateLinkModal(
    event: FormEvent<HTMLFormElement>,
  ): Promise<boolean> {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string;
    const url = data.get("url") as string;

    if (!url || !title) {
      alert("Preencha todos os campos");
      return false;
    }

    if (inputLinks.map((link) => link.url).includes(url)) {
      alert("Este link já foi adicionado");
      return false;
    }

    if (!formatValidationURL(url)) return false;

    const newLink: ILink = {
      title,
      url,
    };

    const {
      data: { linkId },
    } = await api.post(`trips/${tripId}/links`, newLink);

    newLink.id = linkId;

    setInputLinks([...inputLinks, newLink]);

    return true;
  }

  async function handleInviteToTravelModal(
    event: FormEvent<HTMLFormElement>,
  ): Promise<boolean> {
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
      name,
      email,
      is_confirmed: false,
    };

    const {
      data: { participantId },
    } = await api.post(`trips/${tripId}/invites`, newParticipant);

    newParticipant.id = participantId;

    setInputParticipants([...inputParticipants, newParticipant]);

    return true;
  }

  const requestLocalAndDate = useCallback(() => {
    api.get(`trips/${tripId}`).then((response) => {
      setInputLocal(response.data.trip.destination);
      setDatePickerRange({
        from: new Date(response.data.trip.starts_at),
        to: new Date(response.data.trip.ends_at),
      });
    });
  }, [tripId]);

  const requestActivities = useCallback(() => {
    api.get(`trips/${tripId}/activities`).then((response) => {
      console.log(response.data.activities);

      setInputActivities(response.data.activities);
    });
  }, [tripId]);

  const requestLinks = useCallback(() => {
    api.get(`trips/${tripId}/links`).then((response) => {
      setInputLinks(response.data.links);
    });
  }, [tripId]);

  const requestParticipants = useCallback(() => {
    api.get(`trips/${tripId}/participants`).then((response) => {
      setInputParticipants(response.data.participants);
    });
  }, [tripId]);

  useEffect(() => {
    requestLocalAndDate();
    requestActivities();
    requestLinks();
    requestParticipants();
  }, [
    requestLocalAndDate,
    requestActivities,
    requestLinks,
    requestParticipants,
  ]);

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateStep
        inputLocal={inputLocal}
        setInputLocal={setInputLocal}
        datePickerRange={datePickerRange}
        setDatePickerRange={setDatePickerRange}
        isEditableLocalAndDate={isEditableLocalAndDate}
        setIsEditableLocalAndDate={setIsEditableLocalAndDate}
        handleContinue={handleContinue}
      />
      <main className="flex gap-16 px-6">
        <ActivityList
          inputActivities={inputActivities}
          handleActivityModal={handleActivityModal}
        />

        <div className="w-80 space-y-6">
          <ImportantLinksList
            inputLinks={inputLinks}
            handleCreateLinkModal={handleCreateLinkModal}
          />

          <SeparatorX />

          <InviteToTravelList
            inputParticipants={inputParticipants}
            inputDate={presentationDate}
            inputLocal={inputLocal}
            handleInviteToTravelModal={handleInviteToTravelModal}
          />
        </div>
      </main>
    </div>
  );
}
