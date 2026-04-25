import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Droplets,
  Globe,
  Heart,
  Leaf,
  Quote,
  ShieldAlert,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import CauseCard from "../components/CauseCard";
import SectionHeading from "../components/SectionHeading";
import StatBadge from "../components/StatBadge";
import { causes } from "../data/causes";
import { testimonials } from "../data/testimonials";
import { useSubmitNewsletter } from "../hooks/useQueries";

const featuredCauses = causes.slice(0, 3);

const stats = [
  {
    value: "10,000+",
    label: "Lives Touched",
    description: "Real people, real change — across 5 continents.",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    value: "50+",
    label: "Active Projects",
    description: "Ongoing initiatives in education, health, and environment.",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    value: "5",
    label: "Countries Served",
    description: "Working from Uganda to Bangladesh, and beyond.",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    value: "$2M+",
    label: "Funds Raised",
    description: "Every dollar directed to communities who need it most.",
    icon: <Users className="w-4 h-4" />,
  },
];

const programAreas = [
  { icon: BookOpen, label: "Education" },
  { icon: Leaf, label: "Environment" },
  { icon: Heart, label: "Healthcare" },
  { icon: Droplets, label: "Clean Water" },
  { icon: ShieldAlert, label: "Disaster Relief" },
];

const missionPoints = [
  "Rooted in respect for local knowledge and self-determination",
  "Transparent with every dollar — full annual impact reports",
  "Long-term partnerships, not one-time aid drops",
  "Driven by communities, validated by outcomes",
];

export default function Home() {
  const [email, setEmail] = useState("");
  const submitNewsletter = useSubmitNewsletter();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    submitNewsletter.mutate(email.trim(), {
      onSuccess: () => {
        toast.success("You're in! Watch your inbox for our next update.");
        setEmail("");
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <div data-ocid="home.page">
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-community.dim_1400x700.jpg"
            alt="Community volunteers working together"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/65 via-foreground/45 to-foreground/20" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-foreground/80 mb-5 border border-primary-foreground/30 px-3 py-1.5 rounded-full backdrop-blur-sm bg-primary-foreground/10">
              Working Globally Since 2013
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-primary-foreground leading-[1.15] mb-5">
              Empowering Communities,{" "}
              <em className="not-italic text-primary">Fostering Hope</em>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-9 max-w-xl">
              Working globally to create sustainable change through education
              and empowerment initiatives that transform lives from the ground
              up.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/donations" data-ocid="home.hero_donate_button">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg transition-smooth"
                >
                  Donate Now
                  <Heart className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/volunteers" data-ocid="home.hero_volunteer_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/15 backdrop-blur-sm transition-smooth"
                >
                  Volunteer With Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Program area pills — bottom of hero */}
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-2">
              {programAreas.map((area) => (
                <span
                  key={area.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm bg-card/80 border border-border shadow-sm text-foreground"
                >
                  <area.icon className="w-3.5 h-3.5 text-primary" />
                  {area.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact Stats ── */}
      <section className="py-16 bg-primary" data-ocid="home.stats_section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
              Our Recent Impact
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mt-2">
              Our key statistics in the summary impact.
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                data-ocid={`home.stat.${i + 1}`}
              >
                <StatBadge {...stat} light />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Causes ── */}
      <section className="py-20 bg-background" data-ocid="home.causes_section">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Human-Centered Projects"
            title="Our Active Causes"
            subtitle="Every project is led by and for the communities we serve. Choose a cause and make your impact felt today."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredCauses.map((cause, i) => (
              <motion.div
                key={cause.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.45 }}
              >
                <CauseCard cause={cause} index={i + 1} />
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/causes" data-ocid="home.view_all_causes_button">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 font-semibold transition-smooth"
              >
                See All Causes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mission Statement ── */}
      <section
        className="py-20 bg-muted/40 relative overflow-hidden"
        data-ocid="home.mission_section"
      >
        {/* Decorative leaf shape */}
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 bottom-0 w-48 h-48 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Our Mission
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">
                We believe every human life deserves dignity, opportunity, and
                care.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                HopeBridge is a global non-profit dedicated to eliminating
                extreme poverty and injustice through community-led education,
                healthcare, and environmental programs. We don't parachute in
                with solutions — we listen, learn, and build alongside the
                people we serve.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                Since 2013, we have partnered with over 250 communities across 5
                countries, always keeping human dignity — not donor optics — at
                the center of everything we do.
              </p>
              <ul className="space-y-3">
                {missionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/assets/generated/hero-community.dim_1400x700.jpg"
                  alt="HopeBridge team and community members"
                  className="w-full h-72 lg:h-96 object-cover object-center"
                  loading="lazy"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-md">
                <p className="font-display text-2xl font-bold text-primary">
                  12+ Years
                </p>
                <p className="text-xs text-muted-foreground">
                  of community impact
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        className="py-20 bg-background"
        data-ocid="home.testimonials_section"
      >
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Voices of Change"
            title="Human-Centered Stories"
            subtitle="Hear from the communities, volunteers, and partners who make our work possible."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: i < 2 ? 20 : -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.45 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-card flex flex-col gap-4"
                data-ocid={`home.testimonial.${i + 1}`}
              >
                <Quote className="w-8 h-8 text-primary/30 shrink-0" />
                <blockquote className="text-sm md:text-base text-foreground leading-relaxed flex-1 italic">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-semibold text-primary text-sm shrink-0">
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.title} · {t.location}
                    </p>
                  </div>
                  {t.causeRelated && (
                    <span className="ml-auto shrink-0 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {t.causeRelated}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-16 bg-accent" data-ocid="home.cta_section">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-accent-foreground/85 mb-8 max-w-xl mx-auto leading-relaxed">
              Whether you give $5 or $5,000, volunteer a weekend or a year, your
              contribution creates ripples that transform lives.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/donations" data-ocid="home.cta_donate_button">
                <Button
                  size="lg"
                  className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 font-bold shadow-md transition-smooth"
                >
                  Donate Today
                </Button>
              </Link>
              <Link to="/volunteers" data-ocid="home.cta_volunteer_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent-foreground/50 text-accent-foreground hover:bg-accent-foreground/10 transition-smooth"
                >
                  Become a Volunteer
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter Signup ── */}
      <section
        className="py-16 bg-card border-t border-border"
        data-ocid="home.newsletter_section"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto text-center"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Stay Connected
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Get Stories of Impact in Your Inbox
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-7">
              Monthly updates on lives changed, projects launched, and ways you
              can help. No spam — just real impact stories.
            </p>
            <form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-3"
              data-ocid="home.newsletter_form"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-11 border-input focus-visible:ring-primary"
                data-ocid="home.newsletter_input"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11 px-6 transition-smooth shrink-0"
                disabled={submitNewsletter.isPending}
                data-ocid="home.newsletter_submit_button"
              >
                {submitNewsletter.isPending ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
            {submitNewsletter.isSuccess && (
              <p
                className="mt-4 text-sm text-primary font-medium"
                data-ocid="home.newsletter_success_state"
              >
                ✓ You're subscribed! Thank you for joining our community.
              </p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
