// Firebase has been disabled as requested.
export const db = null;
export const auth = null;

export const initAuth = (
  onAuthSuccess?: (user: any, token: string) => void,
  onAuthFailure?: () => void
) => {
  if (onAuthFailure) onAuthFailure();
  return () => {};
};

export const googleSignIn = async (): Promise<{ user: any; accessToken: string } | null> => {
  console.log("Firebase is disabled. Mocking sign in.");
  const mockUser = { displayName: "Guest User", email: "guest@example.com", photoURL: "" };
  // Mock login success manually to reflect in the UI
  return { user: mockUser, accessToken: "mock-token" };
};

export const getAccessToken = async (): Promise<string | null> => {
  return "mock-token";
};

export const logout = async () => {
  console.log("Firebase is disabled. Mocking logout.");
};

