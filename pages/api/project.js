import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "user not logged in" });

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return res.status(401).json({ message: "user does not exist" });

  if (req.method === "POST") {
    await prisma.project.create({
      data: {
        name: req.body.name,
        owner: {
          connect: { id: user.id },
        },
      },
    });
  }

  if (req.method === "DELETE") {
    await prisma.project.deleteMany({
      where: {
        id: req.body.id,
        owner: {
          id: user.id,
        },
      },
    });
  }

  res.end();
}
