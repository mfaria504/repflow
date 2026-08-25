import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="bg-cobalt text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-6 py-2.5 text-center sm:flex-row sm:gap-4">
        <p className="text-sm font-medium leading-snug">
          <span className="font-semibold">
            Now accepting manufacturer rep customers.
          </span>{" "}
          <span className="text-white/85">
            2027 is shaping up to be the strongest year reps have seen in a
            decade — the only question is whether you&apos;re running the
            system built for it.
          </span>
        </p>
        <Link
          href="/#assessment"
          className="shrink-0 rounded-sm border border-white/40 px-3 py-1 text-xs font-semibold text-white transition-[transform,background-color,border-color] duration-150 hover:-translate-y-px hover:border-white hover:bg-white/10 active:translate-y-0 active:scale-[0.97]"
        >
          Reach Out Now
        </Link>
      </div>
    </div>
  );
}
