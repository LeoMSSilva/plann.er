import Logo from "../../../assets/logo.svg";

export function Header() {
  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src={Logo}
        alt="Planner - Planejador de viagem"
      />

      <p className="text-lg text-zinc-300">
        Convide seus amigos e planeje sua próxima viagem!
      </p>
    </div>
  );
}
