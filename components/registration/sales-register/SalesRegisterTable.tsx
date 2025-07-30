import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { Card } from '../../ui/Card';
import { DataTable } from '../../tables/DataTable';
import { Button } from '../../ui/Button';
import { Plus, CreditCard as Edit, Trash2 } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface SalesRecord {
  id: string;
  animalTag: string;
  transactionDate: string;
  transactionType: string;
  buyer: string;
  weight: string;
  pricePerKg: string;
  totalPrice: string;
  paymentMethod: string;
  notes: string;
}

interface SalesRegisterTableProps {
  data: SalesRecord[];
  onAdd: () => void;
  onEdit: (record: SalesRecord) => void;
  onDelete: (id: string) => void;
}

export function SalesRegisterTable({ data, onAdd, onEdit, onDelete }: SalesRegisterTableProps) {
  const columns = [
    { key: 'animalTag', title: 'Animal Tag', width: 100 },
    { key: 'transactionDate', title: 'Date', width: 100 },
    { key: 'transactionType', title: 'Type', width: 80 },
    { key: 'buyer', title: 'Buyer/Seller', width: 120 },
    { key: 'weight', title: 'Weight', width: 80 },
    { key: 'pricePerKg', title: 'Price/kg', width: 80 },
    { key: 'totalPrice', title: 'Total', width: 80 },
    { key: 'paymentMethod', title: 'Payment', width: 100 },
    {
      key: 'actions',
      title: 'Actions',
      width: 120,
      render: (value: any, record: SalesRecord) => (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(record)}
          >
            <Edit size={16} color={Colors.primary[500]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDelete(record.id)}
          >
            <Trash2 size={16} color={Colors.error[500]} />
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text variant="h6" weight="medium">
          Sales & Purchases Register
        </Text>
        <Button
          variant="primary"
          size="sm"
          startIcon={<Plus size={16} color={Colors.white} />}
          onPress={onAdd}
        >
          Add Transaction
        </Button>
      </View>
      <DataTable columns={columns} data={data} />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
});