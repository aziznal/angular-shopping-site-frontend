export let User: {
  id?: string; // Generated by MongoDB

  user_name: string;
  user_email: string;
  user_password: string; // This will be stored in db as hash values

  // I've always hated when you HAVE to give your real name
  user_profile_info: {
    first_name?: string;
    last_name?: string;
    age?: number;
    telefon?: string;
    gender?: "M" | "F";
  };

  // Includes what the user has done on the website.
  activity: {
    purchased: string[];      // array of product IDs
    comments: string[];       // array of comment IDs
  }

};