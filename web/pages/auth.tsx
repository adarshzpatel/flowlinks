import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface AuthPageProps {}

const AuthPage: NextPage<AuthPageProps> = () => {
  const supabase = useSupabaseClient();
  return (
    <Auth
      providers={["github"]}
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
    />
  );
};

export default AuthPage;
