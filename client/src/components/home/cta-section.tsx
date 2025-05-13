import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  sassMode: boolean;
}

const CTASection = ({ sassMode }: CTASectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-primary text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-3xl font-extrabold sm:text-4xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          {sassMode
            ? "Ready to Stop Wasting Time on Bad Clients?"
            : "Ready to Transform Your Freelance Career?"
          }
        </motion.h2>
        <motion.p 
          className="max-w-2xl mx-auto text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
        >
          {sassMode
            ? "Sign up now and we'll match you with clients who actually deserve your talent."
            : "Join thousands of freelancers who have found success with our intelligent matching platform."
          }
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: false }}
        >
          <Link href="/auth">
            <Button size="lg" variant="secondary" className="mx-auto">
              Join SASSED Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;