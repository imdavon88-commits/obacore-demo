"use client";
import { createContext, useContext, useState } from "react";

export type Asset = "BTC" | "ETH" | "USDT";
export type Trade = { id: string; side: "buy" | "sell"; asset: Asset; assetAmount: number; usdAmount: number; midPrice: number; spreadUsd: number; feeUsd: number; netUsd: number; at: string };
export const PRICES: Record<Asset, number> = { BTC: 64250, ETH: 2480, USDT: 1 };
export const SPREAD_BPS = 35;
export const DOLLAR_FEE = 1.99;
const r2 = (n: number) => Math.round(n * 100) / 100;
const rA = (a: Asset, n: number) => { const f = 10 ** (a === "BTC" ? 8 : a === "ETH" ? 6 : 2); return Math.round(n * f) / f; };

export function quote(side: "buy" | "sell", asset: Asset, usd: number) {
  const mid = PRICES[asset];
  const spreadUsd = (usd * SPREAD_BPS) / 10000;
  const assetAmount = side === "buy" ? (usd - spreadUsd) / mid : usd / mid;
  const netUsd = side === "buy" ? usd + DOLLAR_FEE : usd - spreadUsd - DOLLAR_FEE;
  return { side, asset, assetAmount: rA(asset, assetAmount), usdAmount: r2(usd), midPrice: mid, spreadBps: SPREAD_BPS, spreadUsd: r2(spreadUsd), feeUsd: DOLLAR_FEE, netUsd: r2(netUsd) };
}

const SEED: Trade[] = [
  { id: "t-1003", side: "buy", asset: "ETH", assetAmount: 0.020089, usdAmount: 50, midPrice: 2480, spreadUsd: 0.18, feeUsd: 1.99, netUsd: 51.99, at: "2026-10-20T15:12:00Z" },
  { id: "t-1002", side: "buy", asset: "BTC", assetAmount: 0.00038778, usdAmount: 25, midPrice: 64250, spreadUsd: 0.09, feeUsd: 1.99, netUsd: 26.99, at: "2026-10-18T17:40:00Z" },
  { id: "t-1001", side: "buy", asset: "USDT", assetAmount: 99.65, usdAmount: 100, midPrice: 1, spreadUsd: 0.35, feeUsd: 1.99, netUsd: 101.99, at: "2026-10-15T19:05:00Z" },
];

type State = { name: string; usd: number; balances: Record<Asset, number>; trades: Trade[]; done: string[] };
const Ctx = createContext<{ s: State; trade: (q: ReturnType<typeof quote>) => string | null; markLesson: (slug: string) => void } | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [s, set] = useState<State>({ name: "Sample User", usd: 1000, balances: { BTC: 0.012, ETH: 0.35, USDT: 250 }, trades: SEED, done: [] });
  function trade(q: ReturnType<typeof quote>) {
    if (q.side === "buy" && q.netUsd > s.usd) return "Not enough sample USD.";
    if (q.side === "sell" && q.assetAmount > s.balances[q.asset]) return `Not enough sample ${q.asset}.`;
    const id = "t-" + Date.now().toString(36);
    set((p) => ({
      ...p,
      usd: r2(p.usd + (q.side === "buy" ? -q.netUsd : q.netUsd)),
      balances: { ...p.balances, [q.asset]: rA(q.asset, p.balances[q.asset] + (q.side === "buy" ? q.assetAmount : -q.assetAmount)) },
      trades: [{ id, ...q, at: new Date().toISOString() }, ...p.trades],
    }));
    return null;
  }
  const markLesson = (slug: string) => set((p) => ({ ...p, done: p.done.includes(slug) ? p.done : [...p.done, slug] }));
  return <Ctx.Provider value={{ s, trade, markLesson }}>{children}</Ctx.Provider>;
}
export function useDemo() { const c = useContext(Ctx); if (!c) throw new Error("no provider"); return c; }
