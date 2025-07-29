import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { Card } from '../../ui/Card';
import { DataTable } from '../../tables/DataTable';
import { Button } from '../../ui/Button';
import { Plus, CreditCard as Edit, Trash2 } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface HerdRecord {
  id: string;
  tagNumber: string;
  breed: string;
  dateOfBirth: string;
  sex: string;
  dam: string;
  sire: string;
  weight: string;
  status: string;
}

interface HerdRegisterTableProps {
  data: HerdRecord[];
  onAdd: () => void;
  onEdit: (record: HerdRecord) => void;
  onDelete: (id: string) => void;
}

export function HerdRegisterTable({ data, onAdd, onEdit, onDelete }: HerdRegisterTableProps) {
  const columns = [
    { key: 'tagNumber', title: 'Tag #', width: 80 },
    { key: 'breed', title: 'Breed', width: 100 },
    { key: 'dateOfBirth', title: 'DOB', width: 100 },
    { key: 'sex', title: 'Sex', width: 60 },
    { key: 'dam', title: 'Dam', width: 80 },
    { key: 'sire', title: 'Sire', width: 80 },
    { key: 'weight', title: 'Weight', width: 80 },
    { key: 'status', title: 'Status', width: 80 },
    {
      key: 'actions',
      title: 'Actions',
      width: 120,
      render: (value: any, record: HerdRecord) => (
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
          Herd Register
        </Text>
        <Button
          variant="primary"
          size="sm"
          startIcon={<Plus size={16} color={Colors.white} />}
          onPress={onAdd}
        >
          Add Animal
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