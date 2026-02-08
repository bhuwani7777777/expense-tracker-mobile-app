import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ExpenseCard from '../components/ExpenseCard';

const BASE_URL = 'http://192.168.1.5:5000'; // Replace with your PC IP

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

export default function ExpenseListScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigation = useNavigation<any>();

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/expenses`);
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      Alert.alert('Error', 'Could not delete expense');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseCard
            expense={item}
            onEdit={() => navigation.navigate('EditExpense', { expense: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });
