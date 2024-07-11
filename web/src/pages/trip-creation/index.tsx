import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { useState } from "react";
import {
  Button,
  Input,
  InputContainer,
  ModalContainer,
  ModalHeaderContainer,
  SeparatorY,
} from "../../Components";
import { Footer, Header, Layout } from "./Components";

export function TripCreation() {
  const [inputLocal, setInputLocal] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);

  function handleToggleIsGuestsInputOpen(state: boolean) {
    setIsGuestsInputOpen(state);
  }

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
          <SeparatorY />
          <Button
            type="button"
            variant={isGuestsInputOpen ? "secondary" : "primary"}
            onClick={() => handleToggleIsGuestsInputOpen(!isGuestsInputOpen)}
          >
            {isGuestsInputOpen ? (
              <>
                Alterar local/data
                <Settings2 className="size-5" />
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="size-5" />
              </>
            )}
          </Button>
        </InputContainer>

        <ModalContainer>
          <ModalHeaderContainer
            title="Confirmar criação da viagem"
            handleToggle={() => {}}
          >
            <p className="text-sm text-zinc-400">
              Para concluir a criação da viagem para{" "}
              <span className="text-zinc-100 font-semibold">{inputLocal}</span>{" "}
              nas datas de{" "}
              <span className="text-zinc-100 font-semibold">{inputDate}</span>{" "}
              preencha seus dados abaixo:
            </p>
          </ModalHeaderContainer>
        </ModalContainer>
      </div>
      <Footer />
    </Layout>
  );
}
