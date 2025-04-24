"use client";

import { useSession } from "next-auth/react";

export default function ClientAuthComponent() {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "authenticated" ? (
        <div>
          <p>Authenticated</p>
          {session && <p>Session: {JSON.stringify(session)}</p>}

        </div>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
}
