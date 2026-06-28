/**
 * DrawerMenu.tsx
 * القائمة الجانبية الرئيسية لتطبيق داويني
 * تصميم Minimal فاخر بألوان تركوازية هادئة
 */

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const DRAWER_WIDTH = SCREEN_WIDTH * 0.82;

// ─── Design Tokens ────────────────────────────────────────────────────────────
const COLORS = {
  primary: "#4DB6AC",
  primaryLight: "#E8F7F5",
  primaryMid: "#C5EBE7",
  primaryDark: "#3A9E94",
  white: "#FFFFFF",
  background: "#F7FAFA",
  textPrimary: "#1A2E2C",
  textSecondary: "#6B8E8B",
  textMuted: "#9BB5B3",
  border: "#EAF4F3",
  shadow: "#4DB6AC",
  danger: "#FF6B6B",
  dangerLight: "#FFF0F0",
  overlay: "rgba(15, 40, 38, 0.45)",
  iconBg: "#E8F7F5",
  headerGradientStart: "#EDFAF8",
  headerGradientEnd: "#FFFFFF",
};

// ─── Menu Items ───────────────────────────────────────────────────────────────
interface MenuItem {
  id: string;
  labelAr: string;
  icon: React.ReactNode;
  route: string;
  badge?: number;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "appointments",
    labelAr: "مواعيدي",
    icon: <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />,
    route: "/(tabs)/appointments",
  },
  {
    id: "favorites",
    labelAr: "الأطباء المفضلون",
    icon: <Ionicons name="heart-outline" size={20} color={COLORS.primary} />,
    route: "/(tabs)/favorites",
  },
  {
    id: "records",
    labelAr: "السجل الطبي",
    icon: <Feather name="file-text" size={20} color={COLORS.primary} />,
    route: "/medical-records",
  },
  {
    id: "prescriptions",
    labelAr: "الوصفات الطبية",
    icon: (
      <MaterialCommunityIcons
        name="pill"
        size={20}
        color={COLORS.primary}
      />
    ),
    route: "/prescriptions",
  },
  {
    id: "messages",
    labelAr: "المحادثات",
    icon: <Ionicons name="chatbubble-ellipses-outline" size={20} color={COLORS.primary} />,
    route: "/messages",
    badge: 3,
  },
  {
    id: "notifications",
    labelAr: "الإشعارات",
    icon: <Ionicons name="notifications-outline" size={20} color={COLORS.primary} />,
    route: "/notifications",
    badge: 5,
  },
  {
    id: "settings",
    labelAr: "الإعدادات",
    icon: <Ionicons name="settings-outline" size={20} color={COLORS.primary} />,
    route: "/settings",
  },
  {
    id: "support",
    labelAr: "الدعم الفني",
    icon: <Ionicons name="headset-outline" size={20} color={COLORS.primary} />,
    route: "/support",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    phone: string;
    avatar?: string;
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Circular icon wrapper with soft teal background */
const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.iconWrapper}>{children}</View>
);

/** Single menu row with press animation */
const MenuRow: React.FC<{
  item: MenuItem;
  onPress: () => void;
  index: number;
}> = ({ item, onPress, index }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 280,
        delay: index * 45,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 280,
        delay: index * 45,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: opacityAnim,
        transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.menuRow}
      >
        <View style={styles.menuRowLeft}>
          <IconWrapper>{item.icon}</IconWrapper>
          <Text style={styles.menuLabel}>{item.labelAr}</Text>
        </View>

        <View style={styles.menuRowRight}>
          {item.badge && item.badge > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          ) : null}
          <Feather name="chevron-left" size={16} color={COLORS.textMuted} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  isOpen,
  onClose,
  user = {
    name: "أحمد العمراني",
    phone: "+213 655 123 456",
  },
}) => {
  const router = useRouter();

  // Animation values
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const drawerScale = useRef(new Animated.Value(0.97)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          damping: 22,
          stiffness: 180,
          mass: 0.9,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(drawerScale, {
          toValue: 1,
          useNativeDriver: true,
          damping: 20,
          stiffness: 150,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: -DRAWER_WIDTH,
          useNativeDriver: true,
          damping: 25,
          stiffness: 200,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(drawerScale, {
          toValue: 0.97,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const handleNavigate = (route: string) => {
    onClose();
    setTimeout(() => {
      router.push(route as any);
    }, 260);
  };

  const handleLogout = () => {
    onClose();
    // TODO: clear auth state then navigate to login
    setTimeout(() => {
      router.replace("/(auth)/login" as any);
    }, 300);
  };

  if (!isOpen) {
    // Keep the Animated values alive but hide via transform
  }

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, styles.root]}
      pointerEvents={isOpen ? "auto" : "none"}
    >
      {/* ── Overlay ── */}
      <Animated.View
        style={[styles.overlay, { opacity: overlayOpacity }]}
        pointerEvents={isOpen ? "auto" : "none"}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* ── Drawer Panel ── */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX }, { scale: drawerScale }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarInitial}>
                    {user.name.charAt(0)}
                  </Text>
                </View>
              )}
              {/* Online dot */}
              <View style={styles.onlineDot} />
            </View>

            {/* Edit button */}
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => handleNavigate("/profile/edit")}
            >
              <Feather name="edit-2" size={15} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>

          {/* Stats strip */}
          <View style={styles.statsStrip}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>موعد</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>طبيب مفضل</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>وصفة</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.sectionDivider} />

        {/* Menu items */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuList}
        >
          {MENU_ITEMS.map((item, index) => (
            <MenuRow
              key={item.id}
              item={item}
              index={index}
              onPress={() => handleNavigate(item.route)}
            />
          ))}

          {/* Logout */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color={COLORS.danger}
              />
              <Text style={styles.logoutText}>تسجيل الخروج</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>داويني • v1.0.0</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    zIndex: 999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  drawer: {
    position: "absolute",
    right: 0, // RTL: drawer slides from right
    top: 0,
    width: DRAWER_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 20,
    overflow: "hidden",
  },

  // ── Header ──
  header: {
    backgroundColor: COLORS.headerGradientStart,
    paddingTop: Platform.OS === "ios" ? 60 : (StatusBar.currentHeight ?? 24) + 16,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2.5,
    borderColor: COLORS.primaryMid,
  },
  avatarFallback: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2.5,
    borderColor: COLORS.primaryMid,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    left: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    borderWidth: 2.5,
    borderColor: COLORS.white,
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primaryMid,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "right",
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "right",
    letterSpacing: 0.3,
  },

  // ── Stats strip ──
  statsStrip: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
  },

  // ── Divider ──
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 0,
  },

  // ── Menu list ──
  menuList: {
    paddingTop: 10,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginVertical: 2,
  },
  menuRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuRowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.iconBg,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primaryMid,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.white,
  },

  // ── Logout ──
  logoutContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: COLORS.dangerLight,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.danger,
  },

  // ── Footer ──
  footer: {
    paddingBottom: Platform.OS === "ios" ? 28 : 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
});

export default DrawerMenu;