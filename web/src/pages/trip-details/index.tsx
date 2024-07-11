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
import { useState } from "react";
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

  const mocksActivities: IActivity[] = [
    {
      date: new Date("2024-07-09T03:24:00").toString(),
      activities: [
        {
          id: "1",
          title: "Cafe da manha",
          occurs_at: new Date("2024-07-10T03:24:00").toString(),
        },
        {
          id: "2",
          title: "Cafe da manha2",
          occurs_at: new Date("2024-07-10T03:24:00").toString(),
        },
      ],
    },
    {
      date: new Date("2024-07-10T03:24:00").toString(),
      activities: [
        {
          id: "2",
          title: "Academia",
          occurs_at: new Date(Date.now()).toString(),
        },
      ],
    },
    {
      date: new Date(Date.now()).toString(),
      activities: [],
    },
  ];

  const mocksLinks: ILink[] = [
    {
      id: "1",
      title: "Reserva do AirBnB",
      url: "https://www.airbnb.com.br/rooms/104700011",
    },
    {
      id: "2",
      title: "Reserva do AirBnB2",
      url: "https://www.airbnb.com.br/rooms/104700011",
    },
    {
      id: "3",
      title: "Reserva do AirBnB3",
      url: "https://www.airbnb.com.br/rooms/104700011",
    },
  ];

  const mocksParticipants: IParticipant[] = [
    {
      id: "1",
      name: "Teste",
      email: "teste@teste.teste",
      is_confirmed: false,
    },
    {
      id: "2",
      name: "Teste2",
      email: "teste2@teste.teste",
      is_confirmed: false,
    },
    {
      id: "3",
      name: "Teste3",
      email: "teste3@teste.teste",
      is_confirmed: true,
    },
  ];

  const [inputActivityTitle, setInputActivityTitle] = useState("");
  const [inputActivityURL, setInputActivityURL] = useState("");
  const [inputActivities, setInputActivities] =
    useState<IActivity[]>(mocksActivities);

  const [inputLinkTitle, setInputLinkTitle] = useState("");
  const [inputLinkOccursAt, setInputLinkOccursAt] = useState("");
  const [inputLinks, setInputLinks] = useState<ILink[]>(mocksLinks);

  const [inputParticipantName, setInputParticipantName] = useState("");
  const [inputParticipantEmail, setInputParticipantEmail] = useState("");
  const [inputParticipants, setInputParticipants] =
    useState<IParticipant[]>(mocksParticipants);

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
            <Button>
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
            >
              <UserCog className="size-5" />
              Gerenciar convidados
            </Button>
          </div>
        </div>
      </main>

      <ModalContainer>
        <ModalHeaderContainer
          title="Cadastrar atividade"
          handleToggle={() => {}}
        >
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </ModalHeaderContainer>
        <form className="space-y-4 w-full">
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

      <ModalContainer>
        <ModalHeaderContainer
          title="Cadastrar link"
          handleToggle={() => {}}
        >
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.{" "}
          </p>
        </ModalHeaderContainer>
        <form className="space-y-4 w-full">
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

      <ModalContainer>
        <ModalHeaderContainer
          title="Confirmar participação"
          handleToggle={() => {}}
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
        <form className="space-y-4 w-full">
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
    </div>
  );
}
