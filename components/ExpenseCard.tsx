import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ExpenseCard({ expense, onEdit, onDelete }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{expense.title}</Text>
      <Text>Amount: ₹{expense.amount}</Text>
      <Text>Date: {new Date(expense.date).toLocaleDateString()}</Text>
      <View style={styles.buttons}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
