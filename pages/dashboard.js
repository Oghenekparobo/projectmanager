import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { getProjects } from "lib/data";
import prisma from "lib/prisma";
import NewTodo from "./components/NewTodo";

export default function Home({ projects }) {
  const [name, setName] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return "<h1>loading</h1>";
  }

  if (!session) {
    router.push("/");
    return;
  }

  if (!session.user.isSubscriber) {
    router.push("/subscribe");
    return;
  }

  return (
    <div className="dashboard">
      <section>
        <h1 className="text-white pt-20 text-3xl text-center">Projects</h1>

        <div className="project-wrapper px-20 text-white md:grid md:grid-cols-4 my-20 ">
          {projects.map((project) => (
            <>
              <div className=" flex flex-col items-center" key={project.id}>
                <h1 className="text-2xl font-bold py-1  border-b border-gray-500">
                  {project.name}
                  <span
                    className="cursor-pointer"
                    onClick={async (e) => {
                      e.preventDefault();
                      await fetch("/api/project", {
                        body: JSON.stringify({
                          id: project.id,
                        }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                        method: "DELETE",
                      });

                      router.reload();
                    }}
                  >
                    🗑
                  </span>
                </h1>
                <NewTodo project_id={project.id} />
                <div className=" py-4">
                  <ol className="list-disc text-xl">
                    {project.todos.map((todo) => (
                      <li key={todo.id}>
                        <span
                          className="cursor-pointer"
                          onClick={async () => {
                            await fetch("/api/complete", {
                              body: JSON.stringify({
                                id: todo.id,
                              }),
                              headers: {
                                "Content-Type": "application/json",
                              },
                              method: "POST",
                            });

                            router.reload();
                          }}
                        >
                          {todo.done ? "✅" : "⬜️"}
                        </span>{" "}
                        <span className={`${todo.done ? "line-through" : ""}`}>
                          {todo.name}
                          <span
                            className="cursor-pointer"
                            onClick={async (e) => {
                              e.preventDefault();
                              await fetch("/api/todo", {
                                body: JSON.stringify({
                                  id: todo.id,
                                }),
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                method: "DELETE",
                              });

                              router.reload();
                            }}
                          >
                            🗑
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          ))}
        </div>

        <div className="form-wrapper">
          <form
            className="mt-10 flex flex-row justify-center"
            onSubmit={async (e) => {
              e.preventDefault();
              await fetch("/api/project", {
                body: JSON.stringify({
                  name,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              });

              router.reload();
            }}
          >
            <input
              onChange={(e) => setName(e.target.value)}
              className="border p-1 text-black outline-none"
              required
              placeholder="New project"
            />

            <button
              disabled={name ? false : true}
              className={`border px-8 py-2 font-bold transition-all ${
                name
                  ? "bg-black text-white border-none"
                  : "cursor-not-allowed text-gray-400 border-gray-400"
              }`}
            >
              Add
            </button>
          </form>
        </div>
        <div className="cancel-sub text-white">
          <p
            className="text-center text-xs mt-20 hover:underline cursor-pointer"
            onClick={async (e) => {
              e.preventDefault();
              await fetch("/api/cancel", {
                method: "POST",
              });

              router.reload();
            }}
          >
            cancel your subscription
          </p>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let projects = await getProjects(prisma, session?.user.id);
  projects = JSON.parse(JSON.stringify(projects));

  return {
    props: {
      projects,
    },
  };
}
