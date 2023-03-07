import axios from "axios";

const APIKey = "AIzaSyBrauf7BFaIbC1hildA5jEM6P3MFvaahrY";

export const CreateUser = async (email, password) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    return response
  } catch (error) {
    console.log(error);
  }
};
export const SignUser = async (email, password) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    return response
  } catch (error) {
    console.log(error);
  }
};
