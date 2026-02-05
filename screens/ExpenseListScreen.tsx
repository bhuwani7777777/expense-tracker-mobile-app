import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

export default function ExpenseListScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/expenses');
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Amount: ₹{item.amount}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  expenseCard: { padding: 15, borderWidth: 1, borderColor: '#ccc', marginBottom: 10, borderRadius: 5 },
  title: { fontWeight: 'bold', fontSize: 16 },
});
