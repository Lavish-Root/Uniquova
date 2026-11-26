"use client";

import React from "react";
import LoaderStage from "@/components/LoaderStage";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FAF9FF] overflow-hidden select-none">
      <LoaderStage />
    </div>
  );
}
