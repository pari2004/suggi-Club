'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'MANAGER' | 'BARISTA';
  isActive: boolean;
  addedAt: string;
}

const INITIAL_STAFF: StaffMember[] = [
  { id: '1', name: 'Ashish D', email: 'owner@maverickcoffee.com', role: 'OWNER', isActive: true, addedAt: 'Nov 01, 2026' },
  { id: '2', name: 'Rohan (Lead Barista)', email: 'rohan.barista@maverickcoffee.com', role: 'BARISTA', isActive: true, addedAt: 'Nov 04, 2026' },
  { id: '3', name: 'Kavita M', email: 'kavita.manager@maverickcoffee.com', role: 'MANAGER', isActive: true, addedAt: 'Nov 10, 2026' },
];

export default function PartnerStaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'BARISTA' | 'MANAGER'>('BARISTA');

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    setStaffList([
      ...staffList,
      {
        id: Date.now().toString(),
        name: newName.trim(),
        email: newEmail.trim(),
        role: newRole,
        isActive: true,
        addedAt: 'Today',
      },
    ]);

    setNewName('');
    setNewEmail('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#244832]">Staff &amp; Barista Accounts</h1>
          <p className="text-xs text-[#6B5E55]">
            Grant cafe staff access to the QR scanner and counter validation portal.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setShowModal(true)}>
          + Invite New Barista
        </Button>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Staff Member</th>
                <th className="py-3 px-4 font-bold">Role</th>
                <th className="py-3 px-4 font-bold">Email</th>
                <th className="py-3 px-4 font-bold">Permissions</th>
                <th className="py-3 px-4 font-bold">Added Date</th>
                <th className="py-3 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {staffList.map((member) => (
                <tr key={member.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#244832]">{member.name}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={member.role === 'OWNER' ? 'gold' : 'default'}>
                      {member.role}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{member.email}</td>
                  <td className="py-3.5 px-4">
                    {member.role === 'BARISTA' ? 'QR Scanner Only' : 'Full Cafe Admin'}
                  </td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{member.addedAt}</td>
                  <td className="py-3.5 px-4">
                    <span className="rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-[10px] font-bold">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#244832]/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] p-6 shadow-2xl border border-[#E8E1D5] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#244832]">Add Cafe Staff</h3>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <Input
                label="Staff Full Name"
                required
                placeholder="e.g. Vikram S"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                required
                placeholder="vikram@yourcafe.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#49301F] uppercase">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as 'BARISTA' | 'MANAGER')}
                  className="w-full h-10 rounded-lg border border-[#E8E1D5] px-3 text-xs"
                >
                  <option value="BARISTA">BARISTA (Counter QR Scanner Only)</option>
                  <option value="MANAGER">MANAGER (Scanner + Menu + Reports)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Create Staff Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
