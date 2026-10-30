"use client";
import { useDemo } from "@/lib/demo";
export default function History() {
  const { s } = useDemo();
  return (
    <>
      <h1 className="text-xl font-semibold text-gold mb-4">History</h1>
      <div className="space-y-2">
        {s.trades.map((t) => (
          <div key={t.id} className="card text-sm">
            <div className="flex justify-between"><span className="text-gold font-medium uppercase">{t.side} {t.asset}</span><span className="text-cream/45 text-xs">{new Date(t.at).toLocaleDateString()}</span></div>
            <div className="flex justify-between mt-1 text-cream/70"><span>{t.assetAmount} {t.asset}</span><span>${t.netUsd.toFixed(2)} net</span></div>
            <p className="text-xs text-cream/40 mt-1">Mid ${t.midPrice.toLocaleString()} · spread ${t.spreadUsd.toFixed(2)} · fee ${t.feeUsd.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </>
  );
}
