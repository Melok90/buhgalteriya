import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { THEME } from '../constants/theme';
import { Icon } from './Icon';

interface BalanceCardProps {
  balance: number;
  totalSpentMonth: number;
  dailyAvg: number;
  monthName: string;
  onOpenAnalytics: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  totalSpentMonth,
  dailyAvg,
  monthName,
  onOpenAnalytics,
}) => {
  const formatMoney = (val: number) => {
    return val.toLocaleString('ru-RU') + ' ₽';
  };

  const handleAnalyticsPress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    onOpenAnalytics();
  };

  const isPositive = balance >= 0;

  return (
    <View style={styles.card}>
      {/* Top row: Label + Analytics button */}
      <View style={styles.topRow}>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: isPositive ? THEME.colors.income : THEME.colors.expense }]} />
          <Text style={styles.statusText}>Доступный остаток</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.analyticsBtn,
            pressed && styles.analyticsBtnPressed,
          ]}
          onPress={handleAnalyticsPress}
          hitSlop={8}
          accessibilityLabel="Открыть аналитику"
        >
          <Icon name="analytics" size={16} color={THEME.colors.labelSecondary} />
          <Text style={styles.analyticsBtnText}>Аналитика</Text>
        </Pressable>
      </View>

      {/* Hero Balance Amount */}
      <View style={styles.balanceContainer}>
        <Text style={[styles.balanceAmount, isPositive ? styles.balancePositive : styles.balanceNegative]}>
          {formatMoney(balance)}
        </Text>
      </View>

      {/* Context Bottom Row */}
      <View style={styles.contextRow}>
        <View style={styles.contextItem}>
          <Text style={styles.contextLabel}>{monthName}</Text>
          <Text style={styles.contextValue}>{formatMoney(totalSpentMonth)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.contextItem}>
          <Text style={styles.contextLabel}>В день</Text>
          <Text style={styles.contextValue}>~{formatMoney(dailyAvg)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.card,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
    color: THEME.colors.labelSecondary,
    letterSpacing: -0.2,
  },
  analyticsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: THEME.colors.fill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: THEME.radius.pill,
  },
  analyticsBtnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  analyticsBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.labelSecondary,
  },
  balanceContainer: {
    marginVertical: 4,
  },
  balanceAmount: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
    ...THEME.typography.tabularNums,
  },
  balancePositive: {
    color: THEME.colors.label,
  },
  balanceNegative: {
    color: THEME.colors.expense,
  },
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.cardSecondary,
    borderRadius: THEME.radius.sm,
    paddingVertical: 9,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  contextItem: {
    flex: 1,
  },
  contextLabel: {
    fontSize: 11,
    color: THEME.colors.labelTertiary,
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  contextValue: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.label,
    ...THEME.typography.tabularNums,
  },
  divider: {
    width: 0.5,
    height: 22,
    backgroundColor: THEME.colors.border,
    marginHorizontal: 12,
  },
});
