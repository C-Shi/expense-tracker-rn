import { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Text } from "react-native";
import Constants from "expo-constants";

// Define the type for a user object stored in context, including authentication details.
type User = {
  idToken: string;
  email?: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
} | null;

// Define the structure for the authentication context's value.
interface AuthContextModel {
  isAuth: boolean; // Boolean flag indicating if the user is authenticated.
  user: User; // The user object containing authentication data.
  signInSignUp: (
    email: string,
    password: string,
    action: string
  ) => Promise<any>; // Function to sign in or sign up.
  signOut: () => Promise<any>; // Function to sign out the user.
}

// Firebase authentication base URL for REST API requests.
const AUTH_URL = "https://identitytoolkit.googleapis.com/v1";
const apiKey = Constants.expoConfig?.extra?.firebaseApiKey;

// Create a context to store authentication state and actions.
const AuthContext = createContext({} as AuthContextModel);

// Export the context for use in other components.
export { AuthContext };

// The provider component that encapsulates children and provides authentication state.
export default function AuthContextProvider({ children }: { children: any }) {
  // State variables for user data, authentication status, and app initialization.
  const [user, setUser] = useState<User>(null as User);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAppStarted, setIsAppStarted] = useState<boolean>(false);

  // useEffect to initialize app and check for a stored user during app start.
  useEffect(() => {
    appStart();
  }, []);

  // Log authentication state changes for debugging.
  useEffect(() => {
    console.debug("App Started", user, isAuth);
  }, [user, isAuth]);

  // Function to sign out the user and remove their credentials from secure storage.
  const signOut = async (): Promise<any> => {
    await SecureStore.deleteItemAsync("user"); // Delete user from secure storage.
    setUser(null); // Clear user data.
    setIsAuth(false); // Set authentication status to false.
  };

  // Function to initialize the app by checking for stored user credentials and refreshing the session.
  const appStart = async () => {
    const storedUser = await SecureStore.getItemAsync("user"); // Retrieve stored user data from SecureStore.
    console.log("storedUser is ", storedUser);
    if (storedUser) {
      const storedUserObj = JSON.parse(storedUser); // Parse the stored user data.

      try {
        // Attempt to refresh the session using the stored refresh token.
        const refreshedTokenObj = await refreshSession(
          storedUserObj.refreshToken
        );
        setUser({
          ...storedUserObj,
          idToken: refreshedTokenObj.id_token,
          refreshToken: refreshedTokenObj.refresh_token,
          expiresIn: refreshedTokenObj.expires_in,
        } as User); // Update user state with refreshed tokens.
        setIsAuth(true); // Set authentication status to true.
      } catch (e) {
        alert((e as Error).message); // Handle any errors during token refresh.
      } finally {
        setIsAppStarted(true); // Mark app initialization as complete.
      }
    } else {
      setIsAppStarted(true); // If no stored user, mark app initialization as complete.
    }
  };

  // Function to sign in or sign up the user based on the action passed (signIn or signUp).
  const signInSignUp = async (
    email: string,
    password: string,
    action: string = "signIn"
  ): Promise<any> => {
    // Construct the appropriate URL for signIn or signUp action based on the passed parameter.
    if (action == "signIn") {
      var URL = `${AUTH_URL}/accounts:signInWithPassword?key=${apiKey}`;
    } else if (action == "signUp") {
      var URL = `${AUTH_URL}/accounts:signUp?key=${apiKey}`;
    } else {
      throw new Error("Unidentified action"); // Throw an error if an invalid action is passed.
    }

    // Make the HTTP POST request to Firebase authentication endpoint.
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON.
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true, // Request to return secure tokens.
      }),
    });

    if (response.ok) {
      const signedIn = await response.json(); // Parse the response JSON if the request is successful.
      await SecureStore.setItemAsync("user", JSON.stringify(signedIn)); // Store user data in SecureStore.
      setUser(signedIn); // Update user state with signed-in data.
      setIsAuth(true); // Set authentication status to true.
    } else {
      throw new Error(`Http Sign Up Error! Status: ${response.status}`); // Handle errors if the response is not successful.
    }
  };

  // Function to refresh the session using a valid refresh token.
  const refreshSession = async (refreshToken: string): Promise<any> => {
    const URL = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;

    // Make the HTTP POST request to Firebase secure token endpoint.
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON.
      },
      body: JSON.stringify({
        grant_type: "refresh_token", // Grant type for refreshing the token.
        refresh_token: refreshToken, // Pass the stored refresh token.
      }),
    });

    if (response.ok) {
      const refreshedTokenObj = await response.json(); // Parse the response for the refreshed token.
      return refreshedTokenObj; // Return the refreshed token object.
    }
  };

  // Provide the authentication state and actions to the context consumers.
  const value = {
    user,
    isAuth,
    signInSignUp,
    signOut,
  };

  // If the app is fully initialized, provide the context value to children components.
  if (isAppStarted) {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }

  // If the app is still loading, display a loading message.
  return <Text>App is Loading</Text>;
}
