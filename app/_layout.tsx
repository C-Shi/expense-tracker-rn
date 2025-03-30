import { Stack } from 'expo-router/stack';
import ExpenseContextProvider from '@/store/ExpenseContext';

export default function RootLayout() {
  return (
    <ExpenseContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ExpenseContextProvider>
  );
}
