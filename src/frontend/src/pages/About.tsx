import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Heart, Leaf, Users } from "lucide-react";
import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import StatBadge from "../components/StatBadge";
import { teamMembers } from "../data/team";

const impactStats = [
  {
    value: "10+",
    label: "Years Active",
    description: "Serving communities since 2013",
  },
  {
    value: "10,000+",
    label: "People Helped",
    description: "Lives changed through our programs",
  },
  {
    value: "5",
    label: "Countries Served",
    description: "Across Africa, Asia & Latin America",
  },
  {
    value: "200+",
    label: "Team Members",
    description: "Staff and long-term volunteers worldwide",
  },
];

const values = [
  {
    Icon: Heart,
    title: "Compassion",
    description:
      "We lead with empathy in every interaction — listening deeply to communities before acting, and measuring success by human dignity, not just outcomes.",
  },
  {
    Icon: Eye,
    title: "Transparency",
    description:
      "Every dollar is tracked and reported. We publish our financials openly so donors can see exactly how their contributions create real, verifiable impact.",
  },
  {
    Icon: Users,
    title: "Empowerment",
    description:
      "We believe communities are the agents of their own change. Our role is to provide tools, training, and trust — not dependency or top-down solutions.",
  },
  {
    Icon: Leaf,
    title: "Sustainability",
    description:
      "Short-term relief without long-term roots fails people. Every program we build is designed to thrive independently within five years of launch.",
  },
];

const avatarBg = [
  "bg-primary/20 text-primary",
  "bg-secondary/30 text-secondary-foreground",
  "bg-accent/20 text-accent",
  "bg-primary/15 text-primary",
];

export default function About() {
  return (
    <div data-ocid="about.page">
      {/* Hero / Mission */}
      <section className="bg-primary py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-foreground/70 mb-4">
              Est. 2013 · Our Story
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Connecting Communities,
              <br className="hidden md:block" />
              Creating Lasting Change
            </h1>
            <div className="space-y-4 text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-3xl mx-auto text-left md:text-center">
              <p>
                HopeBridge was founded in 2013 with a simple conviction: that
                every person, regardless of where they were born, deserves
                access to the building blocks of a dignified life — clean water,
                quality education, and healthcare. What began as a grassroots
                effort in West Africa has grown into a multi-country initiative
                touching tens of thousands of lives.
              </p>
              <p>
                Our model is human-first. Before we design a program, we spend
                months in conversation with community leaders, listening rather
                than prescribing. This patient, participatory approach is slower
                — but it works. Programs built with community ownership have a
                94% long-term sustainability rate in our portfolio.
              </p>
              <p>
                Today, HopeBridge operates across five countries with over 200
                staff and long-term volunteers. But our mission remains
                unchanged: to be the bridge between good intentions and genuine,
                lasting change.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/causes" data-ocid="about.causes_link">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-bold transition-smooth"
                >
                  See Our Work <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section
        className="py-14 bg-background border-b border-border"
        data-ocid="about.stats.section"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading
            label="Our Impact"
            title="A Decade of Measurable Change"
            subtitle="Numbers only tell part of the story, but they anchor our accountability."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <StatBadge {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-muted/40" data-ocid="about.values.section">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading
            label="What Guides Us"
            title="Our Core Values"
            subtitle="Four principles that shape every decision — from field operations to financial reporting."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <Card
                  className="border border-border shadow-sm hover:shadow-md transition-smooth"
                  data-ocid={`about.value.item.${i + 1}`}
                >
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <v.Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-foreground mb-1.5">
                        {v.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background" data-ocid="about.team.section">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading
            label="Meet the Team"
            title="The People Behind the Mission"
            subtitle="Experienced, passionate individuals united by the belief that sustained human development is the highest calling."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
              >
                <Card
                  className="text-center border border-border shadow-sm hover:shadow-md transition-smooth h-full"
                  data-ocid={`about.team.item.${i + 1}`}
                >
                  <CardContent className="p-6 flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold font-display mx-auto mb-4 ${avatarBg[i % avatarBg.length]}`}
                    >
                      {member.avatar}
                    </div>
                    <h3 className="font-display font-semibold text-base text-foreground mb-0.5 leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs text-primary font-semibold mb-3 uppercase tracking-wide">
                      {member.role}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                      {member.bio}
                    </p>
                    <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border w-full text-center">
                      With HopeBridge since {member.since}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-card border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ready to Make a Difference?
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Whether you donate, volunteer, or simply share our work — every
              action creates ripples of change.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/donations" data-ocid="about.donate_cta">
                <Button size="lg" className="font-bold transition-smooth">
                  Donate Now
                </Button>
              </Link>
              <Link to="/contact" data-ocid="about.contact_cta">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold border-primary text-primary hover:bg-primary/5 transition-smooth"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
