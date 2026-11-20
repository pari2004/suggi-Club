import React from 'react';

const AUDIT_LOGS = [
  { id: 'LOG-991', action: 'CAFE_APPLICATION_APPROVED', actor: 'admin@suggiglobal.com', entityType: 'Cafe', entityId: 'cafe-maverick-1', ip: '106.51.24.12', time: 'Nov 20, 2026, 04:12 PM', details: 'Approved Maverick & Farmer Ulsoor partner onboarding' },
  { id: 'LOG-990', action: 'PAYOUT_BATCH_SETTLED', actor: 'finance@suggiglobal.com', entityType: 'Payout', entityId: 'PAY-2026-W46', ip: '106.51.24.12', time: 'Nov 17, 2026, 11:30 AM', details: 'Reconciled ₹6,440 payout with UTR HDFCR5202611170094182' },
  { id: 'LOG-989', action: 'PLAN_PRICE_UPDATED', actor: 'admin@suggiglobal.com', entityType: 'SubscriptionPlan', entityId: 'plan-weekly', ip: '106.51.24.12', time: 'Nov 15, 2026, 02:20 PM', details: 'Weekly Explorer price set to ₹249 (3 credits)' },
  { id: 'LOG-988', action: 'REDEMPTION_ATOMIC_LOCK', actor: 'SYSTEM', entityType: 'RedemptionToken', entityId: 'sgc_token_hash_812', ip: 'internal', time: 'Nov 14, 2026, 10:14 AM', details: 'Atomic debit executed: -1 credit on subscription SUB-401' },
];

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Security &amp; Operations Audit Trail</h1>
        <p className="text-xs text-[#6B5E55]">
          Immutable log of all administrative actions, partner payouts, and security events.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Log ID</th>
                <th className="py-3 px-4 font-bold">Action</th>
                <th className="py-3 px-4 font-bold">Actor</th>
                <th className="py-3 px-4 font-bold">Entity</th>
                <th className="py-3 px-4 font-bold">Details</th>
                <th className="py-3 px-4 font-bold">IP Address</th>
                <th className="py-3 px-4 font-bold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#244832]">{log.id}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-xs">
                    <span className="rounded-md bg-[#244832]/10 px-2 py-0.5 text-[#244832]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{log.actor}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{log.entityType} ({log.entityId})</td>
                  <td className="py-3.5 px-4 max-w-xs text-[#6B5E55]">{log.details}</td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-[#A89F91]">{log.ip}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
