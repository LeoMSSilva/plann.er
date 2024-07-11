import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  CircleCheck,
  CircleDashed,
  Link2,
  Mail,
  Plus,
  Tag,
  User,
  UserCog,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import {
  Button,
  Input,
  InputContainer,
  ModalContainer,
  ModalHeaderContainer,
  SeparatorX,
} from "../../Components";
import type { IActivity, ILink, IParticipant } from "../../Interfaces";
import { Header } from "./Components";

export function TripDetails() {
  const inputLocal = "Brasil";
  const inputDate = "hoje";

  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
  const [isInviteToTravelModalOpen, setIsInviteToTravelModalOpen] =
    useState(false);

  const [inputActivityTitle, setInputActivityTitle] = useState("");
  const [inputActivityURL, setInputActivityURL] = useState("");
  const [inputActivities, setInputActivities] = useState<IActivity[]>([]);

  const [inputLinkTitle, setInputLinkTitle] = useState("");
  const [inputLinkOccursAt, setInputLinkOccursAt] = useState("");
  const [inputLinks, setInputLinks] = useState<ILink[]>([]);

  const [inputParticipantName, setInputParticipantName] = useState("");
  const [inputParticipantEmail, setInputParticipantEmail] = useState("");
  const [inputParticipants, setInputParticipants] = useState<IParticipant[]>(
    [],
  );

  function handleToggleCreateActivitiesModal(state: boolean) {
    setIsActivitiesModalOpen(state);
  }

  function handleToggleCreateLinksModal(state: boolean) {
    setIsLinksModalOpen(state);
  }

  function handleToggleInviteToTravelModal(state: boolean) {
    setIsInviteToTravelModalOpen(state);
  }

  function handleCreateActivityModal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string;
    const occurs_at = data.get("occurs_at") as string;

    if (!occurs_at || !title) {
      alert("Preencha todos os campos");
      return;
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
      return;
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
    setInputActivities((activity) => [...activity, newActivity]);
    setIsActivitiesModalOpen(false);
    setInputActivityTitle("");
    setInputActivityURL("");
  }

  function handleCreateLinkModal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string;
    const url = data.get("url") as string;

    if (!url || !title) {
      alert("Preencha todos os campos");
      return;
    }

    if (inputLinks.map((link) => link.url).includes(url)) {
      alert("Este link já foi adicionado");
      return;
    }

    console.log(url);

    if (!url.match(/^https?:\/\/[a-zA-Z0-9][a-zA-Z0-9_|\-|\.]+$/)) {
      alert("Formato de url inválido");
      return;
    }

    const newLink: ILink = {
      id: String(inputParticipants.length + 1),
      title,
      url,
    };
    setInputLinks((link) => [...link, newLink]);
    setIsLinksModalOpen(false);
    setInputLinkTitle("");
    setInputLinkOccursAt("");
  }

  function handleInviteToTravelModal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;

    if (!email || !name) {
      alert("Preencha todos os campos");
      return;
    }

    if (
      inputParticipants.map((participant) => participant.email).includes(email)
    ) {
      alert("Este email ja foi adicionado");
      return;
    }

    if (
      !email.match(
        /^[a-z]+((_|\-|\.)[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/,
      )
    ) {
      alert("Formato de email inválido");
      return;
    }

    const newParticipant: IParticipant = {
      id: String(inputParticipants.length + 1),
      name,
      email,
      is_confirmed: false,
    };
    setInputParticipants((participant) => [...participant, newParticipant]);
    setIsInviteToTravelModalOpen(false);
    setInputParticipantName("");
    setInputParticipantEmail("");
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <Header
        date={inputDate}
        local={inputLocal}
      />
      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button onClick={() => handleToggleCreateActivitiesModal(true)}>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>

          <div className="space-y-8">
            {inputActivities.map((category) => (
              <div
                key={category.date}
                className="space-y-2.5"
              >
                <div className="flex gap-2 items-baseline">
                  <span className="text-xl font-semibold text-zinc-300">
                    Dia {format(category.date, "d")}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {format(category.date, "EEEE", { locale: ptBR })}
                  </span>
                </div>
                {category.activities.length > 0 ? (
                  <>
                    {category.activities.map((activity) => (
                      <InputContainer key={activity.id}>
                        {activity.occurs_at > category.date ? (
                          <CircleDashed className="size-5 text-zinc-400" />
                        ) : (
                          <CircleCheck className="size-5 text-lime-300" />
                        )}
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="ml-auto text-zinc-400">
                          {format(activity.occurs_at, "HH:mm")}h
                        </span>
                      </InputContainer>
                    ))}
                  </>
                ) : (
                  <span className="text-xs text-zinc-500">
                    Nenhuma atividade cadastrada nessa data.
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-80 space-y-6">
          <div className="space-y-6">
            <span className="text-xl font-semibold text-zinc-50">
              Links importantes
            </span>
            <div className="space-y-5">
              {inputLinks.length > 0 ? (
                inputLinks.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <span className="block font-medium text-zinc-100">
                        {link.title}
                      </span>
                      <a
                        href={link.url}
                        className="block text-zinc-400 hover:text-zinc-200  truncate"
                      >
                        {link.url}
                      </a>
                    </div>
                    <Link2 className="size-5 text-zinc-400" />
                  </div>
                ))
              ) : (
                <>Nenhum link cadastrado!</>
              )}
            </div>
            <Button
              size="full"
              variant="secondary"
              onClick={() => handleToggleCreateLinksModal(true)}
            >
              <Plus className="size-5" />
              Cadastrar novo link
            </Button>
          </div>
          <SeparatorX />
          <div className="space-y-6">
            <span className="text-xl font-semibold text-zinc-50">
              Confirmar participação
            </span>
            <div className="space-y-5">
              {inputParticipants.length > 0 ? (
                inputParticipants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <span className="block font-medium text-zinc-100">
                        {participant.name}
                      </span>
                      <a
                        href={participant.email}
                        className="block text-zinc-400 hover:text-zinc-200  truncate"
                      >
                        {participant.email}
                      </a>
                    </div>
                    {participant.is_confirmed ? (
                      <CircleCheck className="size-5 text-lime-300" />
                    ) : (
                      <CircleDashed className="size-5 text-zinc-400" />
                    )}
                  </div>
                ))
              ) : (
                <>Nenhum participante cadastrado!</>
              )}
            </div>
            <Button
              size="full"
              variant="secondary"
              onClick={() => handleToggleInviteToTravelModal(true)}
            >
              <UserCog className="size-5" />
              Gerenciar convidados
            </Button>
          </div>
        </div>
      </main>

      {isActivitiesModalOpen && (
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
            onSubmit={handleCreateActivityModal}
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
            >
              Salvar atividade
            </Button>
          </form>
        </ModalContainer>
      )}

      {isLinksModalOpen && (
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
            onSubmit={handleCreateLinkModal}
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
      )}

      {isInviteToTravelModalOpen && (
        <ModalContainer>
          <ModalHeaderContainer
            title="Confirmar participação"
            handleToggle={handleToggleInviteToTravelModal}
          >
            <p className="text-sm text-zinc-400">
              Você foi convidado(a) para participar de uma viagem para{" "}
              <span className="text-zinc-100 font-semibold">{inputLocal}</span>{" "}
              nas datas de{" "}
              <span className="text-zinc-100 font-semibold">{inputDate}</span>.
            </p>

            <p className="text-sm text-zinc-400">
              Para confirmar sua presença na viagem, preencha os dados abaixo:
            </p>
          </ModalHeaderContainer>
          <form
            onSubmit={handleInviteToTravelModal}
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
      )}
    </div>
  );
}
