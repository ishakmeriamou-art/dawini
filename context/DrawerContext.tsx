/**
 * DrawerContext.tsx
 * Context عالمي للتحكم بفتح/إغلاق القائمة الجانبية من أي مكان في التطبيق
 */

import React, { createContext, useContext, useState, useCallback } from "react";

interface DrawerContextType {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType>({
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: () => {},
});

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(
    () => setIsDrawerOpen((prev) => !prev),
    []
  );

  return (
    <DrawerContext.Provider
      value={{ isDrawerOpen, openDrawer, closeDrawer, toggleDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

/** Hook مختصر للاستخدام في أي مكون */
export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used inside DrawerProvider");
  return ctx;
};