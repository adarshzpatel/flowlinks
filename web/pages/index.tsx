import type { NextPage } from "next";
import Hero from "../components/hero/Hero";
import Container from "../layouts/Container";
import Test from "../components/Test";
import { useState } from "react";

const Home: NextPage = () => {
  const [loggedIn,setLoggedIn] = useState<boolean>(true)
  const [s,setS] = useState<string>();

  
  return (
    <Container> 
    {loggedIn ? <div className="text-blue-500">User is logged in</div>: "PLease log in" }
    </Container>
  );
};

export default Home;
