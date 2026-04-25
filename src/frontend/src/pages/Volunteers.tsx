import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { testimonials } from "@/data/testimonials";
import { volunteerOpportunities } from "@/data/volunteers";
import { useSubmitVolunteer } from "@/hooks/useQueries";
import { useSearch } from "@tanstack/react-router";
import { CheckCircle, Clock, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const categoryColorMap: Record<string, string> = {
  "Program Management": "bg-primary/10 text-primary border-primary/20",
  Communications:
    "bg-secondary/20 text-secondary-foreground border-secondary/30",
  Healthcare: "bg-accent/10 text-accent-foreground border-accent/20",
  Fundraising: "bg-primary/10 text-primary border-primary/20",
  Technical: "bg-muted text-muted-foreground border-border",
};

const volunteerTestimonials = testimonials
  .filter((t) => ["sarah-chen", "dr-priya-nair", "mariam-k"].includes(t.id))
  .slice(0, 3);

export default function Volunteers() {
  const search = useSearch({ strict: false }) as { cause?: string };
  const prefilledRole = (search?.cause as string) ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(prefilledRole);
  const [motivation, setMotivation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const submitVolunteer = useSubmitVolunteer();

  useEffect(() => {
    if (prefilledRole) setRole(prefilledRole);
  }, [prefilledRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !role || !motivation) return;
    try {
      await submitVolunteer.mutateAsync({ name, email, role, motivation });
      setSubmittedName(name);
      setSubmittedEmail(email);
      setSubmitted(true);
    } catch {
      // error state shown in form
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setRole("");
    setMotivation("");
    submitVolunteer.reset();
  };

  return (
    <div data-ocid="volunteers.page">
      {/* Hero Section */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Join Our Mission
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
              Become a Force <span className="text-primary">for Good</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Your skills, your time, your presence can change lives. Join
              hundreds of volunteers creating real, lasting impact in
              communities across the globe.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>480+ Active Volunteers</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>12 Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Flexible Commitments</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Open Positions"
            title="Find Your Role"
            subtitle="From fieldwork to remote support, there's a way for every skill set to contribute to our shared mission."
          />

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            data-ocid="volunteers.opportunities_list"
          >
            {volunteerOpportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                data-ocid={`volunteers.item.${index + 1}`}
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-smooth border-border bg-card group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span
                        className="text-3xl"
                        role="img"
                        aria-label={opp.category}
                      >
                        {opp.icon}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium shrink-0 ${categoryColorMap[opp.category] ?? "bg-muted text-muted-foreground"}`}
                      >
                        {opp.category}
                      </Badge>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground leading-snug group-hover:text-primary transition-smooth">
                      {opp.role}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 gap-4">
                    <div className="space-y-1.5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
                        <span className="truncate">{opp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-primary" />
                        <span>{opp.commitment}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 shrink-0 text-primary" />
                        <span>
                          {opp.spotsAvailable} spot
                          {opp.spotsAvailable !== 1 ? "s" : ""} available
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {opp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {opp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-auto border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                      data-ocid={`volunteers.apply_button.${index + 1}`}
                      onClick={() => {
                        setRole(opp.id);
                        document
                          .getElementById("volunteer-signup-form")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                    >
                      Apply for This Role
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section
        id="volunteer-signup-form"
        className="bg-muted/40 py-20 border-t border-border"
        data-ocid="volunteers.signup_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Why volunteer */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Ready to Help?
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Take the First Step Towards Meaningful Change
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Every volunteer journey begins with a single form. Tell us about
                yourself and why you want to make a difference — our team will
                get back to you within 48 hours to discuss next steps.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: "🌱",
                    text: "Receive a personalized onboarding plan",
                  },
                  { icon: "🤝", text: "Connect with our local field teams" },
                  { icon: "📚", text: "Access free training resources" },
                  { icon: "✈️", text: "Get placement & logistics support" },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-8">
                  {submitted ? (
                    <motion.div
                      className="text-center py-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      data-ocid="volunteers.success_state"
                    >
                      <CheckCircle className="w-14 h-14 text-primary mx-auto mb-4" />
                      <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                        Application Received!
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        Thank you, {submittedName}! Our volunteer team will
                        reach out to you at{" "}
                        <span className="text-foreground font-medium">
                          {submittedEmail}
                        </span>{" "}
                        within 48 hours with next steps.
                      </p>
                      <Button
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={handleReset}
                        data-ocid="volunteers.reset_button"
                      >
                        Submit Another Application
                      </Button>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      data-ocid="volunteers.signup_form"
                    >
                      <div>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                          Volunteer Sign-Up
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          All fields are required. We respect your privacy.
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="vol-name"
                          className="text-sm font-medium"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="vol-name"
                          placeholder="Your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-background border-input"
                          data-ocid="volunteers.name_input"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="vol-email"
                          className="text-sm font-medium"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="vol-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-background border-input"
                          data-ocid="volunteers.email_input"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="vol-role"
                          className="text-sm font-medium"
                        >
                          Role You're Applying For
                        </Label>
                        <Select value={role} onValueChange={setRole}>
                          <SelectTrigger
                            id="vol-role"
                            className="bg-background border-input"
                            data-ocid="volunteers.role_select"
                          >
                            <SelectValue placeholder="Select a role…" />
                          </SelectTrigger>
                          <SelectContent>
                            {volunteerOpportunities.map((opp) => (
                              <SelectItem key={opp.id} value={opp.id}>
                                {opp.role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="vol-motivation"
                          className="text-sm font-medium"
                        >
                          Your Motivation
                        </Label>
                        <Textarea
                          id="vol-motivation"
                          placeholder="Tell us why you want to volunteer and what you hope to contribute…"
                          rows={4}
                          value={motivation}
                          onChange={(e) => setMotivation(e.target.value)}
                          required
                          className="bg-background border-input resize-none"
                          data-ocid="volunteers.motivation_textarea"
                        />
                      </div>

                      {submitVolunteer.isError && (
                        <p
                          className="text-sm text-destructive"
                          data-ocid="volunteers.error_state"
                        >
                          Something went wrong. Please try again.
                        </p>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth font-semibold"
                        disabled={
                          submitVolunteer.isPending ||
                          !name ||
                          !email ||
                          !role ||
                          !motivation
                        }
                        data-ocid="volunteers.submit_button"
                      >
                        {submitVolunteer.isPending ? (
                          <span
                            className="flex items-center gap-2"
                            data-ocid="volunteers.loading_state"
                          >
                            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Submitting…
                          </span>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Voices of Our Volunteers"
            title="Stories of Impact"
            subtitle="Hear from the people who have given their time and hearts to our mission."
          />

          <div
            className="grid md:grid-cols-3 gap-8 mt-12"
            data-ocid="volunteers.testimonials_list"
          >
            {volunteerTestimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                data-ocid={`volunteers.testimonial.${index + 1}`}
              >
                <Card className="h-full bg-card border-border hover:shadow-md transition-smooth">
                  <CardContent className="p-7 flex flex-col h-full">
                    <blockquote className="flex-1">
                      <span className="text-4xl font-display text-primary/30 leading-none block mb-2">
                        "
                      </span>
                      <p className="text-foreground leading-relaxed text-sm italic">
                        {t.quote}
                      </p>
                    </blockquote>
                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                        {t.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {t.title} · {t.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Every Hand Counts. Every Hour Matters.
            </h2>
            <p className="text-primary-foreground/85 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Whether you can give a weekend or six months, your contribution
              creates ripples that last for generations.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-smooth font-semibold px-8"
              onClick={() =>
                document
                  .getElementById("volunteer-signup-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="volunteers.cta_apply_button"
            >
              Apply to Volunteer
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
