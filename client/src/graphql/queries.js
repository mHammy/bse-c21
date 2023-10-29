import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      // Consider fetching additional user details if needed, e.g., profile picture, join date, etc.
      // profilePicture
      // joinDate
      
      savedBooks {
        bookId
        title
        // You might want to also get more details about the saved books. Examples include:
        authors
        description
        image
        link
      }
    }
  }
`;
