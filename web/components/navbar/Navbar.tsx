import Logo from "./Logo";
import Link from "next/link";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import "../../flow/config";

//Components

const Navbar = () => {
  const { currentUser, logOut, logIn} = useAuth();

  return (
    <header className="px-8 py-4 sticky top-0 backdrop-blur-xl z-50 border-b border-b-gray-800">
      <nav className="flex max-w-screen-2xl items-center mx-auto justify-between">
        <Logo />
        <div className="flex flex-row space-x-4">

          <Link href={"/builder"}>
            {/* <ClaimBtn
            text="Connect Wallet"
            textSize="text-base"
            /> */}
            <button className={"py-2 px-4 font-bold text-gray-200 hover:text-gray-200 hover:bg-gray-800 rounded-md "}>Claim FlowLink</button>
          </Link>
          <Button
            variant={currentUser?.addr ? "danger" : "primary"}
            onClick={currentUser.addr ? logOut : logIn}
          >
            {currentUser.addr ? "Log Out" : "Login"}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
