import { useRouter } from "next/router";
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Database } from "../db_types";
import "../styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider,DehydratedState } from "@tanstack/react-query";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session, dehydratedState: DehydratedState }>) {
  const router = useRouter();
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <button
            onClick={async () => {
              await supabaseClient.auth.signOut();
              router.push("/");
            }}
          >
            Logout
          </button>

          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
