
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";

export default function AuthCard() {
  return (
    <Auth
      supabaseClient={supabase}
      providers={["google"]}
      socialLayout="horizontal"
      magicLink={true}
      appearance={{ 
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#40C676',
              brandAccent: '#369b63',
            },
          },
        },
      }}
      redirectTo={`${window.location.origin}/client-portal`}
    />
  );
}
