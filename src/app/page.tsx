import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { onBoardUser } from "@/modules/auth/actions";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);
  await onBoardUser();
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello, Prisma with Postgres!
      </h1>
      <p>
        Welcome to your Next.js application using Prisma ORM with a PostgreSQL
        database.
      </p>
      <Button className="mt-4">Click Me</Button>
      <UserButton />
    </div>
  );
}
