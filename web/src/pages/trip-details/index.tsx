import { Header } from "./Components";

export function TripDetails() {
  const inputLocal = "Brasil";
  const inputDate = "hoje";

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <Header
        date={inputDate}
        local={inputLocal}
      />
    </div>
  );
}
