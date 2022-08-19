import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return "<h1>loading</h1>";
  }

  if (session) {
    router.push("/dashboard");
    return;
  }

  return (
    <div>
      <header className="w-full h-screen relative">
        {/* background image */}
        <Image
          src="/pexel.jpg"
          objectFit="cover"
          objectPosition="center"
          layout="fill"
          alt="background image"
        />

        {/* background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-400 mix-blend-multiply"></div>

        {/* the  border around the body  also has a clip path*/}
        <div className=" md:absolute md:inset-0 md:border-4 md:border-white md:m-4 "></div>

        {/* header text contents */}
        <div className="">
          <div className="text-container md:space-y-4 rounded p-6 text-white relative top-96 left-20 md:inset-y-96   md:inset-x-14 w-2/3 md:max-w-md  bg-black z-50">
            <h2 className="md:text-3xl font-bold">Project Manager</h2>
            <p className="tracking-wide text-gray-300">
              the best way to manage your projects
            </p>
            <p className="text-amber-400">free trial then just $19.99 /m</p>
          </div>
        </div>

        {/*login link */}
        <div className="">
          <div className="text-container space-y-4 rounded py-4 rounded  font-bold px-6 cursor-pointer text-white hover:bg-blue-400 hover:text-black transition-all relative md:inset-x-2/3  inset-x-14 w-28  bg-black z-50  ">
            <Link href="/api/auth/signin">
              <a  className="flex items-center">
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
