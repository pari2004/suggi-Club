import React from 'react';
import { Badge } from '@/components/ui/badge';

const PAYMENTS = [
  { id: 'PAY-8921', orderId: 'order_test_8921a', paymentId: 'pay_test_00192', customer: 'Rahul Sharma', plan: 'Coffee 10', amountPaise: 69900, method: 'UPI (Razorpay Test)', status: 'SUCCESS', date: 'Nov 02, 2026' },
  { id: 'PAY-8922', orderId: 'order_test_8922b', paymentId: 'pay_test_00193', customer: 'Neha Venkatesh', plan: 'Weekly Explorer', amountPaise: 24900, method: 'Card (Razorpay Test)', status: 'SUCCESS', date: 'Nov 18, 2026' },
  { id: 'PAY-8923', orderId: 'order_test_8923c', paymentId: 'pay_test_00194', customer: 'Kunal Singhania', plan: 'Coffee 15', amountPaise: 99900, method: 'NetBanking (Razorpay Test)', status: 'SUCCESS', date: 'Oct 28, 2026' },
  { id: 'PAY-8924', orderId: 'order_test_8924d', paymentId: 'pay_test_00195', customer: 'Sana Shaikh', plan: 'Premium Club', amountPaise: 149900, method: 'UPI (Razorpay Test)', status: 'SUCCESS', date: 'Nov 15, 2026' },
];

export default function AdminPaymentsPage() {
  const totalRevenue = PAYMENTS.reduce((acc, p) => acc + p.amountPaise, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#244832]">Payment Transactions Ledger</h1>
          <p className="text-xs text-[#6B5E55]">
            Verified customer payments, gateway order references, and status transitions.
          </p>
        </div>

        <div className="rounded-2xl border border-[#B99A61]/30 bg-[#F5F0E6] px-4 py-2">
          <span className="text-[10px] uppercase font-bold text-[#6B5E55]">Sample Ledger Total:</span>
          <p className="font-serif text-lg font-bold text-[#244832]">₹{totalRevenue / 100}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Internal Payment ID</th>
                <th className="py-3 px-4 font-bold">Provider Order ID</th>
                <th className="py-3 px-4 font-bold">Provider Payment ID</th>
                <th className="py-3 px-4 font-bold">Customer</th>
                <th className="py-3 px-4 font-bold">Plan</th>
                <th className="py-3 px-4 font-bold">Amount</th>
                <th className="py-3 px-4 font-bold">Method</th>
                <th className="py-3 px-4 font-bold">Date</th>
                <th className="py-3 px-4 font-bold">Gateway Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {PAYMENTS.map((payment) => (
                <tr key={payment.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#244832]">{payment.id}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#6B5E55]">{payment.orderId}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#6B5E55]">{payment.paymentId}</td>
                  <td className="py-3.5 px-4 font-bold text-[#244832]">{payment.customer}</td>
                  <td className="py-3.5 px-4 font-medium">{payment.plan}</td>
                  <td className="py-3.5 px-4 font-serif text-sm font-bold text-[#244832]">
                    ₹{payment.amountPaise / 100}
                  </td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{payment.method}</td>
                  <td className="py-3.5 px-4 text-[#6B5E55]">{payment.date}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success">✓ {payment.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
