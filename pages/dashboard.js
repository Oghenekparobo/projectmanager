import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return "<h1>loading</h1>";
  }

  if (!session) {
    router.push("/");
    return;
  }

  return (
    <div className="dashboard">
      <section>
        <h1 className="text-white text-3xl text-center">Projects</h1>
        <div className="project-section flex justify-center space-x-20 pt-10 text-white">
          <div className="project-1">
            <h1 className="text-2xl font-bold  py-6">Project #1</h1>
            <div className="project-1__todos">
              <ol className="list-decimal text-xl">
                <li>todo 1</li>
                <li>todo 2</li>
                <li>todo 3</li>
              </ol>
            </div>
          </div>
          <div className="project-2">
            <h1 className="text-2xl font-bold">Project #2</h1>
            <div className="project-2__todos">
              <ol className="list-decimal text-xl">
                <li>todo 1</li>
                <li>todo 2</li>
                <li>todo 3</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
