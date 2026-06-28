/**
 * useDrawerGesture.ts
 * Hook للتعامل مع إيماءة السحب لفتح/إغلاق القائمة الجانبية
 */

import { useRef, useCallback } from "react";
import { PanResponder, GestureResponderEvent, PanResponderGestureState } from "react-native";

interface UseDrawerGestureOptions {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  /** الحد الأدنى للسحب بالبكسل لتفعيل فتح القائمة من الحافة */
  openThreshold?: number;
  /** الحد الأدنى للسحب بالبكسل لإغلاق القائمة */
  closeThreshold?: number;
  /** منطقة الحافة من اليمين بالبكسل لتفعيل فتح القائمة */
  edgeZone?: number;
}

/**
 * يُرجع panHandlers يمكن ربطها بـ View رئيسية
 * لاكتشاف إيماءة السحب لفتح/إغلاق الـ Drawer
 */
export const useDrawerGesture = ({
  onOpen,
  onClose,
  isOpen,
  openThreshold = 60,
  closeThreshold = 50,
  edgeZone = 30,
}: UseDrawerGestureOptions) => {
  const startX = useRef<number>(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (
        e: GestureResponderEvent,
        _: PanResponderGestureState
      ) => {
        const touchX = e.nativeEvent.pageX;
        // فقط إذا كان اللمس في حافة اليمين لفتح القائمة
        if (!isOpen && touchX > window.innerWidth - edgeZone) return true;
        // أو إذا كانت القائمة مفتوحة لتفعيل إغلاقها
        if (isOpen) return true;
        return false;
      },
      onMoveShouldSetPanResponder: (
        _: GestureResponderEvent,
        gs: PanResponderGestureState
      ) => {
        // تفعيل فقط للحركة الأفقية
        return Math.abs(gs.dx) > Math.abs(gs.dy) * 2;
      },
      onPanResponderGrant: (e: GestureResponderEvent) => {
        startX.current = e.nativeEvent.pageX;
      },
      onPanResponderRelease: (
        _: GestureResponderEvent,
        gs: PanResponderGestureState
      ) => {
        if (!isOpen && gs.dx < -openThreshold) {
          onOpen(); // سحب لليسار = فتح (RTL)
        } else if (isOpen && gs.dx > closeThreshold) {
          onClose(); // سحب لليمين = إغلاق (RTL)
        }
      },
    })
  ).current;

  return panResponder.panHandlers;
};