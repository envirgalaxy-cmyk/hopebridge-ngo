import Common "common";

module {
  public type Timestamp = Common.Timestamp;

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Timestamp;
  };

  public type VolunteerSignup = {
    id : Nat;
    name : Text;
    email : Text;
    role : Text;
    motivation : Text;
    timestamp : Timestamp;
  };

  public type DonationSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    cause : Text;
    amount : Nat;
    recurring : Bool;
    message : Text;
    timestamp : Timestamp;
  };

  public type NewsletterSignup = {
    id : Nat;
    email : Text;
    timestamp : Timestamp;
  };
};
