import { auth, currentUser } from "@clerk/nextjs/server";
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
    return { success: false, error: "SERVER_ERROR", message: (error as Error).message};
  }
};

export const currentUserRole = async () =>{
  try{
    

    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { success: false, error: "UNAUTHORIZED" };
    }
    const { id } = clerkUser;
    const user = await prisma.user.findUnique({
      where: {clerkId: id},
      select: {role: true}
    });
    if(!user){
      return { success: false, error: "USER_NOT_FOUND" };
    }
    return { success: true, data: user.role };



  }catch(error){
    return { success: false, error: "SERVER_ERROR", message: (error as Error).message};

  }
}

export const getDBUserId = async ()=>{
  try{
    const userAuth =await auth();
    if(!userAuth.userId){
      return { success: false, error: "UNAUTHORIZED" };
    }
    const userId = await prisma.user.findUnique({
      where: {clerkId: userAuth.userId},
      select: {id: true}
    });
    if(!userId){
      return { success: false, error: "USER_NOT_FOUND" };
    }
    return { success: true, data: userId.id };
  }catch(error){
    return { success: false, error: "SERVER_ERROR", message: (error as Error).message};

  }
}