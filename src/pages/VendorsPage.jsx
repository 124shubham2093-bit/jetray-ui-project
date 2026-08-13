import React from "react";
import VendorTable from "../components/vendors/VendorTable";

export default function VendorsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white text-xl font-bold">Vendors</h2>
        <button className="bg-violet-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">Add New Vendor</button>
      </div>
      <VendorTable />
    </div>
  );
}
