/**
 * app/_layout.tsx
 * Root layout — يُغلّف التطبيق بـ DrawerProvider + DrawerMenu
 *
 * ✅ كيفية الدمج مع _layout.tsx الحالي في مشروعك:
 *    1. أضف DrawerProvider حول Stack أو Tabs.
 *    2. أضف <DrawerMenu> داخل DrawerProvider.
 *    3. استخدم useDrawer() في أي صفحة لفتح/إغلاق الدرج.
 */

import { Stack } from "expo-router";
import { I18nManager, View, StyleSheet } from "react-native";
import { DrawerProvider, useDrawer } from "../context/DrawerContext";
import { DrawerMenu } from "../components/DrawerMenu";

// تفعيل RTL لدعم اللغة العربية
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

/** مكون داخلي يضم القائمة الجانبية + باقي الشاشات */
function AppShell() {
  const { isDrawerOpen, closeDrawer } = useDrawer();

  return (
    <View style={styles.root}>
      {/* ── شاشات التطبيق ── */}
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#FFFFFF" },
        }}
      />

      {/* ── القائمة الجانبية فوق كل شيء ── */}
      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        user={{
          name: "أحمد العمراني",
          phone: "+213 655 123 456",
        }}
      />
    </View>
  );
}

export default function RootLayout() {
  return (
    <DrawerProvider>
      <AppShell />
    </DrawerProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});