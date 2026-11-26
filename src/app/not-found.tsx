import Canyon404 from "@/src/components/CrazyComponents/tsx/404";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | UNIQOVA",
  description: "Sorry, there's nothing to see here but cacti. Return to UNIQOVA homepage.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <Canyon404 
      errorCode="404"
    />
  );
}
