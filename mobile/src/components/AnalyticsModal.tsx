import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { THEME } from '../constants/theme';
import { Category } from '../types';
import { Icon } from './Icon';

interface CategoryStat extends Category {
  amount: number;
  percentage: number;
}

interface AnalyticsModalProps {
  visible: boolean;
  onClose: () => void;
  stats: {
    balance: number;
    totalSpentMonth: number;
    totalIncomeMonth: number;
    dailyAvg: number;
    monthName: string;
    txCount: number;
  };
  categoryStats: CategoryStat[];
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
  visible,
  onClose,
  stats,
  categoryStats,
}) => {
  const formatMoney = (val: number) => {
    return val.toLocaleString('ru-RU') + ' ₽';
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
            <Text style={styles.title}>Аналитика расходов</Text>
            <Pressable
              style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
              onPress={onClose}
              hitSlop={10}
            >
              <Icon name="close" size={16} color={THEME.colors.labelSecondary} strokeWidth={2.5} />
            </Pressable>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* 2x2 Grid of Key Metrics */}
            <View style={styles.grid}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Расходы за {stats.monthName}</Text>
                <Text style={[styles.statValue, { color: THEME.colors.expense }]}>
                  {formatMoney(stats.totalSpentMonth)}
                </Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Доходы за {stats.monthName}</Text>
                <Text style={[styles.statValue, { color: THEME.colors.income }]}>
                  {formatMoney(stats.totalIncomeMonth)}
                </Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Текущий баланс</Text>
                <Text style={[styles.statValue, { color: THEME.colors.label }]}>
                  {formatMoney(stats.balance)}
                </Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Среднее в день</Text>
                <Text style={[styles.statValue, { color: THEME.colors.label }]}>
                  ~{formatMoney(stats.dailyAvg)}
                </Text>
              </View>
            </View>

            {/* Section: Category Distribution */}
            <Text style={styles.sectionTitle}>Распределение по категориям</Text>

            <View style={styles.categoriesList}>
              {categoryStats.map(cat => (
                <View key={cat.id} style={styles.catRow}>
                  <View style={styles.catTopRow}>
                    <View style={styles.catLeft}>
                      <View style={[styles.catIconBadge, { backgroundColor: cat.color }]}>
                        <Icon name={cat.icon} size={14} color="#000000" strokeWidth={2.2} />
                      </View>
                      <Text style={styles.catName}>{cat.name}</Text>
                    </View>

                    <View style={styles.catRight}>
                      <Text style={styles.catAmount}>{formatMoney(cat.amount)}</Text>
                      <Text style={styles.catPercentage}>{cat.percentage}%</Text>
                    </View>
                  </View>

                  {/* Progress Bar */}
                  <View style={styles.progressBarTrack}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${Math.max(cat.percentage, cat.amount > 0 ? 3 : 0)}%`,
                          backgroundColor: cat.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  sheetContainer: {
    backgroundColor: THEME.colors.card,
    borderTopLeftRadius: THEME.radius.sheet,
    borderTopRightRadius: THEME.radius.sheet,
    borderTopWidth: 0.5,
    borderTopColor: THEME.colors.border,
    maxHeight: '82%',
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
  content: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: THEME.colors.cardSecondary,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    borderRadius: THEME.radius.md,
    padding: 12,
  },
  statLabel: {
    fontSize: 11,
    color: THEME.colors.labelTertiary,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 17,
    fontWeight: '700',
    ...THEME.typography.tabularNums,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.labelSecondary,
    marginBottom: 12,
  },
  categoriesList: {
    backgroundColor: THEME.colors.cardSecondary,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    borderRadius: THEME.radius.card,
    padding: 14,
    gap: 14,
  },
  catRow: {
    gap: 6,
  },
  catTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  catIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.label,
  },
  catRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  catAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.label,
    ...THEME.typography.tabularNums,
  },
  catPercentage: {
    fontSize: 12,
    fontWeight: '500',
    color: THEME.colors.labelTertiary,
    minWidth: 32,
    textAlign: 'right',
  },
  progressBarTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});
