import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RedemptionHistoryItem {
  id: string;
  coffeeName: string;
  cafeName: string;
  neighborhood: string;
  date: string;
  time: string;
  retailPrice: number;
  creditsDeducted: number;
}

const REDEMPTION_HISTORY: RedemptionHistoryItem[] = [
  {
    id: 'rdm-1',
    coffeeName: 'Flat White (Steamed Oat Milk)',
    cafeName: 'Maverick & Farmer Coffee',
    neighborhood: 'Ulsoor / Halasuru',
    date: 'Yesterday, Nov 19, 2026',
    time: '10:14 AM',
    retailPrice: 200,
    creditsDeducted: 1,
  },
  {
    id: 'rdm-2',
    coffeeName: 'Nitro Cold Brew',
    cafeName: 'Araku World Specialty Coffee',
    neighborhood: '12th Main, Indiranagar',
    date: 'Nov 17, 2026',
    time: '4:30 PM',
    retailPrice: 210,
    creditsDeducted: 1,
  },
  {
    id: 'rdm-3',
    coffeeName: 'Attikan Estate Cafe Latte',
    cafeName: 'Blue Tokai Coffee Roasters',
    neighborhood: '80 Feet Rd, Koramangala',
    date: 'Nov 14, 2026',
    time: '9:45 AM',
    retailPrice: 190,
    creditsDeducted: 1,
  },
];

export default function HistoryPage() {
  const totalRetailSaved = REDEMPTION_HISTORY.reduce((acc, item) => acc + item.retailPrice, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#244832]">Redemption History</h1>
        <p className="text-xs text-[#6B5E55]">
          Detailed log of your past coffee redemptions across Bengaluru cafes.
        </p>
      </div>

      {/* Savings Summary Banner */}
      <div className="rounded-2xl border border-[#B99A61]/30 bg-[#F5F0E6] p-5 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B99A61]">
            Cumulative Value
          </span>
          <p className="font-serif text-xl font-bold text-[#244832]">
            ₹{totalRetailSaved} in Retail Coffee Enjoyed
          </p>
        </div>
        <div className="text-right">
          <Badge variant="success">{REDEMPTION_HISTORY.length} Cups Redeemed</Badge>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {REDEMPTION_HISTORY.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-[#E8E1D5] bg-[#FFFFFF] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">☕</span>
                <h3 className="font-serif text-base font-bold text-[#244832]">{item.coffeeName}</h3>
              </div>
              <p className="text-xs text-[#49301F] font-semibold">{item.cafeName}</p>
              <p className="text-[11px] text-[#6B5E55]">{item.neighborhood}</p>
            </div>

            <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#F5F0E6]">
              <span className="inline-block rounded-md bg-[#244832]/10 px-2.5 py-0.5 text-xs font-bold text-[#244832]">
                -{item.creditsDeducted} Credit
              </span>
              <p className="text-[11px] text-[#A89F91] mt-1">Retail value: ₹{item.retailPrice}</p>
              <p className="text-[10px] text-[#6B5E55]">{item.date} · {item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
