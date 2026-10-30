"use client";
import Link from "next/link";
import { LESSONS } from "@/lib/academy";
import { useDemo } from "@/lib/demo";
export default function Lesson({ slug }: { slug: string }) {
  const { s, markLesson } = useDemo();
  const idx = LESSONS.findIndex((l) => l.slug === slug);
  const lesson = LESSONS[idx];
  if (!lesson) return <p className="text-sm text-cream/50">Lesson not found.</p>;
  const next = LESSONS[idx + 1];
  const cta = "cta" in lesson ? lesson.cta : null;
  return (
    <>
      <Link href="/academy/" className="text-xs text-gold hover:underline">← Academy</Link>
      <h1 className="text-xl font-semibold text-gold mt-2">{lesson.title}</h1>
      <p className="text-xs text-cream/40 mb-4">~{lesson.minutes} min</p>
      <div className="card space-y-4">
        {lesson.body.map((p, i) => <p key={i} className="text-sm text-cream/75 leading-relaxed">{p}</p>)}
        <p className="text-sm text-gold border-t border-gold/15 pt-3">Takeaway: {lesson.takeaway}</p>
        {s.done.includes(slug) ? <p className="text-xs text-gold/70">Lesson marked complete.</p>
          : <button className="btn-outline" onClick={() => markLesson(slug)}>Mark lesson complete</button>}
        {cta && <Link href="/buy/" className="btn-gold">{cta.label}</Link>}
        {next && <Link href={`/academy/${next.slug}/`} className="btn-outline">Next: {next.title}</Link>}
      </div>
    </>
  );
}
