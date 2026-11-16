import React from "react";
import type { Metadata } from "next";
import AdminClient from "@/components/AdminClient";

export const metadata: Metadata = {
  title: "UNIQOVA Gateway | System Operations",
  description: "Internal project and portfolio operations gateway.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminClient />;
}
