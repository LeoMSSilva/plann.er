import { Calendar, MapPin, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, InputContainer, SeparatorY } from "../../../Components";

interface IHeaderProps {
  local: string;
  date: string;
}

export function Header({ date, local }: IHeaderProps) {
  const navigate = useNavigate();

  function handleToggleIsGuestsInputOpen() {
    navigate("/");
  }

  return (
    <InputContainer>
      <div className="flex gap-2 items-center flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-lg bg-transparent placeholder-zinc-400">
          {local}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg bg-transparent placeholder-zinc-400">
          {date}
        </span>
      </div>
      <SeparatorY />
      <Button
        type="button"
        variant="secondary"
        onClick={handleToggleIsGuestsInputOpen}
      >
        Alterar local/data
        <Settings2 className="size-5" />
      </Button>
    </InputContainer>
  );
}
