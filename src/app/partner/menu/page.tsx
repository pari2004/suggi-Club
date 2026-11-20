'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  tier: 'STANDARD' | 'PREMIUM';
  retailPrice: number;
  isEligible: boolean;
  isAvailable: boolean;
}

const INITIAL_MENU: MenuItem[] = [
  { id: '1', name: 'Cold Smoke Nitro Brew', category: 'Cold Brew', tier: 'STANDARD', retailPrice: 220, isEligible: true, isAvailable: true },
  { id: '2', name: 'Flat White with Oat Milk', category: 'Hot Brew', tier: 'STANDARD', retailPrice: 200, isEligible: true, isAvailable: true },
  { id: '3', name: 'Clarified Cappuccino', category: 'Speciality', tier: 'PREMIUM', retailPrice: 260, isEligible: true, isAvailable: true },
  { id: '4', name: 'Classic Cortado', category: 'Espresso', tier: 'STANDARD', retailPrice: 180, isEligible: true, isAvailable: true },
  { id: '5', name: 'Pour Over (Orange Blossom)', category: 'Manual Brew', tier: 'PREMIUM', retailPrice: 240, isEligible: true, isAvailable: true },
];

export default function PartnerMenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('210');
  const [newItemCategory, setNewItemCategory] = useState('Hot Brew');
  const [newItemTier, setNewItemTier] = useState<'STANDARD' | 'PREMIUM'>('STANDARD');

  const toggleEligibility = (id: string) => {
    setMenu((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isEligible: !item.isEligible } : item))
    );
  };

  const toggleAvailability = (id: string) => {
    setMenu((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      category: newItemCategory,
      tier: newItemTier,
      retailPrice: parseInt(newItemPrice) || 200,
      isEligible: true,
      isAvailable: true,
    };

    setMenu([...menu, newItem]);
    setNewItemName('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#244832]">Menu &amp; Drink Eligibility</h1>
          <p className="text-xs text-[#6B5E55]">
            Configure which specialty drinks can be redeemed by SUGGI CLUB members.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setShowAddModal(true)}>
          + Add New Drink
        </Button>
      </div>

      {/* Menu Table Card */}
      <div className="rounded-3xl border border-[#E8E1D5] bg-[#FFFFFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F0E6] text-[#244832] font-serif uppercase tracking-wider text-[11px] border-b border-[#E8E1D5]">
              <tr>
                <th className="py-3 px-4 font-bold">Drink Name</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Tier</th>
                <th className="py-3 px-4 font-bold">Retail Price</th>
                <th className="py-3 px-4 font-bold">Payout Rate</th>
                <th className="py-3 px-4 font-bold">Pass Status</th>
                <th className="py-3 px-4 font-bold">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E6] text-[#49301F]">
              {menu.map((drink) => (
                <tr key={drink.id} className="hover:bg-[#F5F0E6]/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-sm text-[#244832]">{drink.name}</td>
                  <td className="py-3.5 px-4">{drink.category}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={drink.tier === 'PREMIUM' ? 'gold' : 'default'}>
                      {drink.tier}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-semibold">₹{drink.retailPrice}</td>
                  <td className="py-3.5 px-4 font-bold text-[#244832]">
                    {drink.tier === 'PREMIUM' ? '₹80.00' : '₹50.00'}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleEligibility(drink.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                        drink.isEligible
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {drink.isEligible ? '✓ Eligible' : 'Excluded'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleAvailability(drink.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                        drink.isAvailable
                          ? 'bg-[#244832]/10 text-[#244832] hover:bg-[#244832]/20'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {drink.isAvailable ? 'In Stock' : 'Sold Out'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Drink Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#244832]/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-[#FFFFFF] p-6 shadow-2xl border border-[#E8E1D5] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#244832]">Add Drink to Menu</h3>
            <form onSubmit={handleAddItem} className="space-y-4">
              <Input
                label="Drink Name"
                required
                placeholder="e.g. Vanilla Bean Iced Latte"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#49301F] uppercase">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full h-10 rounded-lg border border-[#E8E1D5] px-3 text-xs"
                  >
                    <option value="Hot Brew">Hot Brew</option>
                    <option value="Cold Brew">Cold Brew</option>
                    <option value="Espresso">Espresso</option>
                    <option value="Manual Brew">Manual Brew</option>
                    <option value="Speciality">Speciality</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#49301F] uppercase">Tier</label>
                  <select
                    value={newItemTier}
                    onChange={(e) => setNewItemTier(e.target.value as 'STANDARD' | 'PREMIUM')}
                    className="w-full h-10 rounded-lg border border-[#E8E1D5] px-3 text-xs"
                  >
                    <option value="STANDARD">STANDARD (₹50 payout)</option>
                    <option value="PREMIUM">PREMIUM (₹80 payout)</option>
                  </select>
                </div>
              </div>
              <Input
                label="Retail Menu Price (₹)"
                type="number"
                required
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
              />
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Add Item
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
