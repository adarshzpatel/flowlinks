import type { NextPage } from "next";
import Container from "../layouts/Container";
// import Test from "../components/Test";
import { useEffect, useState } from "react";
import { getAllOwners, mintFlowlink } from "../flow/scripts";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { currentUser, isInitialized } = useAuth();
  const loggedIn = currentUser?.addr ? true : false;
  const [flowLinks, setFlowLinks] =
    useState<{ name: string; owner: string }[]>();

  const session = useSession();
  const supabase = useSupabaseClient();

  const router = useRouter();

  useEffect(() => {
    if (loggedIn)
      getAllOwners().then((res) => {
        const domains = Object.keys(res).map((item) => ({
          name: item,
          owner: res[item],
        }));
        setFlowLinks(domains);
      });
  }, [loggedIn]);

  return (
    <Container>
      {!session ? (
        <Auth
          providers={["github"]}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        <div className="mt-8">
          {flowLinks?.map((item) => (
            <Link href={`/${item.name}`}>
              <div className="p-4 border border-gray-700 bg-gray-800 hover:shadow-xl rounded hover:-translate-y-2 duration-200 ease-out ">
                <div className="text-xl font-bold">{item.name}</div>
                <p className="text-sm text-gray-400">{item?.owner}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Home;
