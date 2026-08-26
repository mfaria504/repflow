import Link from "next/link";

function Message({ hidden = false }: { hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden}
      className="mr-20 shrink-0 whitespace-nowrap text-sm font-medium"
    >
      <span className="font-semibold">
        Now accepting manufacturer rep customers.
      </span>{" "}
      <span className="text-white/85">
        2027 is shaping up to be the strongest year reps have seen in a
        decade. The only question is whether your technology is ready for
        it.
      </span>
    </span>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="bg-cobalt text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-2.5">
        <div className="min-w-0 flex-1 overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee">
            <Message />
            <Message hidden />
          </div>
        </div>
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
