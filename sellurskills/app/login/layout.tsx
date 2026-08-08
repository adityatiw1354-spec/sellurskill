import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Log in — SellurSkills",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}