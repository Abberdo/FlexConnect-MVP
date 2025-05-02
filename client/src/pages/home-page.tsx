import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center md:text-left md:max-w-2xl lg:max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Connect with the right talent <span className="text-secondary">instantly</span>
              </h1>
              <p className="mt-6 text-xl text-white/90 max-w-3xl">
                SASSED's Freelancer Connect Concierge helps businesses find the perfect freelancers and helps freelancers find their ideal clients through personalized matching.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Link href="/auth">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform makes it easy to connect freelancers with clients who need their specific skills.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Create Your Profile</h3>
                <p className="mt-2 text-gray-600">
                  Sign up and create a detailed profile showcasing your skills, experience, and portfolio.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Get Matched</h3>
                <p className="mt-2 text-gray-600">
                  Our smart algorithm matches freelancers with clients based on skills, experience, and project needs.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Collaborate Seamlessly</h3>
                <p className="mt-2 text-gray-600">
                  Communicate, manage projects, and handle payments all in one secure platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  For Freelancers
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Increase your visibility and access job opportunities that align with your unique skill set.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">Get matched with clients who need your specific skills</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">Showcase your portfolio and expertise to potential clients</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">Enjoy consistent work opportunities and reduced job insecurity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">Build your reputation with client reviews and ratings</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  For Clients
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Find skilled freelancers quickly and efficiently for your business projects.
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">Access a pool of verified freelancers with proven skills</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">Save time with our personalized matchmaking system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">Find cost-effective solutions for your business needs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                    <span className="ml-3 text-gray-600">Manage projects and communicate seamlessly on one platform</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform how you work?
            </h2>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
              Join thousands of freelancers and businesses already using SASSED to connect, collaborate, and succeed.
            </p>
            <div className="mt-10">
              <Link href="/auth">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
