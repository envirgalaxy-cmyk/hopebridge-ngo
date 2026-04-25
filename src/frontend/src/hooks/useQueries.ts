import type {
  ContactSubmission,
  DonationSubmission,
  NewsletterSignup,
  VolunteerSignup,
} from "@/backend.d";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

export type {
  ContactSubmission,
  DonationSubmission,
  VolunteerSignup,
  NewsletterSignup,
};

export function useContactSubmissions() {
  const { actor, isFetching } = useBackend();
  return useQuery<ContactSubmission[]>({
    queryKey: ["contactSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDonationSubmissions() {
  const { actor, isFetching } = useBackend();
  return useQuery<DonationSubmission[]>({
    queryKey: ["donationSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDonationSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVolunteerSignups() {
  const { actor, isFetching } = useBackend();
  return useQuery<VolunteerSignup[]>({
    queryKey: ["volunteerSignups"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVolunteerSignups();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNewsletterSignups() {
  const { actor, isFetching } = useBackend();
  return useQuery<NewsletterSignup[]>({
    queryKey: ["newsletterSignups"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNewsletterSignups();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) =>
      actor!.submitContactForm(
        args.name,
        args.email,
        args.subject,
        args.message,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contactSubmissions"] }),
  });
}

export function useSubmitDonation() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      name: string;
      email: string;
      cause: string;
      amount: bigint;
      recurring: boolean;
      message: string;
    }) =>
      actor!.submitDonationForm(
        args.name,
        args.email,
        args.cause,
        args.amount,
        args.recurring,
        args.message,
      ),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["donationSubmissions"] }),
  });
}

export function useSubmitVolunteer() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (args: {
      name: string;
      email: string;
      role: string;
      motivation: string;
    }) =>
      actor!.submitVolunteerSignup(
        args.name,
        args.email,
        args.role,
        args.motivation,
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["volunteerSignups"] }),
  });
}

export function useSubmitNewsletter() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (email: string) => actor!.submitNewsletterSignup(email),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["newsletterSignups"] }),
  });
}
