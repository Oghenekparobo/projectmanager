import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return "<h1>loading</h1>";
  }

  if(!session) {
    router.push("/");
    return;
  }

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
}
