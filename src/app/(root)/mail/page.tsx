import { WaitlistForm } from "@/app/component/ui/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Something Amazing is Coming
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're building the next generation platform that will revolutionize
            how you work. Join our waitlist to get early access and be part of
            the journey.
          </p>
        </div>

        <WaitlistForm />

        {/* <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">🚀</div>
            <h3 className="font-semibold">Early Access</h3>
            <p className="text-sm text-gray-600">
              Be among the first to experience our platform
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">💎</div>
            <h3 className="font-semibold">Exclusive Features</h3>
            <p className="text-sm text-gray-600">
              Access to premium features at launch
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">📧</div>
            <h3 className="font-semibold">Stay Updated</h3>
            <p className="text-sm text-gray-600">
              Regular updates on our development progress
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
