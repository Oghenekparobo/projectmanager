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

  if(!session.user.isSubscriber){
    router.push('/subscribe');
    return;
  }

  return (
    <div className="dashboard">
      <section>
        <h1 className="text-white pt-20 text-3xl text-center">Projects</h1>

        <div className="project-wrapper px-20 text-white md:grid md:grid-cols-4 my-20 ">

        <div className="project-1 flex flex-col items-center">
            <h1 className="text-2xl font-bold py-1  border-b border-gray-500">Project #1</h1>
            <div className="project-1__todos py-4">
              <ol className="list-disc text-xl">
                <li>todo 1</li>
                <li>todo 2</li>
                <li>todo 3</li>
              </ol>
            </div>
          </div>

          <div className="project-2 flex flex-col items-center">
            <h1 className="text-2xl font-bold py-1 border-b border-gray-500">Project #2</h1>
            <div className="project-2__todos py-4">
              <ol className="list-disc text-xl">
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
