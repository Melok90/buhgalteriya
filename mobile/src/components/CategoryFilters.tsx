import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { THEME } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';

interface CategoryFiltersProps {
  selectedFilter: string;
  onSelectFilter: (catId: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedFilter,
  onSelectFilter,
}) => {
  const handlePress = (id: string) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    onSelectFilter(id);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 'Все' filter chip */}
        <Pressable
          style={({ pressed }) => [
            styles.chip,
            selectedFilter === 'all' && styles.chipActive,
            pressed && styles.chipPressed,
          ]}
          onPress={() => handlePress('all')}
        >
          <Text
            style={[
              styles.chipText,
              selectedFilter === 'all' && styles.chipTextActive,
            ]}
          >
            Все
          </Text>
        </Pressable>

        {/* Categories */}
        {CATEGORIES.map(cat => {
          const isActive = selectedFilter === cat.id;
          return (
            <Pressable
              key={cat.id}
              style={({ pressed }) => [
                styles.chip,
                isActive && styles.chipActive,
                pressed && styles.chipPressed,
              ]}
              onPress={() => handlePress(cat.id)}
            >
              <View style={[styles.colorDot, { backgroundColor: cat.color }]} />
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 6,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    paddingHorizontal: 11,
    borderRadius: THEME.radius.pill,
    backgroundColor: THEME.colors.fill,
    borderWidth: 0.5,
    borderColor: THEME.colors.borderLight,
    gap: 5,
  },
  chipActive: {
    backgroundColor: THEME.colors.cardTertiary,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  chipPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
  colorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: '500',
    color: THEME.colors.labelSecondary,
  },
  chipTextActive: {
    color: THEME.colors.label,
    fontWeight: '600',
  },
});
