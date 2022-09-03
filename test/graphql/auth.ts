export const SIGN_UP = `mutation {
    signUp(username: "newName", password: "12345678", email: "new@email.com") {
      username
      id
      email
      token
    }
  }
  `