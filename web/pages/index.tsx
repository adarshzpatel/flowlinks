import type { NextPage } from "next";
import Container from "../layouts/Container";
// import Test from "../components/Test";
import { useEffect, useState } from "react";
import { AuthContext, useAuth } from "../context/AuthContext";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { FiArrowRight } from "react-icons/fi";
import Card from "../components/Builder/Card";
import { HiArrowRight } from "react-icons/hi";

const Home: NextPage = () => {
  const { currentUser } = useAuth();
  const loggedIn = currentUser?.addr ? true : false;
  const [flowLinks, setFlowLinks] =
    useState<{ name: string; owner: string }[]>();

  const session = useSession();
  const supabase = useSupabaseClient();

  const user = useUser();

  // async function downloadImage(path: string) {
  //   try {
  //     const { data, error } = await supabase.storage
  //       .from("avatars")
  //       .download(path);
  //     if (error) {
  //       throw error;
  //     }
  //     const url = URL.createObjectURL(data);
  //   } catch (error) {
  //     console.log("Error downloading image: ", error);
  //   }
  // }

  // const fetchAndSetAvatarUrl = async () => {
  //   let { data, error, status } = await supabase
  //     .from("profiles")
  //     .select(`avatar_url`)
  //     .eq("id", user?.id)
  //     .single();

  //   if (error && status !== 406) {
  //     throw error;
  //   }

  //   if (data && typeof data.avatar_url === "string") {
  //     downloadImage(data.avatar_url);
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     fetchAndSetAvatarUrl();
  //   }
  // }, [user]);

  return (
    <Container>
      <div className="flex section__height ">
        <div className="flex flex-col justify-center flex-1 px-8 py-8 md:px-12 lg:flex-none lg:px-24">
          <div className="w-full mx-auto lg:max-w-6xl">
            <div className="max-w-xl text-center lg:p-10 lg:text-left">
              <div>
                <p className="text-5xl tracking-tighter text-flow-500 lg:text-6xl font-bold">
                  Showcase all your links in one place .
                </p>
                <p className="max-w-xl mt-4 text-lg lg:text-3xl tracking-tight text-gray-400">
                  Our SaaS programming product offers a powerful platform that
                  makes coding easier, faster and more efficient.We understand
                  the fast-paced nature of the tech industry, and our software
                  is built to keep up.
                </p>{" "}
              </div>
              <div className="flex flex-col gap-3 mt-10 sm:flex-row">
                <a
                  className="inline-flex gap-4 items-center justify-center w-full px-6 py-3 text-center text-black duration-200 bg-flow-500 active:scale-95 duration-100 hover:scale-105 font-medium rounded-xl focus:outline-none lg:w-auto "
                  href="#builder"
                >
                  Claim your FlowLink
                </a>

              </div>
            </div>
          </div>
      </div>
        <div className="flex flex-1 items-center justify-center">

        <Card/>
        </div>
        </div>
    </Container>
  );
};

export default Home;
