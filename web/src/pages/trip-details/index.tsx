import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CircleCheck, CircleDashed, Link2, Plus } from "lucide-react";
import { useState } from "react";
import { Button, InputContainer } from "../../Components";
import type { IActivity, ILink } from "../../Interfaces";
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

  const [inputActivities, setInputActivities] =
    useState<IActivity[]>(mocksActivities);

  const [inputLinks, setInputLinks] = useState<ILink[]>(mocksLinks);

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
        </div>
      </main>
    </div>
  );
}
