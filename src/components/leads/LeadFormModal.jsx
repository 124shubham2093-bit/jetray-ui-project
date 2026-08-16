import React, { useState, useEffect } from "react";
import { X, Building2, User, Mail, Phone, Tag, Layers, FileText } from "lucide-react";
import { LEAD_STATUSES, LEAD_SOURCES } from "../../data/leads";

export default function LeadFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "Facebook",
    status: "New",
    assignedTo: "John Doe",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        company: initialData.company || "",
        source: initialData.source || "Facebook",
        status: initialData.status || "New",
        assignedTo: initialData.assignedTo || "John Doe",
        notes: initialData.notes || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "Facebook",
        status: "New",
        assignedTo: "John Doe",
        notes: "",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      id: initialData ? initialData.id : Date.now(),
      createdAt: initialData ? initialData.createdAt : new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#131a2e] border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#0e1424]">
          <h3 className="text-white font-bold text-base">
            {isEditing ? "Edit Lead Details" : "Add New Lead"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Lead Name <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2 bg-[#0b0f1e] border border-slate-700/80 rounded-lg px-3 py-2 text-xs focus-within:border-violet-500 transition-colors">
                <User size={14} className="text-slate-500 shrink-0" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Rahul Sharma"
                  className="bg-transparent text-slate-200 placeholder:text-slate-500 outline-none w-full"
                />
              </div>
              {errors.name && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Company Name
              </label>
              <div className="flex items-center gap-2 bg-[#0b0f1e] border border-slate-700/80 rounded-lg px-3 py-2 text-xs focus-within:border-violet-500 transition-colors">
                <Building2 size={14} className="text-slate-500 shrink-0" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="e.g. Acme Corp"
                  className="bg-transparent text-slate-200 placeholder:text-slate-500 outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2 bg-[#0b0f1e] border border-slate-700/80 rounded-lg px-3 py-2 text-xs focus-within:border-violet-500 transition-colors">
                <Mail size={14} className="text-slate-500 shrink-0" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@example.com"
                  className="bg-transparent text-slate-200 placeholder:text-slate-500 outline-none w-full"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2 bg-[#0b0f1e] border border-slate-700/80 rounded-lg px-3 py-2 text-xs focus-within:border-violet-500 transition-colors">
                <Phone size={14} className="text-slate-500 shrink-0" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91 98765 43210"
                  className="bg-transparent text-slate-200 placeholder:text-slate-500 outline-none w-full"
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Source, Status & Assigned To */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Lead Source
              </label>
              <div className="flex items-center gap-2 bg-[#0b0f1e] border border-slate-700/80 rounded-lg px-2.5 py-2 text-xs">
                <Tag size={13} className="text-slate-500 shrink-0" />
                <select
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  className="bg-transparent text-slate-200 outline-none w-full cursor-pointer"
                >
                  {LEAD_SOURCES.map((source) => (
                    <option
                      key={source}
                      value={source}
                      className="bg-[#131a2e] text-slate-200"
                    >
                      {source}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Lead Status
              </label>
              <div className="flex items-center gap-2 bg-[#0b0f1e] border border-slate-700/80 rounded-lg px-2.5 py-2 text-xs">
                <Layers size={13} className="text-slate-500 shrink-0" />
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="bg-transparent text-slate-200 outline-none w-full cursor-pointer"
                >
                  {LEAD_STATUSES.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-[#131a2e] text-slate-200"
                    >
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Assigned To
              </label>
              <div className="flex items-center gap-2 bg-[#0b0f1e] border border-slate-700/80 rounded-lg px-2.5 py-2 text-xs">
                <User size={13} className="text-slate-500 shrink-0" />
                <select
                  value={formData.assignedTo}
                  onChange={(e) =>
                    setFormData({ ...formData, assignedTo: e.target.value })
                  }
                  className="bg-transparent text-slate-200 outline-none w-full cursor-pointer"
                >
                  <option value="John Doe" className="bg-[#131a2e] text-slate-200">
                    John Doe
                  </option>
                  <option
                    value="Jane Smith"
                    className="bg-[#131a2e] text-slate-200"
                  >
                    Jane Smith
                  </option>
                  <option
                    value="Rahul Verma"
                    className="bg-[#131a2e] text-slate-200"
                  >
                    Rahul Verma
                  </option>
                  <option
                    value="Unassigned"
                    className="bg-[#131a2e] text-slate-200"
                  >
                    Unassigned
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Notes & Requirements
            </label>
            <div className="bg-[#0b0f1e] border border-slate-700/80 rounded-lg p-2.5 focus-within:border-violet-500 transition-colors">
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                placeholder="Enter client inquiries, messaging volume requirements, or follow-up notes..."
                className="bg-transparent text-xs text-slate-200 placeholder:text-slate-500 outline-none w-full resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              {isEditing ? "Save Changes" : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
