import { InputContainer } from "../../Components";
import { Footer, Header, Layout } from "./Components";

export function TripCreation() {
  return (
    <Layout>
      <Header />
      <div className="space-y-4">
        <InputContainer>
          <h1>Trip Creation</h1>
        </InputContainer>
      </div>
      <Footer />
    </Layout>
  );
}
