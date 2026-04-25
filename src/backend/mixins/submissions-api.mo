import Debug "mo:core/Debug";
import List "mo:core/List";
import SubmissionsLib "../lib/submissions";
import Types "../types/submissions";

mixin (
  contacts : List.List<Types.ContactSubmission>,
  volunteers : List.List<Types.VolunteerSignup>,
  donations : List.List<Types.DonationSubmission>,
  newsletters : List.List<Types.NewsletterSignup>,
) {

  var nextContactId : Nat = 0;
  var nextVolunteerId : Nat = 0;
  var nextDonationId : Nat = 0;
  var nextNewsletterId : Nat = 0;

  public func submitContactForm(
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : async Nat {
    Debug.todo();
  };

  public func submitVolunteerSignup(
    name : Text,
    email : Text,
    role : Text,
    motivation : Text,
  ) : async Nat {
    Debug.todo();
  };

  public func submitDonationForm(
    name : Text,
    email : Text,
    cause : Text,
    amount : Nat,
    recurring : Bool,
    message : Text,
  ) : async Nat {
    Debug.todo();
  };

  public func submitNewsletterSignup(email : Text) : async Nat {
    Debug.todo();
  };

  public query func getContactSubmissions() : async [Types.ContactSubmission] {
    Debug.todo();
  };

  public query func getVolunteerSignups() : async [Types.VolunteerSignup] {
    Debug.todo();
  };

  public query func getDonationSubmissions() : async [Types.DonationSubmission] {
    Debug.todo();
  };

  public query func getNewsletterSignups() : async [Types.NewsletterSignup] {
    Debug.todo();
  };
};
