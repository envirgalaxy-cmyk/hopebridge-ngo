import Debug "mo:core/Debug";
import List "mo:core/List";
import Types "../types/submissions";

module {
  public type ContactSubmission = Types.ContactSubmission;
  public type VolunteerSignup = Types.VolunteerSignup;
  public type DonationSubmission = Types.DonationSubmission;
  public type NewsletterSignup = Types.NewsletterSignup;

  public func submitContact(
    store : List.List<ContactSubmission>,
    nextId : Nat,
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : Nat {
    Debug.todo();
  };

  public func submitVolunteer(
    store : List.List<VolunteerSignup>,
    nextId : Nat,
    name : Text,
    email : Text,
    role : Text,
    motivation : Text,
  ) : Nat {
    Debug.todo();
  };

  public func submitDonation(
    store : List.List<DonationSubmission>,
    nextId : Nat,
    name : Text,
    email : Text,
    cause : Text,
    amount : Nat,
    recurring : Bool,
    message : Text,
  ) : Nat {
    Debug.todo();
  };

  public func submitNewsletter(
    store : List.List<NewsletterSignup>,
    nextId : Nat,
    email : Text,
  ) : Nat {
    Debug.todo();
  };

  public func getAllContacts(store : List.List<ContactSubmission>) : [ContactSubmission] {
    Debug.todo();
  };

  public func getAllVolunteers(store : List.List<VolunteerSignup>) : [VolunteerSignup] {
    Debug.todo();
  };

  public func getAllDonations(store : List.List<DonationSubmission>) : [DonationSubmission] {
    Debug.todo();
  };

  public func getAllNewsletterSignups(store : List.List<NewsletterSignup>) : [NewsletterSignup] {
    Debug.todo();
  };
};
