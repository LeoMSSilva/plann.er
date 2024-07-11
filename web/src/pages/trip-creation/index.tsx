import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { Input, InputContainer } from "../../Components";
import { Footer, Header, Layout } from "./Components";

export function TripCreation() {
  const [inputLocal, setInputLocal] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);

  return (
    <Layout>
      <Header />
      <div className="space-y-4">
        <InputContainer>
          <Input
            disabled={isGuestsInputOpen}
            placeholder="Para onde você vai?"
            value={inputLocal}
            setValue={setInputLocal}
          >
            <MapPin className="size-5 text-zinc-400" />
          </Input>
          <Input
            disabled={isGuestsInputOpen}
            placeholder="Quando?"
            value={inputDate}
            setValue={setInputDate}
          >
            <Calendar className="size-5 text-zinc-400" />
          </Input>
          <h1>Trip Creation</h1>
        </InputContainer>
      </div>
      <Footer />
    </Layout>
  );
}
