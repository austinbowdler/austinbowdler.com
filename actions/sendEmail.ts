"use server";

import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid email",
    };
  }
  if (!validateString(message, 1000)) {
    return {
      error: "Invalid message",
    };
  }

  try {
    await resend.emails.send({
      from: "austinbowdler.com <onboarding@resend.dev>",
      to: "austin@austinbowdler.com",
      subject: "New message from your portfolio",
      reply_to: senderEmail as string,
      text: message as string,
      //react: {},
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
