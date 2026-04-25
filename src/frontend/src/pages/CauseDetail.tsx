import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  Target,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { getCauseById } from "../data/causes";

const categoryLabels: Record<string, string> = {
  education: "Education",
  environment: "Environment",
  healthcare: "Healthcare",
  water: "Clean Water",
  disaster: "Disaster Relief",
};

const categoryColors: Record<string, string> = {
  education: "bg-secondary/15 text-secondary border-secondary/30",
  environment: "bg-primary/15 text-primary border-primary/30",
  healthcare: "bg-accent/15 text-accent border-accent/30",
  water: "bg-secondary/20 text-secondary border-secondary/40",
  disaster: "bg-destructive/15 text-destructive border-destructive/30",
};

/** Derive per-cause gallery seeds so each cause gets unique picsum images */
const getGalleryImages = (id: string): { src: string; alt: string }[] => {
  const seeds: Record<string, number[]> = {
    "bright-futures-education": [237, 1181, 672],
    "green-earth-reforestation": [1043, 488, 225],
    "healing-hands-healthcare": [1005, 582, 984],
    "clean-water-initiative": [1057, 631, 460],
    "rapid-relief-disaster": [996, 1073, 786],
  };
  const nums = seeds[id] ?? [100, 200, 300];
  return nums.map((n, i) => ({
    src: `https://picsum.photos/seed/${n}/600/400`,
    alt: `Impact photo ${i + 1}`,
  }));
};

/** Derive volunteer spots from cause data */
const getVolunteersNeeded = (id: string): number => {
  const map: Record<string, number> = {
    "bright-futures-education": 80,
    "green-earth-reforestation": 120,
    "healing-hands-healthcare": 45,
    "clean-water-initiative": 60,
    "rapid-relief-disaster": 200,
  };
  return map[id] ?? 50;
};

/** Derive people helped from cause impact line */
const getPeopleHelped = (id: string): string => {
  const map: Record<string, string> = {
    "bright-futures-education": "3,000+",
    "green-earth-reforestation": "200 families",
    "healing-hands-healthcare": "25,000",
    "clean-water-initiative": "18,000",
    "rapid-relief-disaster": "15,000 families",
  };
  return map[id] ?? "Thousands";
};

export default function CauseDetail() {
  const { id } = useParams({ from: "/causes/$id" });
  const cause = getCauseById(id);

  if (!cause) {
    return (
      <div
        className="container mx-auto px-4 py-24 text-center"
        data-ocid="cause_detail.not_found"
      >
        <div className="text-6xl mb-6">🌿</div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-3">
          Cause Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          This cause doesn't exist or may have ended.
        </p>
        <Link to="/causes">
          <Button variant="outline">← Back to All Causes</Button>
        </Link>
      </div>
    );
  }

  const progress = Math.round((cause.raised / cause.goal) * 100);
  const gallery = getGalleryImages(cause.id);
  const volunteersNeeded = getVolunteersNeeded(cause.id);
  const peopleHelped = getPeopleHelped(cause.id);

  return (
    <div data-ocid="cause_detail.page">
      {/* Breadcrumb */}
      <nav
        className="bg-muted/40 border-b border-border py-3"
        aria-label="Breadcrumb"
        data-ocid="cause_detail.breadcrumb"
      >
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <li>
              <Link
                to="/"
                className="hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <Link
                to="/causes"
                className="hover:text-primary transition-colors duration-200"
                data-ocid="cause_detail.back_link"
              >
                Causes
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">
              {cause.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-72 md:h-[440px] overflow-hidden bg-muted">
        <img
          src={cause.image}
          alt={cause.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
          <Link
            to="/causes"
            className="inline-flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> All Causes
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[cause.category]}`}
            >
              {categoryLabels[cause.category]}
            </span>
            {cause.daysLeft <= 10 && (
              <Badge variant="destructive" className="text-xs font-bold">
                Urgent — {cause.daysLeft} days left
              </Badge>
            )}
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
            {cause.title}
          </h1>
          <p className="flex items-center gap-1.5 text-primary-foreground/80 text-sm mt-2">
            <MapPin className="w-4 h-4" /> {cause.location}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left — story + impact + gallery */}
            <motion.div
              className="lg:col-span-2 space-y-10"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {/* Tagline */}
              <p className="font-display text-xl md:text-2xl italic text-primary leading-relaxed border-l-4 border-primary/40 pl-5">
                "{cause.tagline}"
              </p>

              {/* Problem & Long Description */}
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  The Challenge
                </h2>
                <p className="text-base text-foreground leading-relaxed">
                  {cause.longDescription}
                </p>
              </div>

              {/* Impact Goals */}
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  What Your Donation Achieves
                </h2>
                <ul className="space-y-3">
                  {cause.impact.map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.07, duration: 0.35 }}
                    >
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-base text-foreground leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Photo Gallery */}
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  From the Field
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {gallery.map((img, i) => (
                    <motion.div
                      key={img.src}
                      className="aspect-[4/3] rounded-xl overflow-hidden bg-muted"
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile CTA — shown below lg */}
              <div className="lg:hidden" data-ocid="cause_detail.mobile_cta">
                <Link
                  to="/donations"
                  search={{ cause: cause.id }}
                  data-ocid="cause_detail.mobile_donate_button"
                >
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base py-6 mb-3 transition-smooth">
                    <Heart className="w-4 h-4 mr-2" /> Donate Now
                  </Button>
                </Link>
                <Link
                  to="/volunteers"
                  data-ocid="cause_detail.mobile_volunteer_button"
                >
                  <Button
                    variant="outline"
                    className="w-full border-border hover:border-primary hover:text-primary transition-smooth"
                  >
                    <Users className="w-4 h-4 mr-2" /> Volunteer for This Cause
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
            >
              {/* Progress Card */}
              <div
                className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-20"
                data-ocid="cause_detail.donation_card"
              >
                {/* Funding Progress */}
                <div className="mb-5">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="font-display text-2xl font-bold text-primary">
                      ${cause.raised.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      of ${cause.goal.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-3 mb-2" />
                  <p className="text-xs text-muted-foreground text-right">
                    <span className="font-semibold text-foreground">
                      {progress}%
                    </span>{" "}
                    funded
                  </p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-muted/60 rounded-xl p-3 text-center">
                    <Target className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="font-bold text-sm text-foreground">
                      ${cause.goal.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Goal</p>
                  </div>
                  <div className="bg-muted/60 rounded-xl p-3 text-center">
                    <Heart className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="font-bold text-sm text-foreground">
                      ${cause.raised.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Raised</p>
                  </div>
                  <div className="bg-muted/60 rounded-xl p-3 text-center">
                    <Users className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="font-bold text-sm text-foreground">
                      {volunteersNeeded}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Volunteers Needed
                    </p>
                  </div>
                  <div className="bg-muted/60 rounded-xl p-3 text-center">
                    <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="font-bold text-sm text-foreground">
                      {peopleHelped}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      People Helped
                    </p>
                  </div>
                </div>

                {/* Donors & Days */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-5 px-1">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {cause.donors.toLocaleString()} donors
                  </span>
                  <span
                    className={`flex items-center gap-1.5 font-semibold ${
                      cause.daysLeft <= 10
                        ? "text-destructive"
                        : "text-foreground"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {cause.daysLeft} days left
                  </span>
                </div>

                {/* CTA Buttons */}
                <Link
                  to="/donations"
                  search={{ cause: cause.id }}
                  data-ocid="cause_detail.donate_button"
                >
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base py-5 mb-3 transition-smooth">
                    <Heart className="w-4 h-4 mr-2" /> Donate Now
                  </Button>
                </Link>
                <Link
                  to="/volunteers"
                  data-ocid="cause_detail.volunteer_button"
                >
                  <Button
                    variant="outline"
                    className="w-full border-border hover:border-primary hover:text-primary transition-smooth"
                  >
                    <Users className="w-4 h-4 mr-2" /> Volunteer for This Cause
                  </Button>
                </Link>

                {/* Trust note */}
                <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed">
                  🔒 Secure demo form — no real payment processed.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related CTA */}
      <section className="py-12 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-lg font-semibold text-foreground mb-2">
            Make a difference in a different way
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            Can't donate right now? Volunteering your time is just as valuable.
          </p>
          <Link to="/causes" data-ocid="cause_detail.back_causes_link">
            <Button
              variant="outline"
              size="sm"
              className="mr-3 border-border hover:border-primary hover:text-primary transition-smooth"
            >
              ← Explore All Causes
            </Button>
          </Link>
          <Link to="/volunteers" data-ocid="cause_detail.footer_volunteer_link">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
            >
              Become a Volunteer
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
