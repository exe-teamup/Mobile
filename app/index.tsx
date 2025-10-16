import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to WaitScreen on app start
  return <Redirect href="/screen/WaitScreen" />;
}
