import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Category, TransactionType } from '../types';
import { THEME } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';
import { Icon } from './Icon';
import { CategoryPickerModal } from './CategoryPickerModal';

interface AddTransactionModalProps {
  visible: boolean;
  initialType?: TransactionType;
  onClose: () => void;
  onAddTransaction: (
    amount: number,
    type: TransactionType,
    category: string,
    comment?: string
  ) => void;
  getTodayCategorySpent: (catId: string) => number;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  initialType = 'expense',
  onClose,
  onAddTransaction,
  getTodayCategorySpent,
}) => {
  const [type, setType] = useState<TransactionType>(initialType);
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]);
  const [amountBuffer, setAmountBuffer] = useState<string>('0');
  const [comment, setComment] = useState<string>('');
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setType(initialType);
      setAmountBuffer('0');
      setComment('');
      setSelectedCategory(CATEGORIES[0]);
    }
  }, [visible, initialType]);

  const handleTypeChange = (newType: TransactionType) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    setType(newType);
  };

  const handleKeyPress = (key: string) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    setAmountBuffer(prev => {
      if (key === 'backspace') {
        if (prev.length <= 1 || prev === '0') return '0';
        return prev.slice(0, -1);
      }

      if (key === '.') {
        if (prev.includes('.')) return prev;
        return prev + '.';
      }

      // Max length
      if (prev.replace('.', '').length >= 9) return prev;

      if (prev === '0') {
        return key;
      }

      // Max 2 decimal digits
      const dotIndex = prev.indexOf('.');
      if (dotIndex !== -1 && prev.length - dotIndex > 2) {
        return prev;
      }

      return prev + key;
    });
  };

  // Format display amount with thousands separator
  const formattedDisplay = () => {
    if (!amountBuffer || amountBuffer === '0') return '0';
    const parts = amountBuffer.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
  };

  const parsedAmount = parseFloat(amountBuffer.replace(/\s+/g, '')) || 0;
  const isSubmitDisabled = parsedAmount <= 0;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    onAddTransaction(parsedAmount, type, selectedCategory.id, comment);
    onClose();
  };

  const todaySpent = getTodayCategorySpent(selectedCategory.id);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.sheetContainer}
        >
          {/* Pull Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Header: Centered Type Switcher + Absolute Top-Right Close Button */}
          <View style={styles.header}>
            <View style={styles.segmentedContainer}>
              {/* Expense Button */}
              <Pressable
                style={({ pressed }) => [
                  styles.segmentBtn,
                  type === 'expense' && styles.segmentBtnActive,
                  pressed && styles.segmentBtnPressed,
                ]}
                onPress={() => handleTypeChange('expense')}
              >
                <View
                  style={[
                    styles.typeBadge,
                    type === 'expense'
                      ? styles.typeBadgeExpenseActive
                      : styles.typeBadgeExpenseInactive,
                  ]}
                >
                  <Icon
                    name="minus"
                    size={11}
                    color={type === 'expense' ? '#ffffff' : THEME.colors.expense}
                    strokeWidth={3.5}
                  />
                </View>
                <Text
                  style={[
                    styles.segmentBtnText,
                    type === 'expense' && styles.segmentBtnTextActive,
                  ]}
                >
                  Расход
                </Text>
              </Pressable>

              {/* Income Button */}
              <Pressable
                style={({ pressed }) => [
                  styles.segmentBtn,
                  type === 'income' && styles.segmentBtnActive,
                  pressed && styles.segmentBtnPressed,
                ]}
                onPress={() => handleTypeChange('income')}
              >
                <View
                  style={[
                    styles.typeBadge,
                    type === 'income'
                      ? styles.typeBadgeIncomeActive
                      : styles.typeBadgeIncomeInactive,
                  ]}
                >
                  <Icon
                    name="plus"
                    size={11}
                    color={type === 'income' ? '#ffffff' : THEME.colors.income}
                    strokeWidth={3.5}
                  />
                </View>
                <Text
                  style={[
                    styles.segmentBtnText,
                    type === 'income' && styles.segmentBtnTextActive,
                  ]}
                >
                  Пополнение
                </Text>
              </Pressable>
            </View>

            {/* Close Button strictly in the top right corner */}
            <Pressable
              style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
              onPress={onClose}
              hitSlop={10}
              accessibilityLabel="Закрыть"
            >
              <Icon name="close" size={16} color={THEME.colors.labelSecondary} strokeWidth={2.5} />
            </Pressable>
          </View>

          {/* Amount Display */}
          <View style={styles.amountContainer}>
            <View style={styles.amountRow}>
              <Text style={styles.amountValue}>{formattedDisplay()}</Text>
              <Text style={styles.currencySign}> ₽</Text>
            </View>
          </View>

          {/* Selected Category Card */}
          <Pressable
            style={({ pressed }) => [
              styles.categoryCard,
              pressed && styles.categoryCardPressed,
            ]}
            onPress={() => setPickerVisible(true)}
          >
            <View style={[styles.categoryBadge, { backgroundColor: selectedCategory.color }]}>
              <Icon name={selectedCategory.icon} size={18} color="#000000" strokeWidth={2.2} />
            </View>

            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{selectedCategory.name}</Text>
              <Text style={styles.categorySubtitle}>
                Сегодня · {todaySpent.toLocaleString('ru-RU')} ₽
              </Text>
            </View>

            <Icon name="chevronRight" size={18} color={THEME.colors.labelTertiary} />
          </Pressable>

          {/* Optional Comment Row */}
          <View style={styles.commentRow}>
            <Icon name="plus" size={16} color={THEME.colors.labelTertiary} />
            <TextInput
              style={styles.commentInput}
              placeholder="Комментарий (необязательно)"
              placeholderTextColor={THEME.colors.labelTertiary}
              value={comment}
              onChangeText={setComment}
              returnKeyType="done"
              maxLength={60}
            />
          </View>

          {/* 3x4 Calculator Keypad */}
          <View style={styles.keypad}>
            {[
              ['1', '2', '3'],
              ['4', '5', '6'],
              ['7', '8', '9'],
              ['.', '0', 'backspace'],
            ].map((row, rIdx) => (
              <View key={rIdx} style={styles.keypadRow}>
                {row.map(key => (
                  <Pressable
                    key={key}
                    style={({ pressed }) => [
                      styles.keypadBtn,
                      pressed && styles.keypadBtnPressed,
                    ]}
                    onPress={() => handleKeyPress(key)}
                  >
                    {key === 'backspace' ? (
                      <Icon name="backspace" size={24} color={THEME.colors.label} />
                    ) : (
                      <Text style={styles.keypadBtnText}>{key}</Text>
                    )}
                  </Pressable>
                ))}
              </View>
            ))}
          </View>

          {/* Main Action Submit Button */}
          <View style={styles.submitContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.submitBtn,
                isSubmitDisabled && styles.submitBtnDisabled,
                pressed && !isSubmitDisabled && styles.submitBtnPressed,
              ]}
              disabled={isSubmitDisabled}
              onPress={handleSubmit}
            >
              <Text style={styles.submitBtnText}>
                {type === 'expense'
                  ? `Добавить расход · ${formattedDisplay()} ₽`
                  : `Пополнить · ${formattedDisplay()} ₽`}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>

        {/* Category Picker Submodal */}
        <CategoryPickerModal
          visible={pickerVisible}
          selectedCategoryId={selectedCategory.id}
          onSelectCategory={setSelectedCategory}
          onClose={() => setPickerVisible(false)}
          getTodayCategorySpent={getTodayCategorySpent}
        />
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  sheetContainer: {
    backgroundColor: THEME.colors.card,
    borderTopLeftRadius: THEME.radius.sheet,
    borderTopRightRadius: THEME.radius.sheet,
    borderTopWidth: 0.5,
    borderTopColor: THEME.colors.border,
    paddingHorizontal: 20,
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    marginBottom: 8,
  },
  segmentedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.segmentedBg,
    borderRadius: THEME.radius.pill,
    padding: 3,
    gap: 3,
    borderWidth: 0.5,
    borderColor: THEME.colors.borderLight,
  },
  segmentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: THEME.radius.pill,
    gap: 7,
  },
  segmentBtnActive: {
    backgroundColor: THEME.colors.cardTertiary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
  },
  segmentBtnPressed: {
    transform: [{ scale: 0.96 }],
  },
  segmentBtnText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: THEME.colors.labelSecondary,
  },
  segmentBtnTextActive: {
    color: THEME.colors.label,
  },
  typeBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBadgeExpenseInactive: {
    backgroundColor: THEME.colors.expenseBg,
  },
  typeBadgeExpenseActive: {
    backgroundColor: THEME.colors.expense,
  },
  typeBadgeIncomeInactive: {
    backgroundColor: THEME.colors.incomeBg,
  },
  typeBadgeIncomeActive: {
    backgroundColor: THEME.colors.income,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -18 }],
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnPressed: {
    opacity: 0.7,
    transform: [{ translateY: -18 }, { scale: 0.94 }],
  },
  amountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amountValue: {
    fontSize: 48,
    fontWeight: '800',
    color: THEME.colors.label,
    letterSpacing: -1,
    ...THEME.typography.tabularNums,
  },
  currencySign: {
    fontSize: 26,
    fontWeight: '700',
    color: THEME.colors.labelSecondary,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.cardSecondary,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    borderRadius: THEME.radius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  categoryCardPressed: {
    backgroundColor: THEME.colors.cardTertiary,
    transform: [{ scale: 0.99 }],
  },
  categoryBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.label,
    marginBottom: 2,
  },
  categorySubtitle: {
    fontSize: 12,
    color: THEME.colors.labelTertiary,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.fill,
    borderRadius: THEME.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: THEME.colors.label,
    padding: 0,
  },
  keypad: {
    marginBottom: 12,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  keypadBtn: {
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    borderRadius: THEME.radius.sm,
  },
  keypadBtnPressed: {
    backgroundColor: THEME.colors.fillSecondary,
  },
  keypadBtnText: {
    fontSize: 26,
    fontWeight: '500',
    color: THEME.colors.label,
    ...THEME.typography.tabularNums,
  },
  submitContainer: {
    marginTop: 2,
  },
  submitBtn: {
    backgroundColor: THEME.colors.white,
    borderRadius: THEME.radius.pill,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.4,
  },
  submitBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  submitBtnText: {
    color: THEME.colors.black,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
