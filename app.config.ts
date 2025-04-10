import "dotenv/config";

export default {
    expo: {
        name: "my-expense",
        slug: "my-expense",
        version: "1.0.0",
        extra: {
            firebaseURL: process.env.EXPO_PUBLIC_FIREBASE_URL,
            firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY
        }
    }
}