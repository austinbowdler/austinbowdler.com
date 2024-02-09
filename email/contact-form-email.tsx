import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
};

export default function ContactFormEmail({ message }: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio site.</Preview>
    </Html>
  );
}
