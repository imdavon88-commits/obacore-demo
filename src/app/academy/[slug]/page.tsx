import { LESSONS } from "@/lib/academy";
import Lesson from "./Lesson";
export function generateStaticParams() { return LESSONS.map((l) => ({ slug: l.slug })); }
export default function Page({ params }: { params: { slug: string } }) { return <Lesson slug={params.slug} />; }
