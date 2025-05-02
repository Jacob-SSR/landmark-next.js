"use server";

import {
  imageSchema,
  landmarkSchema,
  profileSchema,
  validateWithZod,
} from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must logged!!!");
  }

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An Error!!!",
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser();

    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    const validateFile = validateWithZod(imageSchema, { image: file });
    const validateField = validateWithZod(landmarkSchema, rawData);
    console.log("validated", validateFile);
    console.log("validated", validateField);

    return { message: "Create Landmark Success!!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  // redirect("/");
};

export const createLandmarkAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please Login!!!");

    const rawData = Object.fromEntries(formData);
    // const validateField = validateWithZod(profileSchema, rawData);
    console.log(rawData);

    return { message: "Create Landmark Success!!!" };
  } catch (error) {
    // console.log(error);
    return renderError(error);
  }
  // redirect("/");
};
