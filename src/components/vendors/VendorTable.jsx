import React from "react";
import { Eye, Search } from "lucide-react";
import { vendors } from "../../data/vendors";

export default function VendorTable() {
  return (
    <div className="bg-[#131a2e] border border-slate-800/60 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          Show <select className="bg-[#0b0f1e] border border-slate-800 rounded px-2 py-1 text-slate-300"><option>100</option></select> entries
        </div>
        <div className="flex items-center gap-2 bg-[#0b0f1e] border border-slate-800 rounded-lg px-3 py-1.5">
          <Search size={13} className="text-slate-500" />
          <input placeholder="Search" className="bg-transparent text-xs text-slate-300 outline-none" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead>
            <tr className="bg-emerald-500 text-[#0b0f1e] text-[10px] font-bold tracking-wide uppercase">
              <th className="px-4 py-2.5">Vendor Title</th>
              <th className="px-4 py-2.5">Quick Actions</th>
              <th className="px-4 py-2.5">Admin User Name</th>
              <th className="px-4 py-2.5">Email</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5">Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.name} className="border-t border-slate-800/60 text-xs align-top">
                <td className="px-4 py-3 text-teal-400 font-semibold">{v.name}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1.5">
                    <button className="bg-violet-600 text-white text-[10px] font-medium px-2.5 py-1 rounded-full">Login</button>
                    <button className="bg-violet-600 text-white text-[10px] font-medium px-2.5 py-1 rounded-full">Details and Subscription</button>
                    <button className="bg-violet-600 text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 justify-center"><Eye size={10} /> Quick View</button>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-300">{v.admin}<br /><span className="text-slate-500">{v.user}</span></td>
                <td className="px-4 py-3 text-slate-400">{v.email}</td>
                <td className="px-4 py-3"><span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">{v.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5 max-w-[160px]">
                    <button className="bg-sky-600/20 text-sky-400 text-[10px] font-medium px-2 py-1 rounded">Edit</button>
                    <button className="bg-amber-500 text-slate-900 text-[10px] font-medium px-2 py-1 rounded">Soft Delete</button>
                    <button className="bg-rose-600 text-white text-[10px] font-medium px-2 py-1 rounded">Delete</button>
                    <button className="bg-violet-600 text-white text-[10px] font-medium px-2 py-1 rounded">Media &amp; Files</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-xs text-slate-500">
        <span>Showing 1 to {vendors.length} of {vendors.length} entries</span>
        <div className="flex items-center gap-1">
          <button className="px-2.5 py-1 rounded bg-[#0b0f1e] border border-slate-800">Previous</button>
          <button className="px-2.5 py-1 rounded bg-emerald-500 text-slate-900 font-semibold">1</button>
          <button className="px-2.5 py-1 rounded bg-[#0b0f1e] border border-slate-800">Next</button>
        </div>
      </div>
    </div>
  );
}
