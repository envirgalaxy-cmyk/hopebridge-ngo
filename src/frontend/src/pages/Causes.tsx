import { motion } from "motion/react";
import { useState } from "react";
import CauseCard from "../components/CauseCard";
import SectionHeading from "../components/SectionHeading";
import { causes } from "../data/causes";
import type { Cause } from "../types";

const categories: { value: Cause["category"] | "all"; label: string }[] = [
  { value: "all", label: "All Causes" },
  { value: "education", label: "Education" },
  { value: "environment", label: "Environment" },
  { value: "healthcare", label: "Healthcare" },
  { value: "water", label: "Clean Water" },
  { value: "disaster", label: "Disaster Relief" },
];

export default function Causes() {
  const [filter, setFilter] = useState<Cause["category"] | "all">("all");
  const filtered =
    filter === "all" ? causes : causes.filter((c) => c.category === filter);

  return (
    <div data-ocid="causes.page">
      {/* Page Header */}
      <section className="py-16 bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="What We Do"
            title="Our Active Causes"
            subtitle="From classrooms in Uganda to freshwater wells in Ethiopia — every cause represents a community's future. Explore our campaigns and choose one to champion today."
          />

          {/* Filter Tabs */}
          <div
            className="flex flex-wrap justify-center gap-2 mt-6"
            data-ocid="causes.filter_tabs"
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setFilter(cat.value)}
                aria-pressed={filter === cat.value}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  filter === cat.value
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
                data-ocid={`causes.filter.${cat.value}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Causes Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "cause" : "causes"}
            {filter !== "all" && (
              <span>
                {" "}
                in{" "}
                <span className="text-primary font-semibold">
                  {categories.find((c) => c.value === filter)?.label}
                </span>
              </span>
            )}
          </p>

          {filtered.length === 0 ? (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="causes.empty_state"
            >
              <div className="text-5xl mb-4">🌱</div>
              <p className="text-lg font-display font-semibold text-foreground mb-2">
                No causes in this category yet
              </p>
              <p className="text-sm">
                Check back soon — new campaigns are added regularly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((cause, i) => (
                <motion.div
                  key={cause.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <CauseCard cause={cause} index={i + 1} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-primary/8 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="font-display text-xl font-semibold text-foreground mb-1">
                Not sure where to give?
              </p>
              <p className="text-sm text-muted-foreground">
                Your general donation is allocated to the most urgent active
                causes by our team.
              </p>
            </div>
            <a
              href="/donations"
              className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-6 py-3 rounded-full text-sm font-bold hover:bg-destructive/90 transition-smooth shadow-sm whitespace-nowrap"
              data-ocid="causes.general_donate_button"
            >
              Donate to Urgent Relief →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
