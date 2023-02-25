import Logo from "./Logo";
import Link from "next/link";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import "../../flow/config";
import useBaseUser from "../../store/useBaseUser";

//Components

const Navbar = () => {
  const { currentUser, logOut, logIn } = useAuth();

  const { user } = useBaseUser();

  return (
    <header className="px-8 py-4 sticky top-0 backdrop-blur-xl z-50 border-b border-b-gray-800">
      <nav className="flex max-w-screen-2xl items-center mx-auto justify-between">
        <Logo />
        <div className="flex flex-row space-x-4 items-center">
          <div className="flex gap-2 items-center justify-center">
            <Button
              variant={currentUser?.addr ? "danger" : "primary"}
              onClick={currentUser.addr ? logOut : logIn}
            >
          {currentUser.addr && <span className="font-semibold underline text- border-r-2 mr-2 pr-2">
              {currentUser.addr}
            </span>}
              {currentUser.addr ? "Disconnect" : "Connect Wallet"}
            </Button>
          </div>
          {user.id && (
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
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
