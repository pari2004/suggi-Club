'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SUBSCRIPTION_PLANS, PlanData } from '@/lib/data/plans';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<PlanData[]>(SUBSCRIPTION_PLANS);
  const [editingPlan, setEditingPlan] = useState<PlanData | null>(null);

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    setPlans((prev) =>
      prev.map((p) => (p.id === editingPlan.id ? editingPlan : p))
    );
    setEditingPlan(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#244832]">Subscription Plans &amp; Pricing</h1>
          <p className="text-xs text-[#6B5E55]">
            Manage subscription tiers, credit allowances, validity durations, and daily redemption caps.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Plan Name</th>
                <th className="py-3 px-4 font-bold">Price (INR)</th>
                <th className="py-3 px-4 font-bold">Credits</th>
                <th className="py-3 px-4 font-bold">Validity</th>
                <th className="py-3 px-4 font-bold">Daily Cap</th>
                <th className="py-3 px-4 font-bold">Tier</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-sm text-[#244832]">{plan.name}</td>
                  <td className="py-3.5 px-4 font-serif text-sm font-bold">₹{plan.priceDisplay}</td>
                  <td className="py-3.5 px-4 font-bold text-[#244832]">{plan.creditsCount} credits</td>
                  <td className="py-3.5 px-4">{plan.validityDays} days</td>
                  <td className="py-3.5 px-4">{plan.dailyCap} cups / day max</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={plan.isPremiumTier ? 'gold' : 'default'}>
                      {plan.isPremiumTier ? 'PREMIUM' : 'STANDARD'}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success">Active</Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setEditingPlan(plan)}
                      className="text-xs font-bold text-[#B99A61] hover:underline cursor-pointer"
                    >
                      Edit Config
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Edit Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#244832]/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] p-6 shadow-2xl border border-[#E8E1D5] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#244832]">
              Edit Plan: {editingPlan.name}
            </h3>
            <form onSubmit={handleSavePlan} className="space-y-4">
              <Input
                label="Price in INR (₹)"
                type="number"
                value={editingPlan.priceDisplay}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    priceDisplay: parseInt(e.target.value) || 0,
                    pricePaise: (parseInt(e.target.value) || 0) * 100,
                  })
                }
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Total Credits"
                  type="number"
                  value={editingPlan.creditsCount}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      creditsCount: parseInt(e.target.value) || 1,
                    })
                  }
                  required
                />
                <Input
                  label="Validity (Days)"
                  type="number"
                  value={editingPlan.validityDays}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      validityDays: parseInt(e.target.value) || 1,
                    })
                  }
                  required
                />
              </div>
              <Input
                label="Daily Max Redemption Cap"
                type="number"
                value={editingPlan.dailyCap}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    dailyCap: parseInt(e.target.value) || 1,
                  })
                }
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setEditingPlan(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
