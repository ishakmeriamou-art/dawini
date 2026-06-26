import { Tabs } from 'expo-router';
import CustomTabBar from '../../components/CustomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'الرئيسية' }} />
      <Tabs.Screen name="appointments" options={{ title: 'المواعيد' }} />
      <Tabs.Screen name="messages" options={{ title: 'الرسائل' }} />
      <Tabs.Screen name="profile" options={{ title: 'حسابي' }} />
    </Tabs>
  );
}