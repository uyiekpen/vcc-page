import { Code, Users, Zap } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 sm:py-32">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-300 ring-1 ring-white/10 hover:ring-white/20">
              Join 500+ developers in our community{" "}
              <Link
                href="/signup"
                className="font-semibold text-purple-400"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Sign up <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Code. Learn. <span className="text-purple-400">Connect.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Join our vibrant coding community where developers of all levels
            come together to learn, build amazing projects, and grow their
            skills through collaboration and mentorship.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-semibold w-[200px]">
              Join the Club
            </Button>
            <Button className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white w-[200px]">
              Learn More
            </Button>
          </div> 
          {/* <WaitlistForm/> */}
          
          <div className="mt-16 flex justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">500+ Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              <span className="text-sm">50+ Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span className="text-sm">Weekly Events</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
