// PACKAGES
import { cn } from "@/lib/utils";
import { AppWindowIcon, CodeIcon, PackageIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router-dom";

// COMPONENTS
import HomeLink from "@/components/links/home-link";
import { buttonVariants } from "@/components/ui/button";

export default function BentoGrid() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
        <section>
          <div className="py-16">
            <div className="mx-auto max-w-6xl px-6">
              <div className="relative">
                <div className="relative z-10 grid grid-cols-6 gap-3">
                  <div className="relative col-span-full flex overflow-hidden rounded-xl border bg-gradient-to-br from-rose-500 to-yellow-400 p-8 text-background transition-all lg:col-span-2">
                    <div className="relative flex size-fit h-full w-full flex-col items-center justify-center space-y-3">
                      <HomeLink
                        linkHref="/"
                        iconStyle="size-9"
                        textStyle="text-4xl font-bold"
                      />
                      <Link
                        to={"/auth"}
                        className={cn(
                          "text-foreground",
                          buttonVariants({
                            size: "lg",
                            variant: "secondary",
                            className: "rounded-full",
                          }),
                        )}
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                  <div className="relative col-span-full overflow-hidden rounded-xl border p-8 sm:col-span-3 lg:col-span-2">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex size-24 items-center justify-center rounded-full border">
                        <ZapIcon size={45} />
                      </div>
                      <div className="relative z-10 mt-6 space-y-2 text-center">
                        <h1 className="text-xl font-medium">
                          The only code editor you need for programming.
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="relative col-span-full overflow-hidden rounded-xl border p-8 sm:col-span-3 lg:col-span-2">
                    <div className="flex h-full flex-col items-start justify-center gap-2">
                      <span className="flex size-14 items-center justify-center rounded-full border">
                        <PackageIcon />
                      </span>
                      <p className="text-left text-lg">
                        Sharpen your skills in JS, Python, Java, and C++.
                        Practice makes perfect !
                      </p>
                    </div>
                  </div>
                  <div className="relative col-span-full overflow-hidden rounded-xl border p-8 lg:col-span-3">
                    <div className="grid h-full">
                      <div className="relative z-10 flex h-full flex-col justify-between space-y-12 lg:space-y-6">
                        <div className="flex h-full w-full flex-col justify-center space-y-2">
                          <span className="flex size-14 items-center justify-center rounded-full border">
                            <AppWindowIcon />
                          </span>
                          <p className="text-lg">
                            Designed with simplicity in mind, Avocoding features
                            a clean and intuitive layout that makes coding
                            accessible for beginners.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative col-span-full overflow-hidden rounded-xl border bg-gradient-to-br from-rose-500 to-yellow-400 p-8 text-background lg:col-span-3">
                    <div className="grid h-full">
                      <div className="relative z-10 flex h-full w-full flex-col justify-between space-y-12 lg:space-y-6">
                        <div className="flex h-full w-full flex-col justify-center space-y-2">
                          <CodeIcon size={50} />
                          <p className="text-lg font-medium">
                            Run programs interactively and provide inputs in
                            real-time, making it easier to test and debug code.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
