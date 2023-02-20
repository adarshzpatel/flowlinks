import type { NextPage } from "next";
import Hero from "../components/hero/Hero";
import Container from "../layouts/Container";

const Home: NextPage = () => {
  return (
    <Container>
      <Hero/>
    </Container>
  );
};

export default Home;
