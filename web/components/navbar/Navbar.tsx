import Logo from "./Logo";
import Link from "next/link";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import "../../flow/config";
import useBaseUser from "../../store/useBaseUser";
import { Menu } from "@mantine/core";
import Router from "next/router";
//Components

const Navbar = () => {
  const { currentUser, logOut, logIn } = useAuth();

  const { user } = useBaseUser();

  return (
    <header className="px-8 py-4 sticky top-0 backdrop-blur-xl z-50 border-b border-b-gray-800">
      <nav className="flex max-w-screen-2xl items-center mx-auto justify-between">
        <Logo />
        <div className="flex gap-2 items-center justify-center">
          {!currentUser?.addr && (
            <Button onClick={logIn}>Connect Wallet</Button>
          )}
          {currentUser.addr && (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button>{currentUser?.addr}</Button>
              </Menu.Target>
              
              <Menu.Dropdown>
                <Menu.Item onClick={()=>Router.push("/dashboard")}>Dashboard</Menu.Item>
                <Menu.Item onClick={logOut}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}

          {user.id && (
            <Link href={"/dashboard"}>
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
