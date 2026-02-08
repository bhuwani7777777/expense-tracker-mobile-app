import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.5:5000'; // Replace with your PC IP

export default function EditExpenseScreen({ route, navigation }: any) {
  const { expense } = route.params;
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount.toString());

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/expenses/${expense.id}`, {
        title,
        amount: parseFloat(amount),
      });
      Alert.alert('Success', 'Expense updated!');
      navigation.navigate('ExpenseList');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not update expense');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text>Edit Amount:</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />

      <Button title="Update Expense" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
