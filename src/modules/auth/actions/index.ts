import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const onBoardUser = async () => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { success: false, error: "UNAUTHORIZED" };
    }

    const { firstName, lastName, imageUrl } = clerkUser;
    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    if (!primaryEmail) {
      return { success: false, message: "No email found." };
    }

    const newUser = await prisma.user.upsert({
      where: { clerkId: clerkUser.id },
      update: {
        email: primaryEmail || "",
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        imageUrl: imageUrl ?? "",
      },
      create: {
        clerkId: clerkUser.id,
        email: primaryEmail || "",
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        imageUrl: imageUrl ?? "",
      },
    });
    return { success: true, data: newUser, message: "User onboarded successfully." };
  } catch (error) {
    return { success: false, message: "Error fetching authenticated user." };
  }
};
