import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

export default function AnalyticsScreen() {
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

  // Prepare chart data
  const sortedExpenses = expenses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const labels = sortedExpenses.map((e) => new Date(e.date).toLocaleDateString());
  const data = sortedExpenses.map((e) => e.amount);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expenses Trend</Text>
      {data.length > 0 ? (
        <LineChart
          data={{
            labels,
            datasets: [{ data }],
          }}
          width={Dimensions.get('window').width - 20}
          height={220}
          yAxisLabel="₹"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0,0,255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      ) : (
        <Text>No data yet</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
});
