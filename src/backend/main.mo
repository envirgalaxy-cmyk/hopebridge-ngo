import List "mo:core/List";
import Types "types/submissions";
import SubmissionsMixin "mixins/submissions-api";

actor {
  let contacts = List.empty<Types.ContactSubmission>();
  let volunteers = List.empty<Types.VolunteerSignup>();
  let donations = List.empty<Types.DonationSubmission>();
  let newsletters = List.empty<Types.NewsletterSignup>();

  include SubmissionsMixin(
    contacts,
    volunteers,
    donations,
    newsletters,
  );
};
