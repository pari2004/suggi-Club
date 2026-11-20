'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Application {
  id: string;
  cafeName: string;
  neighborhood: string;
  address: string;
  ownerName: string;
  contactEmail: string;
  phone: string;
  fssaiNumber: string;
  gstin?: string;
  bankAccount: string;
  bankIfsc: string;
  submittedAt: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
}

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-501',
    cafeName: 'Humble Bean Specialty Coffee',
    neighborhood: 'HSR Layout, Sector 2',
    address: '204, 27th Main Rd, Sector 2, HSR Layout, Bengaluru 560102',
    ownerName: 'Sunil Kumar',
    contactEmail: 'sunil@humblebeancoffee.in',
    phone: '+91 97410 88992',
    fssaiNumber: '11223344556677',
    gstin: '29ABCDE1234F1Z5',
    bankAccount: 'ICICI Bank · ••••••4812',
    bankIfsc: 'ICIC0000182',
    submittedAt: 'Nov 19, 2026, 03:15 PM',
    status: 'PENDING_REVIEW',
  },
];

export default function AdminCafeApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);

  const handleDecision = (id: string, decision: 'APPROVED' | 'REJECTED') => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: decision } : app))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Partner Cafe Applications</h1>
        <p className="text-xs text-[#6B5E55]">
          Inspect business credentials, FSSAI certificates, and approve cafes into the SUGGI CLUB network.
        </p>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] p-6 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E1D5] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-[#244832]">{app.cafeName}</h3>
                  <Badge
                    variant={
                      app.status === 'APPROVED'
                        ? 'success'
                        : app.status === 'REJECTED'
                        ? 'destructive'
                        : 'warning'
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
                <p className="text-xs text-[#B99A61] font-semibold">{app.neighborhood} · Bengaluru</p>
              </div>
              <span className="text-[11px] text-[#A89F91]">Submitted {app.submittedAt}</span>
            </div>

            {/* Application Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#49301F]">
              <div className="space-y-1.5">
                <span className="font-bold text-[#244832] uppercase tracking-wider text-[10px]">
                  Owner &amp; Contact
                </span>
                <p><strong>Name:</strong> {app.ownerName}</p>
                <p><strong>Email:</strong> {app.contactEmail}</p>
                <p><strong>Phone:</strong> {app.phone}</p>
                <p><strong>Address:</strong> {app.address}</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-[#244832] uppercase tracking-wider text-[10px]">
                  Regulatory Compliance
                </span>
                <p><strong>FSSAI License:</strong> {app.fssaiNumber} (Verified)</p>
                <p><strong>GSTIN:</strong> {app.gstin || 'Not Provided'}</p>
                <p><strong>Specialty Grade:</strong> Estate Single Origin Arabica confirmed</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-[#244832] uppercase tracking-wider text-[10px]">
                  Payout Bank Details
                </span>
                <p><strong>Account:</strong> {app.bankAccount}</p>
                <p><strong>IFSC Code:</strong> {app.bankIfsc}</p>
                <p><strong>Settlement Rate:</strong> Standard ₹50 / Premium ₹80</p>
              </div>
            </div>

            {/* Decision Actions */}
            {app.status === 'PENDING_REVIEW' && (
              <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDecision(app.id, 'REJECTED')}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  ✕ Reject Application
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleDecision(app.id, 'APPROVED')}
                  className="font-bold"
                >
                  ✓ Approve Cafe into SUGGI CLUB
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
