/**
 * More Screen - Meny för Progress, Goals, Community och Settings
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@context/ThemeContext';
import { useAuth } from '@context/AuthContext';
import { SPACING, FONT_SIZES, ICON_SIZES, BORDER_RADIUS } from '@constants/sizes';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  color: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, subtitle, color, onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: theme.surface }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={ICON_SIZES.lg} color={color} />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={ICON_SIZES.md} color={theme.textSecondary} />
    </TouchableOpacity>
  );
};

export const MoreScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Mer</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Användarinfo */}
        <View style={[styles.profileSection, { backgroundColor: theme.surface }]}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.text }]}>{user?.name}</Text>
            <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>{user?.email}</Text>
          </View>
        </View>

        {/* Meny-items */}
        <View style={styles.menuSection}>
          <MenuItem
            icon="trending-up-outline"
            title="Progress"
            subtitle="Se dina framsteg och statistik"
            color="#4CAF50"
            onPress={() => console.log('Progress')}
          />

          <MenuItem
            icon="trophy-outline"
            title="Mål"
            subtitle="Sätt och följ dina hälsomål"
            color="#FF9800"
            onPress={() => console.log('Goals')}
          />

          <MenuItem
            icon="people-outline"
            title="Community"
            subtitle="Dela och utmana vänner"
            color="#2196F3"
            onPress={() => console.log('Community')}
          />

          <MenuItem
            icon="bar-chart-outline"
            title="Hälsomått"
            subtitle="Vikt, blodtryck, blodsocker"
            color="#9C27B0"
            onPress={() => console.log('Health Metrics')}
          />

          <MenuItem
            icon="settings-outline"
            title="Inställningar"
            subtitle="Anpassa din upplevelse"
            color="#607D8B"
            onPress={() => console.log('Settings')}
          />
        </View>

        {/* Tema info */}
        <View style={styles.themeSection}>
          <Text style={[styles.themeText, { color: theme.textSecondary }]}>
            Tema: {theme === theme ? 'Ljust' : 'Mörkt'} läge
          </Text>
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>
            Version 1.0.0
          </Text>
        </View>

        {/* Logga ut knapp */}
        <TouchableOpacity
          style={[styles.logoutButton, { borderColor: theme.error }]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={ICON_SIZES.md} color={theme.error} />
          <Text style={[styles.logoutText, { color: theme.error }]}>Logga ut</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl + 20,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: FONT_SIZES.sm,
  },
  menuSection: {
    paddingHorizontal: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: FONT_SIZES.xs,
  },
  themeSection: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  themeText: {
    fontSize: FONT_SIZES.sm,
    marginBottom: SPACING.xs,
  },
  versionText: {
    fontSize: FONT_SIZES.xs,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    padding: SPACING.md,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.md,
  },
  logoutText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
});
