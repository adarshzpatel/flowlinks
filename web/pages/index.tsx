import type { NextPage } from "next";
import Container from "../layouts/Container";
// import Test from "../components/Test";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Spinner from "../components/ui/Spinner";
import { Button } from "@mantine/core";
import { checkIsInitialized } from "../flow/scripts";
import { initializeAccount, mintNFT } from "../flow/transactions";

const Home: NextPage = () => {
  const { currentUser,  } = useAuth();
  const loggedIn = currentUser?.addr ? true : false;
  const [flowLinks, setFlowLinks] =
    useState<{ name: string; owner: string }[]>();
  const [processing, setProcessing] = useState<boolean>(false);

  const runScript = async () => {
    try {
      // if(!currentUser?.addr) return
      setProcessing(true);
      // const res = await checkIsInitialized(currentUser?.addr);
      const res = await mintNFT()
      console.log({ res });
    } catch (err) {
      console.log({ err });
    }
    setProcessing(false);
  };


  return (
    <Container>
      <div className="mt-8">
        {processing && <Spinner />}
        {flowLinks?.map((item) => (
          <Link href={`/${item.name}`}>
            <div className="p-4 border border-gray-700 bg-gray-800 hover:shadow-xl rounded hover:-translate-y-2 duration-200 ease-out ">
              <div className="text-xl font-bold">{item.name}</div>
              <p className="text-sm text-gray-400">{item?.owner}</p>
            </div>
          </Link>
        ))}
        <Button onClick={runScript} variant="outline">Run Script</Button>
      </div>
    </Container>
  );
};

export default Home;
