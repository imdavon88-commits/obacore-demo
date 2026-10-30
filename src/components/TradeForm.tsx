"use client";
import { useState } from "react";
import Link from "next/link";
import { useDemo, quote, type Asset } from "@/lib/demo";

export default function TradeForm({ side }: { side: "buy" | "sell" }) {
  const { s, trade } = useDemo();
  const [asset, setAsset] = useState<Asset>("BTC");
  const [usd, setUsd] = useState("50");
  const [q, setQ] = useState<ReturnType<typeof quote> | null>(null);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const title = side === "buy" ? "Buy" : "Sell";

  if (done) return (
    <div className="card text-center space-y-3">
      <span className="sim-badge">Simulated fill</span>
      <h1 className="text-xl font-semibold text-gold">Simulated {title.toLowerCase()} confirmed</h1>
      <p className="text-sm text-cream/60">Sample receipt added. No payment, no blockchain transaction.</p>
      <Link href="/history/" className="btn-gold">View history</Link>
      <Link href="/" className="btn-outline">Back to wallet</Link>
    </div>
  );

  return (
    <>
      <h1 className="text-xl font-semibold text-gold mb-1">{title}</h1>
      <p className="text-sm text-cream/50 mb-4">Fee shown before you confirm · sample data</p>
      <div className="card space-y-4">
        <div>
          <label className="label">Asset</label>
          <div className="flex gap-2">
            {(["BTC", "ETH", "USDT"] as const).map((a) => (
              <button key={a} type="button" onClick={() => { setAsset(a); setQ(null); }}
                className={`flex-1 rounded-lg py-2 text-sm font-medium ${asset === a ? "bg-gold text-ink" : "border border-gold/30 text-gold"}`}>{a}</button>
            ))}
          </div>
          {side === "sell" && <p className="text-xs text-cream/45 mt-2">You hold {s.balances[asset]} {asset}</p>}
        </div>
        <div>
          <label className="label">USD amount</label>
          <input className="input" type="number" min="1" step="0.01" value={usd} onChange={(e) => { setUsd(e.target.value); setQ(null); }} />
          <div className="flex gap-2 mt-2">
            {[25, 50, 100].map((n) => (
              <button key={n} type="button" className="text-xs text-gold border border-gold/30 rounded-full px-2 py-1" onClick={() => { setUsd(String(n)); setQ(null); }}>${n}</button>
            ))}
          </div>
        </div>
        {err && <p className="text-sm text-red-400">{err}</p>}
        {!q ? (
          <button className="btn-gold" onClick={() => { setErr(""); const n = Number(usd); if (!(n > 0)) return setErr("Enter an amount."); setQ(quote(side, asset, n)); }}>Get quote</button>
        ) : (
          <div className="space-y-3 border-t border-gold/15 pt-4">
            <Row l="Mid price" v={`$${q.midPrice.toLocaleString()}`} />
            <Row l={`Spread (${q.spreadBps} bps)`} v={`$${q.spreadUsd.toFixed(2)}`} />
            <Row l="Dollar fee" v={`$${q.feeUsd.toFixed(2)}`} />
            {side === "buy" ? (<>
              <Row l="You receive" v={`${q.assetAmount} ${q.asset}`} hi />
              <Row l="You pay (net)" v={`$${q.netUsd.toFixed(2)}`} hi />
            </>) : (<>
              <Row l="You sell" v={`${q.assetAmount} ${q.asset}`} hi />
              <Row l="You receive (net)" v={`$${q.netUsd.toFixed(2)}`} hi />
            </>)}
            <button className="btn-gold" onClick={() => { const e = trade(q); if (e) setErr(e); else setDone(true); }}>Confirm simulated {side}</button>
            <button className="btn-outline" onClick={() => setQ(null)}>Edit</button>
          </div>
        )}
      </div>
    </>
  );
}
function Row({ l, v, hi }: { l: string; v: string; hi?: boolean }) {
  return <div className="flex justify-between text-sm"><span className="text-cream/55">{l}</span><span className={hi ? "text-gold font-semibold" : ""}>{v}</span></div>;
}
