// PACKAGES
import { ChevronRightIcon, GithubIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="flex min-h-[94vh] flex-col items-center justify-center space-y-6">
      <div className="">
        <a
          className="group inline-flex items-center rounded-full border border-white/10 bg-white/10 p-1 ps-4 shadow-md hover:bg-white/10 focus:bg-white/10 focus:outline-none"
          href="../figma.html"
        >
          <p className="me-2 text-xs font-medium capitalize text-white">
            we are proudly open sourced
          </p>
          <span className="flex items-center justify-center gap-x-2 rounded-full bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white group-hover:bg-white/10">
            <GithubIcon size={18} />
          </span>
        </a>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="block text-4xl font-medium text-gray-200 sm:text-5xl md:text-6xl lg:text-7xl">
          Now it's easier than ever to build products
        </h1>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-lg text-white/70">
          Preline is a large open-source project, crafted with Tailwind CSS
          framework by Hmlstream.
        </p>
      </div>

      <div className="text-center">
        <Link
          className="inline-flex items-center justify-center gap-x-2 rounded-full border border-transparent bg-gradient-to-tl from-blue-600 to-violet-600 px-6 py-3 text-center text-base font-medium text-white shadow-lg shadow-transparent hover:from-violet-600 hover:to-blue-600 hover:shadow-blue-700/50 focus:shadow-blue-700/50 focus:outline-none"
          to="/auth"
        >
          Get started
          <ChevronRightIcon size={22} />
        </Link>
      </div>
    </div>
  );
}
