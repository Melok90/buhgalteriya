import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Category } from '../types';
import { THEME } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';
import { Icon } from './Icon';

interface CategoryPickerModalProps {
  visible: boolean;
  selectedCategoryId: string;
  onSelectCategory: (category: Category) => void;
  onClose: () => void;
  getTodayCategorySpent: (catId: string) => number;
}

export const CategoryPickerModal: React.FC<CategoryPickerModalProps> = ({
  visible,
  selectedCategoryId,
  onSelectCategory,
  onClose,
  getTodayCategorySpent,
}) => {
  const handleSelect = (category: Category) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    onSelectCategory(category);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        
        <View style={styles.sheetContainer}>
          {/* Pull Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Выбор категории</Text>
            <Pressable
              style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
              onPress={onClose}
              hitSlop={10}
            >
              <Icon name="close" size={16} color={THEME.colors.labelSecondary} strokeWidth={2.5} />
            </Pressable>
          </View>

          {/* Categories List */}
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {CATEGORIES.map(cat => {
              const isSelected = cat.id === selectedCategoryId;
              const todaySpent = getTodayCategorySpent(cat.id);

              return (
                <Pressable
                  key={cat.id}
                  style={({ pressed }) => [
                    styles.catItem,
                    isSelected && styles.catItemSelected,
                    pressed && styles.catItemPressed,
                  ]}
                  onPress={() => handleSelect(cat)}
                >
                  <View style={[styles.iconBadge, { backgroundColor: cat.color }]}>
                    <Icon name={cat.icon} size={18} color="#000000" strokeWidth={2.2} />
                  </View>

                  <View style={styles.catInfo}>
                    <Text style={styles.catName}>{cat.name}</Text>
                    <Text style={styles.catSubtitle}>
                      Сегодня · {todaySpent.toLocaleString('ru-RU')} ₽
                    </Text>
                  </View>

                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Icon name="check" size={15} color={THEME.colors.accent} strokeWidth={3} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  sheetContainer: {
    backgroundColor: THEME.colors.card,
    borderTopLeftRadius: THEME.radius.sheet,
    borderTopRightRadius: THEME.radius.sheet,
    borderTopWidth: 0.5,
    borderTopColor: THEME.colors.border,
    maxHeight: '75%',
    paddingBottom: 28,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  handle: {
    width: 38,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: THEME.colors.borderLight,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.label,
    letterSpacing: -0.3,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  list: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  listContent: {
    paddingBottom: 20,
    gap: 6,
  },
  catItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: THEME.radius.md,
    backgroundColor: 'transparent',
  },
  catItemSelected: {
    backgroundColor: THEME.colors.cardSecondary,
  },
  catItemPressed: {
    backgroundColor: THEME.colors.fillSecondary,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  catInfo: {
    flex: 1,
  },
  catName: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.label,
    marginBottom: 2,
  },
  catSubtitle: {
    fontSize: 12,
    color: THEME.colors.labelTertiary,
  },
  checkBadge: {
    marginLeft: 8,
  },
});
