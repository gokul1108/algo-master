import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "No authenticated user found." };
    }
    const { id, emailAddresses, firstName, lastName, imageUrl } = user;
    const newUser = await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        email: emailAddresses[0]?.emailAddress || "",
        firstName: firstName || "",
        lastName: lastName || "",
        imageUrl: imageUrl || "",
      },
      create: {
        clerkId: id,
        email: emailAddresses[0]?.emailAddress || "",
        firstName: firstName || "",
        lastName: lastName || "",
        imageUrl: imageUrl || "",
      },
    });
    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, message: "Error fetching authenticated user." };
  }
};
