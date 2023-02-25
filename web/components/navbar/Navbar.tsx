import Logo from "./Logo";
import Link from "next/link";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import "../../flow/config";
import useBaseUser from "../../stores/useBaseUser";
import { useEffect } from "react";

//Components

const Navbar = () => {
  const { currentUser, logOut, logIn } = useAuth();

  const { user } = useBaseUser();

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
                  user.id && user.avatar_url
                    ? `${user.avatar_url}`
                    : "https://avatar.tobi.sh/tobiaslins.svg?text=" +
                      user?.email?.slice(0, 2)
                }
                alt="prof.img"
              />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
