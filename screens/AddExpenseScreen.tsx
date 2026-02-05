import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AddExpenseScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async () => {
    if (!title || !amount) {
      Alert.alert('Error', 'Please enter both title and amount');
      return;
    }

    try {
      await axios.post('http://localhost:5000/expenses', { title, amount: parseFloat(amount) });
      Alert.alert('Success', 'Expense added!');
      setTitle('');
      setAmount('');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not add expense');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Expense Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g., Lunch" />

      <Text>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="e.g., 500"
      />

      <Button title="Add Expense" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
