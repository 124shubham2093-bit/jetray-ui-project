import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { INITIAL_LEADS } from "../data/leads";
import {
  LeadSummaryCards,
  LeadFilters,
  LeadTable,
  LeadFormModal,
  LeadDetailsModal,
  LeadDeleteModal,
} from "../components/leads";

export default function LeadsPage() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [viewingLead, setViewingLead] = useState(null);
  const [deletingLead, setDeletingLead] = useState(null);

  // Filtered Leads Calculation
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const search = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !search ||
        lead.name?.toLowerCase().includes(search) ||
        lead.email?.toLowerCase().includes(search) ||
        lead.phone?.toLowerCase().includes(search) ||
        lead.company?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "ALL" || lead.status === statusFilter;

      const matchesSource =
        sourceFilter === "ALL" || lead.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, searchTerm, statusFilter, sourceFilter]);

  // Paginated Leads
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredLeads.slice(startIndex, startIndex + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  // Handlers
  const handleOpenAddModal = () => {
    setEditingLead(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (lead) => {
    setEditingLead(lead);
    setIsFormModalOpen(true);
  };

  const handleOpenViewModal = (lead) => {
    setViewingLead(lead);
  };

  const handleOpenDeleteModal = (lead) => {
    setDeletingLead(lead);
  };

  const handleFormSubmit = (formData) => {
    if (editingLead) {
      setLeads((prev) =>
        prev.map((l) => (l.id === formData.id ? { ...l, ...formData } : l))
      );
      if (viewingLead && viewingLead.id === formData.id) {
        setViewingLead({ ...viewingLead, ...formData });
      }
    } else {
      setLeads((prev) => [formData, ...prev]);
      setCurrentPage(1);
    }
    setIsFormModalOpen(false);
    setEditingLead(null);
  };

  const handleConfirmDelete = (leadId) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    setDeletingLead(null);
    if (viewingLead && viewingLead.id === leadId) {
      setViewingLead(null);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setSourceFilter("ALL");
    setCurrentPage(1);
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-bold tracking-tight">Leads</h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Manage and track your incoming leads.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-violet-600 hover:bg-violet-500 transition-colors text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 self-start sm:self-auto shadow-md"
        >
          <Plus size={15} /> Add New Lead
        </button>
      </div>

      {/* Metric Summary Cards */}
      <LeadSummaryCards leads={leads} />

      {/* Filter and Search Bar */}
      <LeadFilters
        searchTerm={searchTerm}
        setSearchTerm={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        setStatusFilter={(val) => {
          setStatusFilter(val);
          setCurrentPage(1);
        }}
        sourceFilter={sourceFilter}
        setSourceFilter={(val) => {
          setSourceFilter(val);
          setCurrentPage(1);
        }}
        pageSize={pageSize}
        setPageSize={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        onResetFilters={handleResetFilters}
        totalFiltered={filteredLeads.length}
        totalAll={leads.length}
      />

      {/* Main Leads Table */}
      <LeadTable
        leads={paginatedLeads}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        totalLeads={filteredLeads.length}
        onViewLead={handleOpenViewModal}
        onEditLead={handleOpenEditModal}
        onDeleteLead={handleOpenDeleteModal}
      />

      {/* Form Modal (Add / Edit) */}
      <LeadFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingLead(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingLead}
      />

      {/* Details Modal */}
      <LeadDetailsModal
        isOpen={Boolean(viewingLead)}
        onClose={() => setViewingLead(null)}
        lead={viewingLead}
        onEdit={(lead) => {
          setViewingLead(null);
          handleOpenEditModal(lead);
        }}
      />

      {/* Delete Confirmation Modal */}
      <LeadDeleteModal
        isOpen={Boolean(deletingLead)}
        onClose={() => setDeletingLead(null)}
        onConfirm={handleConfirmDelete}
        lead={deletingLead}
      />
    </div>
  );
}
