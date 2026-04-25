import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBackend } from "@/hooks/useBackend";
import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Heart,
  Instagram,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const quickLinks = [
  { to: "/causes", label: "Our Causes" },
  { to: "/donations", label: "Donate" },
  { to: "/volunteers", label: "Volunteer" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { actor } = useBackend();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !actor) return;
    setSubmitting(true);
    try {
      await actor.submitNewsletterSignup(email);
      toast.success("You're subscribed! Thank you for staying connected.");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-primary-foreground fill-primary-foreground" />
              </div>
              <span className="font-display font-bold text-base text-foreground">
                Hope<span className="text-primary">Bridge</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Working globally to create sustainable change through education,
              healthcare, clean water, and disaster relief since 2013.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href={`https://www.${label.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>14 Hope Street</li>
              <li>Geneva, Switzerland</li>
              <li className="mt-2">
                <a
                  href="mailto:hello@hopebridge.org"
                  className="hover:text-primary transition-colors duration-200 flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" /> hello@hopebridge.org
                </a>
              </li>
              <li>+41 22 000 1234</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              Stay Connected
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get monthly impact updates and stories from the field.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-sm"
                data-ocid="footer.newsletter_input"
              />
              <Button
                type="submit"
                size="sm"
                disabled={submitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                data-ocid="footer.newsletter_submit"
              >
                {submitting ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} HopeBridge. All rights reserved.</p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
