import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useBaseUser from "../store/useBaseUser";
import {useRouter} from 'next/router'
import { GetServerSideProps } from "next";

const AppContainer = ({ children }: any) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const { setUser } = useBaseUser();

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setUser({ avatar_url: url });
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const fetchAndSetAvatarUrl = async () => {
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`avatar_url`)
      .eq("id", user?.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data && typeof data.avatar_url === "string") {
      downloadImage(data.avatar_url);
    }
  };

  useEffect(() => {
    if (user) {
      setUser({
        id: user.id,
        username: user.user_metadata.username,
        avatar_url: user.user_metadata.avatar_url,
        email: user.email,
        full_name: user.user_metadata.full_name,
        website: user.user_metadata.website,
      });
      fetchAndSetAvatarUrl();
    }
  }, [user]);


  return (
    <>
      <Head>
        <title>FlowLinks - Showcase all your links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <Navbar />
        <div className="max-w-screen-2xl  mx-auto  ">{children}</div>
      </div>
    </>
  );
};


export default AppContainer;
