// MUST have field for relevant product's id
export let Comment: {
  id?: string;          // auto assigned by MongoDB
  productID: string;    // corresponding product id
  body: string;         // comment body
  userID: string;       // Id of commenter
  timestamp: string;    // time of creation
}
