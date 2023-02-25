import type { NextPage } from "next";
import Container from "../layouts/Container";
// import Test from "../components/Test";
import { useEffect, useState } from "react";
import { getAllOwners } from "../flow/scripts";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import useBaseUser from "../store/useBaseUser";

const Home: NextPage = () => {
  const { currentUser } = useAuth();
  const loggedIn = currentUser?.addr ? true : false;
  const [flowLinks, setFlowLinks] =
    useState<{ name: string; owner: string }[]>();

  const session = useSession();
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
          {flowLinks?.map((item, idx) => (
            <Link key={idx} href={`/${item.name}`}>
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
