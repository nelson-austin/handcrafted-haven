"use client";

import { useParams } from "next/navigation";
import InvoicesDetailsTable from "@/app/ui/invoices/detail/table";

export default function Page() {
  const { id } = useParams();
  
  return (
    <div className="w-full">
      <InvoicesDetailsTable id={id as string} />
    </div>
  );
}
