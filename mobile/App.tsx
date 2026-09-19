import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { THEME } from './src/constants/theme';
import { useTransactions } from './src/hooks/useTransactions';
import { BalanceCard } from './src/components/BalanceCard';
import { CategoryFilters } from './src/components/CategoryFilters';
import { TransactionItem } from './src/components/TransactionItem';
import { AddTransactionModal } from './src/components/AddTransactionModal';
import { AnalyticsModal } from './src/components/AnalyticsModal';
import { Icon } from './src/components/Icon';

export default function App() {
  const {
    transactions,
    stats,
    categoryStats,
    addTransaction,
    deleteTransaction,
    resetToDemo,
    getTodayCategorySpent,
  } = useTransactions();

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [analyticsVisible, setAnalyticsVisible] = useState(false);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    if (selectedFilter === 'all') return transactions;
    return transactions.filter(t => t.category === selectedFilter);
  }, [transactions, selectedFilter]);

  const handleOpenAdd = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    setAddModalVisible(true);
  };

  const handleResetPress = () => {
    Alert.alert(
      'Сбросить данные',
      'Вернуть начальные демо-данные?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Сбросить', style: 'destructive', onPress: resetToDemo },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="light" />

      {/* App Header */}
      <View style={styles.appHeader}>
        <View>
          <Text style={styles.appTitle}>Бухгалтерия</Text>
          <Text style={styles.appSubtitle}>{stats.monthName}</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.resetBtn, pressed && styles.resetBtnPressed]}
          onPress={handleResetPress}
          hitSlop={8}
        >
          <Icon name="trash" size={16} color={THEME.colors.labelTertiary} />
        </Pressable>
      </View>

      {/* Balance Card (Pinned Top) */}
      <BalanceCard
        balance={stats.balance}
        totalSpentMonth={stats.totalSpentMonth}
        dailyAvg={stats.dailyAvg}
        monthName={stats.monthName}
        onOpenAnalytics={() => setAnalyticsVisible(true)}
      />

      {/* Category Filter Chips */}
      <CategoryFilters
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Операции</Text>
        <Text style={styles.sectionCount}>
          {filteredTransactions.length} {filteredTransactions.length === 1 ? 'запись' : 'записей'}
        </Text>
      </View>

      {/* Isolated Scrollable Transactions List */}
      <View style={styles.listContainer}>
        {filteredTransactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>Ничего не найдено</Text>
            <Text style={styles.emptySubtitle}>
              В этой категории пока нет записей
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTransactions}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <TransactionItem
                transaction={item}
                isLast={index === filteredTransactions.length - 1}
                onDelete={deleteTransaction}
              />
            )}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Floating Action Button (FAB) */}
      <View style={styles.fabContainer}>
        <Pressable
          style={({ pressed }) => [styles.fabBtn, pressed && styles.fabBtnPressed]}
          onPress={handleOpenAdd}
          accessibilityLabel="Добавить операцию"
        >
          <View style={styles.fabIconCircle}>
            <Icon name="plus" size={14} color="#000000" strokeWidth={3} />
          </View>
          <Text style={styles.fabText}>Добавить</Text>
        </Pressable>
      </View>

      {/* Add Transaction Sheet Modal */}
      <AddTransactionModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAddTransaction={addTransaction}
        getTodayCategorySpent={getTodayCategorySpent}
      />

      {/* Analytics Modal */}
      <AnalyticsModal
        visible={analyticsVisible}
        onClose={() => setAnalyticsVisible(false)}
        stats={stats}
        categoryStats={categoryStats}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.label,
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: THEME.colors.labelSecondary,
    textTransform: 'capitalize',
  },
  resetBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.fill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnPressed: {
    opacity: 0.7,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.label,
    letterSpacing: -0.3,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.labelTertiary,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flatList: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.radius.card,
    borderWidth: 0.5,
    borderColor: THEME.colors.border,
  },
  flatListContent: {
    paddingBottom: 85,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME.colors.label,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: THEME.colors.labelSecondary,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    zIndex: 20,
  },
  fabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.cardSecondary,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: THEME.radius.pill,
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
  fabBtnPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  fabIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: THEME.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: THEME.colors.label,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});
