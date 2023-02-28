import Logo from "./Logo";
import Link from "next/link";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import "../../flow/config";
import { Menu } from "@mantine/core";
import Router from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { FiUser } from "react-icons/fi";
import { useControls } from "../../store/useControls";

//Components

const Navbar = () => {
  const { currentUser, logOut, logIn } = useAuth();
  const supabase = useSupabaseClient()
  const user = useUser();
  const {authModal,setAuthModal} = useControls()
  return (
    <header className="px-8 py-4 sticky top-0 backdrop-blur-xl  z-50 border-b border-b-gray-800 ">
      <nav className="flex max-w-screen-2xl items-center mx-auto justify-between">
        <Logo />
        <div className="flex gap-2 items-center justify-center">
          <Link href={"/explore"} className="heading  text-lg mr-2 tracking-wider text-gray-400 hover:text-white duration-200 ease-out font-medium uppercase">Explore</Link>
          <div className="w-[2px] rounded-full h-8 bg-gray-600"/>
          <Link href={"/builder"}>
            <Button variant="primary">Create FlowLink</Button></Link>
          {!currentUser?.addr && !user?.email && (
            <Button onClick={()=>setAuthModal(true)}>Connect Wallet</Button>
          )}
          {(currentUser?.addr || user?.email) && (
            <Menu position="bottom-end" shadow="md" width={200}>
              <Menu.Target>
                <Button className="flex gap-2"> Account
                  <FiUser className="!stroke-gray-400 h-5 w-5"/>
                </Button>
              </Menu.Target>
              <Menu.Dropdown className="heading">
                <Menu.Item onClick={()=>Router.push("/dashboard")}>Dashboard</Menu.Item>
                <Menu.Divider/>
              {currentUser?.addr && <Menu.Item onClick={logOut}>Disconnect Wallet</Menu.Item>}
              {user?.email && <Menu.Item onClick={()=>supabase.auth.signOut()}>Logout</Menu.Item>}
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
