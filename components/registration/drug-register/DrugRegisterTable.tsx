import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { Card } from '../../ui/Card';
import { DataTable } from '../../tables/DataTable';
import { Button } from '../../ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface DrugRecord {
  id: string;
  drugName: string;
  batchNumber: string;
  expiryDate: string;
  quantity: string;
  supplier: string;
  dateReceived: string;
  cost: string;
  withdrawalPeriod: string;
}

interface DrugRegisterTableProps {
  data: DrugRecord[];
  onAdd: () => void;
  onEdit: (record: DrugRecord) => void;
  onDelete: (id: string) => void;
}

export function DrugRegisterTable({ data, onAdd, onEdit, onDelete }: DrugRegisterTableProps) {
  const columns = [
    { key: 'drugName', title: 'Drug Name', width: 120 },
    { key: 'batchNumber', title: 'Batch #', width: 100 },
    { key: 'expiryDate', title: 'Expiry', width: 100 },
    { key: 'quantity', title: 'Quantity', width: 80 },
    { key: 'supplier', title: 'Supplier', width: 100 },
    { key: 'dateReceived', title: 'Received', width: 100 },
    { key: 'cost', title: 'Cost', width: 80 },
    { key: 'withdrawalPeriod', title: 'Withdrawal', width: 100 },
    {
      key: 'actions',
      title: 'Actions',
      width: 120,
      render: (value: any, record: DrugRecord) => (
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
          Drug Register
        </Text>
        <Button
          variant="primary"
          size="sm"
          startIcon={<Plus size={16} color={Colors.white} />}
          onPress={onAdd}
        >
          Add Drug
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