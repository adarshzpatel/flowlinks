import Logo from "./Logo";
import Link from "next/link";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import "../../flow/config";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../../utils/databse.types";

//Components

const Navbar = () => {
  const { currentUser, logOut, logIn } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const user = useUser();
  const supabase = useSupabaseClient<Database>();

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const fetchAvatarUrl = async () => {
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
    if (user) fetchAvatarUrl();
  }, [user]);

  return (
    <header className="px-8 py-4 sticky top-0 backdrop-blur-xl z-50 border-b border-b-gray-800">
      <nav className="flex max-w-screen-2xl items-center mx-auto justify-between">
        <Logo />
        <div className="flex flex-row space-x-4 items-center">
          <Link href={"/builder"}>
            {/* <ClaimBtn
            text="Connect Wallet"
            textSize="text-base"
            /> */}
            <button
              className={
                "py-2 px-4 font-bold text-gray-200 hover:text-gray-200 hover:bg-gray-800 rounded-md "
              }
            >
              Claim FlowLink
            </button>
          </Link>
          <div className="flex gap-2 items-center justify-center">
            <span className="font-semibold underline border-r-2 pr-2">
              {currentUser.addr && currentUser.addr}
            </span>
            <Button
              variant={currentUser?.addr ? "danger" : "primary"}
              onClick={currentUser.addr ? logOut : logIn}
            >
              {currentUser.addr ? "Disconnect" : "Connect Wallet"}
            </Button>
          </div>
          <Link href={"/account"}>
            <div className="w-10 h-10 border hover:scale-105 transform duration-150 cursor-pointer">
              <img
                src={
                  avatarUrl
                    ? `${avatarUrl}`
                    : user && user.user_metadata.avatar_url
                    ? user.user_metadata.avatar_url
                    : "https://avatar.tobi.sh/tobiaslins.svg?text=" +
                      user?.email?.slice(0, 2)
                }
                alt=""
              />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
