import { type FormEvent, useState } from "react";
import { SeparatorX } from "../../Components";
import type { IActivity, ILink, IParticipant } from "../../Interfaces";
import { formatValidationEmail, formatValidationURL } from "../../utils";
import {
  ActivityList,
  Header,
  ImportantLinksList,
  InviteToTravelList,
} from "./Components";

export function TripDetails() {
  const inputLocal = "Brasil";
  const inputDate = "hoje";
  const [inputActivities, setInputActivities] = useState<IActivity[]>([]);
  const [inputLinks, setInputLinks] = useState<ILink[]>([]);
  const [inputParticipants, setInputParticipants] = useState<IParticipant[]>(
    [],
  );

  function handleActivityModal(event: FormEvent<HTMLFormElement>): boolean {
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

    const newActivity: IActivity = {
      date: new Date().toString(),
      activities: [
        {
          id: String(inputActivities.length + 1),
          title,
          occurs_at,
        },
      ],
    };

    setInputActivities([...inputActivities, newActivity]);
    return true;
  }

  function handleCreateLinkModal(event: FormEvent<HTMLFormElement>): boolean {
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
      id: String(inputParticipants.length + 1),
      title,
      url,
    };

    setInputLinks([...inputLinks, newLink]);

    return true;
  }

  function handleInviteToTravelModal(
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

    setInputParticipants((participant) => [...participant, newParticipant]);

    return true;
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <Header
        date={inputDate}
        local={inputLocal}
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
            inputDate={inputDate}
            inputLocal={inputLocal}
            handleInviteToTravelModal={handleInviteToTravelModal}
          />
        </div>
      </main>
    </div>
  );
}
