import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useQueries";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import SectionHeading from "../components/SectionHeading";

const contactDetails = [
  {
    Icon: MapPin,
    label: "Office Address",
    lines: ["14 Hope Street", "Geneva, Switzerland"],
  },
  {
    Icon: Phone,
    label: "Phone",
    lines: ["+1 (212) 555-0192", "Mon–Fri, 9am–6pm WAT"],
  },
  {
    Icon: Mail,
    label: "Email",
    lines: ["hello@hopebridge.org", "media@hopebridge.org"],
  },
  {
    Icon: Clock,
    label: "Operating Hours",
    lines: [
      "Monday – Friday: 9:00 AM – 6:00 PM",
      "Saturday: 10:00 AM – 2:00 PM",
    ],
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitContact = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync({ name, email, subject, message });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div data-ocid="contact.page">
      {/* Hero */}
      <section className="bg-card border-b border-border py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Get In Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              We'd Love to Hear From You
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Whether you have a question about our programs, want to partner
              with us, or simply want to say hello — our team is here and
              listening.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form — wider column */}
            <div className="lg:col-span-3" data-ocid="contact.form.section">
              <SectionHeading
                label="Send a Message"
                title="Write to Us"
                centered={false}
              />
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="bg-card border border-border rounded-xl p-10 flex flex-col items-center text-center gap-5 shadow-sm"
                    data-ocid="contact.success_state"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Thank you for reaching out,{" "}
                        <strong className="text-foreground">
                          {name.split(" ")[0]}
                        </strong>
                        . Our team will respond to{" "}
                        <strong className="text-foreground">{email}</strong>{" "}
                        within 1–2 business days.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="border-primary text-primary hover:bg-primary/5 transition-smooth"
                      data-ocid="contact.secondary_button"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Card
                      className="border border-border shadow-sm"
                      data-ocid="contact.form"
                    >
                      <CardContent className="p-7">
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="contact-name"
                                className="font-semibold"
                              >
                                Full Name
                              </Label>
                              <Input
                                id="contact-name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jane Smith"
                                data-ocid="contact.name.input"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="contact-email"
                                className="font-semibold"
                              >
                                Email Address
                              </Label>
                              <Input
                                id="contact-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="jane@example.com"
                                data-ocid="contact.email.input"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="contact-subject"
                              className="font-semibold"
                            >
                              Subject
                            </Label>
                            <Input
                              id="contact-subject"
                              required
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              placeholder="How can we help?"
                              data-ocid="contact.subject.input"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="contact-message"
                              className="font-semibold"
                            >
                              Message
                            </Label>
                            <Textarea
                              id="contact-message"
                              required
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={6}
                              placeholder="Tell us how we can help…"
                              className="resize-none"
                              data-ocid="contact.message.textarea"
                            />
                          </div>
                          <Button
                            type="submit"
                            size="lg"
                            disabled={submitContact.isPending}
                            className="w-full font-bold transition-smooth"
                            data-ocid="contact.submit_button"
                          >
                            {submitContact.isPending
                              ? "Sending…"
                              : "Send Message"}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Info + Map */}
            <div
              className="lg:col-span-2 space-y-6"
              data-ocid="contact.info.section"
            >
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-5">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {contactDetails.map((item) => (
                    <div
                      key={item.label}
                      className="flex gap-4 p-4 bg-card rounded-xl border border-border shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <item.Icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                          {item.label}
                        </p>
                        {item.lines.map((line) => (
                          <p
                            key={line}
                            className="text-sm text-foreground leading-relaxed"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Static Map Placeholder */}
              <div
                className="rounded-xl border border-border overflow-hidden"
                data-ocid="contact.map.section"
              >
                <div className="px-5 py-4 border-b border-border bg-card">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-0.5">
                    Our Location
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    HopeBridge Global Headquarters
                  </p>
                </div>
                {/* Decorative map area */}
                <div className="relative h-44 bg-muted/60 flex items-center justify-center overflow-hidden">
                  {/* Grid lines */}
                  <div className="absolute inset-0">
                    {(
                      [
                        "12.5%",
                        "25%",
                        "37.5%",
                        "50%",
                        "62.5%",
                        "75%",
                        "87.5%",
                      ] as const
                    ).map((pct) => (
                      <div
                        key={`h-${pct}`}
                        className="absolute w-full border-t border-foreground/10"
                        style={{ top: pct }}
                      />
                    ))}
                    {(
                      [
                        "12.5%",
                        "25%",
                        "37.5%",
                        "50%",
                        "62.5%",
                        "75%",
                        "87.5%",
                      ] as const
                    ).map((pct) => (
                      <div
                        key={`v-${pct}`}
                        className="absolute h-full border-l border-foreground/10"
                        style={{ left: pct }}
                      />
                    ))}
                    {/* Simulated roads */}
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-foreground/20" />
                    <div className="absolute left-2/5 top-0 bottom-0 w-px bg-foreground/20" />
                  </div>
                  {/* Pin */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary shadow-lg flex items-center justify-center text-primary-foreground">
                      <MapPin size={18} />
                    </div>
                    <div className="bg-card rounded-lg px-4 py-2 shadow-md border border-border text-center">
                      <p className="text-xs font-bold text-foreground">
                        Geneva, Switzerland
                      </p>
                      <p className="text-xs text-muted-foreground">
                        14 Hope Street
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-3 bg-card border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Field offices also in Nairobi · Dhaka · Bogotá · Manila
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
