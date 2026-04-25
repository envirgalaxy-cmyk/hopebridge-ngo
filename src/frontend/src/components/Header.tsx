import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/causes", label: "Our Causes" },
  { to: "/volunteers", label: "Volunteer" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.logo_link"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
            Hope<span className="text-primary">Bridge</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted"
              activeProps={{
                className:
                  "px-3 py-2 text-sm font-medium text-primary bg-primary/8 rounded-md",
              }}
              data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/donations"
            className="hidden sm:block"
            data-ocid="nav.donate_button"
          >
            <Button
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm transition-smooth"
            >
              Donate Now
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground rounded-md hover:bg-muted transition-colors duration-200"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-ocid="nav.mobile_menu_toggle"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-border bg-card animate-slide-up"
          data-ocid="nav.mobile_menu"
        >
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                activeProps={{
                  className:
                    "px-3 py-2 text-sm font-medium text-primary bg-primary/8 rounded-md",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/donations"
              onClick={() => setMenuOpen(false)}
              className="mt-2"
            >
              <Button
                variant="default"
                size="sm"
                className="w-full bg-primary text-primary-foreground font-semibold"
                data-ocid="nav.mobile_donate_button"
              >
                Donate Now
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
