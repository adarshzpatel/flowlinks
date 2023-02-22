import type { NextPage } from "next";
import Hero from "../components/hero/Hero";
import Container from "../layouts/Container";
// import Test from "../components/Test";
import { useEffect, useState } from "react";
import { getAllFlowLinks } from "../flow/scripts";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
  const {currentUser} = useAuth()
  const loggedIn = currentUser?.addr ? true : false
  const [flowLinks,setFlowLinks] = useState<boolean>(true);

  useEffect(() => {
    if(loggedIn) getAllFlowLinks().then((res)=>{
      console.log("flowlinks",res)
      setFlowLinks(res)
    })
  }, [loggedIn])
  
  return (
    <Container> 
      {loggedIn ? <div className="text-blue-500">User is logged in</div>: "PLease log in" }
    </Container>
  );
};

export default Home;
