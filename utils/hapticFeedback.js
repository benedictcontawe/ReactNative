import { Platform, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';
/**
 * Triggers a light haptic feedback, ideal for a shutter click.
 * Uses Vibration API on Android (more reliable) and Haptics on iOS
 */
export const triggerShutterHaptic = async () => {
  try {
    if (Platform.OS === 'android') {// Synchronous - returns immediately
      Vibration.vibrate(200);// No need to await on Android
    } else {// iOS haptics are async but we don't need to wait
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  } catch (error) {
    console.log('Haptic feedback error:', error);
  }
};
/**
 * Triggers a medium haptic feedback, ideal for starting/stopping an action.
 * Uses Vibration API on Android and Haptics on iOS
 */
export const triggerRecordingHaptic = async () => {
  try {
    if (Platform.OS === 'android') {//Use Vibration API for Android
      Vibration.vibrate(50);//50ms vibration for recording
    } else {// Use Haptics for iOS
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  } catch (error) {
    console.log('Haptic feedback error:', error);
  }
};
/**
 * Triggers a success haptic feedback
 */
export const triggerSuccessHaptic = async () => {
  try {
    if (Platform.OS === 'android') {// Pattern vibration for success: [delay, vibrate, delay, vibrate]
      Vibration.vibrate([0, 50, 100, 50]);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  } catch (error) {
    console.log('Haptic feedback error:', error);
  }
};