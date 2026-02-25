import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Shield,
  Code,
  Globe,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Free-Tier Mastery",
    description:
      "Why pay for hosting? I'll move your stack to 100% free-forever tiers on Cloudflare, GitHub, and Oracle Cloud.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "The $0 Waste Audit",
    description:
      "I identify "zombie" resources and over-provisioned instances that are quietly draining your monthly budget.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Serverless-First Design",
    description:
      "Scalable architecture that costs $0 when you have no traffic, and cents when you do. No more idle server bills.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Code,
    title: "Open-Source Swaps",
    description:
      "Replace expensive $20/mo SaaS subscriptions with self-hosted or generous free-tier alternatives that do the same job.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Credit Maximization",
    description:
      "Learn how to unlock $1,000s in AWS, Azure, and GCP startup credits even as a solo founder or consultant.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Sparkles,
    title: "Billing Guardrails",
    description:
      "Never get a "surprise" $5,000 bill again. I set up hard limits and automated alerts that actually work.",
    gradient: "from-pink-500 to-rose-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              build with AI
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Powerful features designed to help you ship AI-powered products faster
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group relative p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
