"use client";
import Link from "next/link";
import { LESSONS } from "@/lib/academy";
import { useDemo } from "@/lib/demo";
export default function Academy() {
  const { s } = useDemo();
  return (
    <>
      <h1 className="text-xl font-semibold text-gold mb-2">Academy</h1>
      <p className="text-sm text-cream/50 mb-6">Short lessons for first-time crypto buyers. Not financial advice.</p>
      <div className="space-y-3">
        {LESSONS.map((l, i) => (
          <Link key={l.slug} href={`/academy/${l.slug}/`} className="card block hover:border-gold/40">
            <div className="flex justify-between gap-3">
              <div><p className="text-xs text-cream/40">Lesson {i + 1}</p><p className="font-medium">{l.title}</p><p className="text-xs text-cream/45 mt-1">~{l.minutes} min</p></div>
              {s.done.includes(l.slug) && <span className="sim-badge h-fit">Done</span>}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
