import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useSearch } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  CreditCard,
  Droplets,
  Heart,
  HeartHandshake,
  Leaf,
  RefreshCw,
  Shield,
  Stethoscope,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import SectionHeading from "../components/SectionHeading";
import { causes } from "../data/causes";
import { useSubmitDonation } from "../hooks/useQueries";

const SUGGESTED_AMOUNTS = [25, 50, 100, 500] as const;
type SuggestedAmount = (typeof SUGGESTED_AMOUNTS)[number];

const ONE_TIME_IMPACTS: Record<SuggestedAmount, string> = {
  25: "Provides school supplies for 5 children for a full term",
  50: "Plants 20 trees in degraded forests",
  100: "Supplies clean water for a community for one month",
  500: "Funds a full healthcare visit for an entire family",
};

const MONTHLY_IMPACTS: Record<SuggestedAmount, string> = {
  25: "Feeds a child with nutritious meals for a full month",
  50: "Trains a local farmer in sustainable agroforestry",
  100: "Vaccinates 40 children against preventable diseases",
  500: "Supports a mobile clinic serving 80 patients monthly",
};

const CAUSE_ICONS: Record<string, React.ReactNode> = {
  "bright-futures-education": <BookOpen className="w-4 h-4" />,
  "green-earth-reforestation": <Leaf className="w-4 h-4" />,
  "healing-hands-healthcare": <Stethoscope className="w-4 h-4" />,
  "clean-water-initiative": <Droplets className="w-4 h-4" />,
  "rapid-relief-disaster": <Heart className="w-4 h-4" />,
};

const IMPACT_CARDS = [
  {
    amount: 25 as SuggestedAmount,
    displayAmount: "$25",
    icon: BookOpen,
    label: "School Supplies",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
  },
  {
    amount: 50 as SuggestedAmount,
    displayAmount: "$50",
    icon: Leaf,
    label: "Plant Trees",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    amount: 100 as SuggestedAmount,
    displayAmount: "$100",
    icon: Droplets,
    label: "Clean Water",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
  },
  {
    amount: 500 as SuggestedAmount,
    displayAmount: "$500",
    icon: Stethoscope,
    label: "Healthcare",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
];

function nearestImpactAmount(val: number): SuggestedAmount {
  if (val >= 500) return 500;
  if (val >= 100) return 100;
  if (val >= 50) return 50;
  return 25;
}

function formatCardNumber(val: string) {
  return val
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

export default function Donations() {
  const search = useSearch({ strict: false }) as { cause?: string };
  const defaultCause = search?.cause ?? "";

  const [recurring, setRecurring] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<SuggestedAmount | null>(
    50,
  );
  const [customAmount, setCustomAmount] = useState("");
  const [cause, setCause] = useState(defaultCause);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitDonation = useSubmitDonation();

  const effectiveAmount = customAmount
    ? Number.parseFloat(customAmount)
    : (selectedAmount ?? 0);

  const impactKey = SUGGESTED_AMOUNTS.includes(
    effectiveAmount as SuggestedAmount,
  )
    ? (effectiveAmount as SuggestedAmount)
    : nearestImpactAmount(effectiveAmount);

  const impactText =
    effectiveAmount > 0
      ? (recurring ? MONTHLY_IMPACTS : ONE_TIME_IMPACTS)[impactKey]
      : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cause) {
      toast.error("Please select a cause to support.");
      return;
    }
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }
    if (effectiveAmount <= 0) {
      toast.error("Please select or enter a donation amount.");
      return;
    }
    try {
      await submitDonation.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        cause,
        amount: BigInt(Math.round(effectiveAmount * 100)),
        recurring,
        message: message.trim(),
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md w-full text-center"
          data-ocid="donation.success_state"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Thank you, {name.split(" ")[0]}!
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-2">
            Your {recurring ? "monthly" : "one-time"} gift of{" "}
            <span className="font-semibold text-foreground">
              ${effectiveAmount.toFixed(2)}
            </span>{" "}
            has been received.
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            A confirmation will be sent to{" "}
            <span className="text-foreground">{email}</span>. Together, we're
            changing lives.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-8 text-left">
            <p className="text-sm font-semibold text-primary mb-1">
              Your impact
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {impactText ??
                "Your generous gift will be directed to where it's needed most."}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setSubmitted(false)}
            className="transition-smooth"
            data-ocid="donation.secondary_button"
          >
            Make another donation
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background" data-ocid="donations.page">
      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              <HeartHandshake className="w-4 h-4" />
              Make a Difference Today
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Your generosity changes lives
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Every dollar reaches real people in real communities — building
              schools, planting forests, delivering healthcare, and supplying
              clean water where it's needed most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Donation Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="shadow-card border-border">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* One-time / Monthly toggle */}
                  <div
                    className="flex items-center gap-2 p-1 bg-muted rounded-lg w-fit"
                    data-ocid="donation.toggle"
                  >
                    <button
                      type="button"
                      onClick={() => setRecurring(false)}
                      className={`px-5 py-2 text-sm font-medium rounded-md transition-smooth ${
                        !recurring
                          ? "bg-card shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid="donation.one_time.tab"
                    >
                      One-time
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecurring(true)}
                      className={`px-5 py-2 text-sm font-medium rounded-md transition-smooth flex items-center gap-1.5 ${
                        recurring
                          ? "bg-card shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid="donation.monthly.tab"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Monthly
                    </button>
                  </div>

                  {/* Cause */}
                  <div className="space-y-2">
                    <Label htmlFor="cause-select">Choose a Cause</Label>
                    <Select value={cause} onValueChange={setCause}>
                      <SelectTrigger
                        id="cause-select"
                        className="w-full"
                        data-ocid="donation.cause.select"
                      >
                        <SelectValue placeholder="Select a cause to support…" />
                      </SelectTrigger>
                      <SelectContent>
                        {causes.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            <span className="flex items-center gap-2">
                              {CAUSE_ICONS[c.id]}
                              {c.title}
                            </span>
                          </SelectItem>
                        ))}
                        <SelectItem value="general">
                          <span className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            Where it's needed most (General Fund)
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Amount */}
                  <div className="space-y-3">
                    <Label>Donation Amount</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {SUGGESTED_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt);
                            setCustomAmount("");
                          }}
                          className={`py-2.5 rounded-lg text-sm font-semibold border transition-smooth ${
                            selectedAmount === amt && !customAmount
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border text-foreground hover:border-primary hover:text-primary"
                          }`}
                          data-ocid={`donation.amount_${amt}.button`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium pointer-events-none">
                        $
                      </span>
                      <Input
                        type="number"
                        placeholder="Custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        className="pl-7"
                        min="1"
                        data-ocid="donation.custom_amount.input"
                      />
                    </div>
                    {impactText && (
                      <motion.p
                        key={impactText}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-primary font-medium flex items-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 fill-primary" />
                        {impactText}
                      </motion.p>
                    )}
                  </div>

                  {/* Personal Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="donor-name">Full Name</Label>
                      <Input
                        id="donor-name"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        data-ocid="donation.name.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="donor-email">Email Address</Label>
                      <Input
                        id="donor-email"
                        type="email"
                        placeholder="jane@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        data-ocid="donation.email.input"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="donor-message">
                      Message{" "}
                      <span className="text-muted-foreground font-normal text-xs">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="donor-message"
                      placeholder="Share why this cause matters to you…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      data-ocid="donation.message.textarea"
                    />
                  </div>

                  {/* Demo Payment */}
                  <div className="border border-dashed border-border rounded-xl p-5 space-y-4 bg-muted/30">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          Payment Details
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs font-semibold tracking-wide"
                      >
                        DEMO ONLY — No real charges
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) =>
                            setCardNumber(formatCardNumber(e.target.value))
                          }
                          maxLength={19}
                          data-ocid="donation.card_number.input"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="card-expiry">Expiration</Label>
                          <Input
                            id="card-expiry"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) =>
                              setExpiry(formatExpiry(e.target.value))
                            }
                            maxLength={5}
                            data-ocid="donation.card_expiry.input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-cvv">CVV</Label>
                          <Input
                            id="card-cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) =>
                              setCvv(
                                e.target.value.replace(/\D/g, "").slice(0, 4),
                              )
                            }
                            data-ocid="donation.card_cvv.input"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                      This is a demonstration form. No payment will be
                      processed. Do not enter real card details.
                    </p>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base font-semibold transition-smooth"
                    disabled={submitDonation.isPending}
                    data-ocid="donation.submit_button"
                  >
                    {submitDonation.isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Donate
                        {effectiveAmount > 0
                          ? ` $${effectiveAmount.toFixed(2)}`
                          : " Now"}
                        {recurring ? " monthly" : ""}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Trust */}
            <Card className="border-border shadow-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display text-base font-semibold text-foreground">
                  Why donate with us?
                </h3>
                {[
                  {
                    icon: Shield,
                    title: "100% Transparent",
                    desc: "Every dollar tracked and publicly reported.",
                  },
                  {
                    icon: HeartHandshake,
                    title: "Community-Led",
                    desc: "Programs designed with, not just for, communities.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Measurable Impact",
                    desc: "We share real outcomes, not just intentions.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly prompt */}
            <Card className="border-primary/30 bg-primary/5 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="w-4 h-4 text-primary" />
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {recurring
                      ? "Why give monthly?"
                      : "Consider monthly giving"}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {recurring
                    ? "Monthly donors are the backbone of our work. Predictable income lets us plan projects further, hire local staff, and respond faster to crises."
                    : "Monthly donors enable long-term planning, sustain entire programs, and amplify impact by up to 3× compared to one-time gifts."}
                </p>
                {!recurring && (
                  <button
                    type="button"
                    onClick={() => setRecurring(true)}
                    className="mt-3 text-sm font-semibold text-primary hover:underline transition-smooth"
                    data-ocid="donation.switch_monthly.button"
                  >
                    Switch to monthly →
                  </button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Impact Breakdown */}
      <section className="bg-muted/30 border-t border-border py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Your Impact"
            title="See what your gift accomplishes"
            subtitle={
              recurring
                ? "Your monthly donation sustains programs over the long term — here's what regular giving achieves."
                : "Every amount makes a real, tangible difference in someone's life. Here's how."
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {IMPACT_CARDS.map((card, i) => (
              <motion.div
                key={card.displayAmount}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <Card
                  className="h-full border-border shadow-card hover:shadow-md transition-smooth cursor-pointer group"
                  onClick={() => {
                    setSelectedAmount(card.amount);
                    setCustomAmount("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  data-ocid={`donation.impact_card.${i + 1}`}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}
                    >
                      <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <p className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-smooth">
                      {card.displayAmount}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {card.label}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {
                        (recurring ? MONTHLY_IMPACTS : ONE_TIME_IMPACTS)[
                          card.amount
                        ]
                      }
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            Click any amount card to select it in the donation form above.
          </p>
        </div>
      </section>
    </div>
  );
}
