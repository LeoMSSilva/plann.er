import { CircleCheck, CircleDashed, Plus } from "lucide-react";
import { type FormEvent, useState } from "react";
import { ActivityModal } from ".";
import { Button, InputContainer } from "../../../Components";
import type { IActivity } from "../../../Interfaces";
import {
  formatPresentationDay,
  formatPresentationTime,
  formatPresentationWeekDay,
} from "../../../utils";

interface IActivityListProps {
  inputActivities: IActivity[];
  handleActivityModal: (value: FormEvent<HTMLFormElement>) => Promise<boolean>;
}

export const ActivityList = ({
  inputActivities,
  handleActivityModal,
}: IActivityListProps) => {
  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);

  function handleToggleCreateActivitiesModal(state: boolean) {
    setIsActivitiesModalOpen(state);
  }

  return (
    <>
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
                  {formatPresentationDay(category.date)}
                </span>
                <span className="text-xs text-zinc-500">
                  {formatPresentationWeekDay(category.date)}
                </span>
              </div>
              {category.activities.length > 0 ? (
                <>
                  {category.activities.map((activity) => (
                    <InputContainer key={activity.id}>
                      {new Date(activity.occurs_at) > new Date(Date.now()) ? (
                        <CircleDashed className="size-5 text-zinc-400" />
                      ) : (
                        <CircleCheck className="size-5 text-lime-300" />
                      )}
                      <span className="text-zinc-100">{activity.title}</span>
                      <span className="ml-auto text-zinc-400">
                        {formatPresentationTime(activity.occurs_at)}
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

      {isActivitiesModalOpen && (
        <ActivityModal
          handleToggleCreateActivitiesModal={handleToggleCreateActivitiesModal}
          handleActivityModal={handleActivityModal}
        />
      )}
    </>
  );
};
