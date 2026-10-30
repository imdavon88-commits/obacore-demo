"use client";
import Link from "next/link";
import { useDemo, PRICES } from "@/lib/demo";

export default function Wallet() {
  const { s } = useDemo();
  const assets = (["BTC", "ETH", "USDT"] as const).map((a) => ({ a, amt: s.balances[a], usd: s.balances[a] * PRICES[a] }));
  const crypto = assets.reduce((t, x) => t + x.usd, 0);
  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h1 className="text-xl font-semibold text-gold">Wallet</h1>
          <p className="text-sm text-cream/50">Hi, {s.name}</p>
        </div>
        <span className="sim-badge">Simulated</span>
      </div>
      <div className="card mb-4">
        <p className="label">Total (simulated)</p>
        <p className="text-3xl font-semibold">${(crypto + s.usd).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        <p className="text-xs text-cream/40 mt-1">Sample USD ${s.usd.toFixed(2)} · Crypto ~${crypto.toFixed(2)}</p>
      </div>
      <div className="space-y-2 mb-6">
        {assets.map((x) => (
          <div key={x.a} className="card flex items-center justify-between">
            <div><p className="font-medium text-gold">{x.a}</p><p className="text-xs text-cream/45">Mid ${PRICES[x.a].toLocaleString()}</p></div>
            <div className="text-right"><p className="font-medium">{x.amt}</p><p className="text-xs text-cream/45">≈ ${x.usd.toFixed(2)}</p></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Link href="/buy/" className="btn-gold">Buy</Link>
        <Link href="/sell/" className="btn-outline">Sell</Link>
      </div>
      <Link href="/academy/" className="btn-outline text-xs mt-3">Academy: learn the basics</Link>
    </>
  );
}
