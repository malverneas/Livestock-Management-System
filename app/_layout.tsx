import { Stack } from 'expo-router';
import { Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../contexts/AuthContext';
import { HerdProvider } from '../contexts/HerdContext';
import { CalfProvider } from '../contexts/CalfContext';
import { WeightRecordsProvider } from '../contexts/WeightRecordsContext';
import Colors from '../constants/Colors'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  const androidStatusBarHeight = RNStatusBar.currentHeight || 0;

  // Set Android status bar color
  if (Platform.OS === 'android') {
    RNStatusBar.setBackgroundColor('transparent');
    RNStatusBar.setTranslucent(true);
    RNStatusBar.setBarStyle('dark-content');
  }

  return (
    <AuthProvider>
      <HerdProvider>
        <CalfProvider>
          <WeightRecordsProvider>
            <Stack
            screenOptions={{
              headerTitleStyle: {
                fontFamily: 'System',
                fontSize: 18,
                fontWeight: '600',
              },
              headerShadowVisible: false,
              headerTintColor: Colors.neutral[900],
              headerTitleContainerStyle: Platform.select({
                android: {
                  paddingTop: androidStatusBarHeight,
                },
                default: undefined,
              }),
              headerStyle: Platform.select({
                android: {
                  height: 80 + androidStatusBarHeight,
                  backgroundColor: Colors.white,
                },
                default: {
                  height: 64,
                  backgroundColor: Colors.white,
                },
              }),
              contentStyle: Platform.select({
                android: {
                  paddingTop: androidStatusBarHeight,
                  backgroundColor: Colors.neutral[50],
                },
                default: {
                  backgroundColor: Colors.neutral[50],
                },
              }),
            }}
          >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
          </Stack>
          <StatusBar style="dark" />
          </WeightRecordsProvider>WeightRecordsProvider>
        </CalfProvider>
      </HerdProvider>
    </AuthProvider>
  );
}
  )
}