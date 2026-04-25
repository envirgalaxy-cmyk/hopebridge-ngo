import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DonationSubmission {
    id: bigint;
    cause: string;
    name: string;
    recurring: boolean;
    email: string;
    message: string;
    timestamp: Timestamp;
    amount: bigint;
}
export type Timestamp = bigint;
export interface VolunteerSignup {
    id: bigint;
    name: string;
    role: string;
    email: string;
    motivation: string;
    timestamp: Timestamp;
}
export interface ContactSubmission {
    id: bigint;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: Timestamp;
}
export interface NewsletterSignup {
    id: bigint;
    email: string;
    timestamp: Timestamp;
}
export interface backendInterface {
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getDonationSubmissions(): Promise<Array<DonationSubmission>>;
    getNewsletterSignups(): Promise<Array<NewsletterSignup>>;
    getVolunteerSignups(): Promise<Array<VolunteerSignup>>;
    submitContactForm(name: string, email: string, subject: string, message: string): Promise<bigint>;
    submitDonationForm(name: string, email: string, cause: string, amount: bigint, recurring: boolean, message: string): Promise<bigint>;
    submitNewsletterSignup(email: string): Promise<bigint>;
    submitVolunteerSignup(name: string, email: string, role: string, motivation: string): Promise<bigint>;
}
