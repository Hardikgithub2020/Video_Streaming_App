import firebase from "../firebase/firebaseConfig";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

const SignupActionsCreator = (email, password) => async (dispatch) => {
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          user.sendEmailVerification();
        });
      })
      .then(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user.emailVerified) {
            // Email is verified
            dispatch({
              type: SIGNUP_SUCCESS,
              payload:
                "Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox.",
            });
          } else {
            // Email is not verified
            dispatch({
              type: SIGNUP_ERROR,
              payload:
                "Something went wrong, we couldn't create your account. Please try again.",
            });
          }
        });
      })
      .catch(function (error) {
        dispatch({
          type: SIGNUP_ERROR,
          payload:
            "Something went wrong, we couldn't create your account. Please try again.",
        });
      });
  } catch (err) {
    dispatch({
      type: SIGNUP_ERROR,
      payload:
        "Something went wrong, we couldn't create your account. Please try again.",
    });
  }
};

export default SignupActionsCreator;
