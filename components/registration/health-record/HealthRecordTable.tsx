import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { Card } from '../../ui/Card';
import { DataTable } from '../../tables/DataTable';
import { Button } from '../../ui/Button';
import { Plus, CreditCard as Edit, Trash2 } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface HealthRecord {
  id: string;
  animalTag: string;
  treatmentDate: string;
  treatmentType: string;
  diagnosis: string;
  treatment: string;
  veterinarian: string;
  drugUsed: string;
  dosage: string;
  withdrawalPeriod: string;
  followUpDate: string;
  notes: string;
}

interface HealthRecordTableProps {
  data: HealthRecord[];
  onAdd: () => void;
  onEdit: (record: HealthRecord) => void;
  onDelete: (id: string) => void;
}

export function HealthRecordTable({ data, onAdd, onEdit, onDelete }: HealthRecordTableProps) {
  const columns = [
    { key: 'animalTag', title: 'Animal Tag', width: 100 },
    { key: 'treatmentDate', title: 'Date', width: 100 },
    { key: 'treatmentType', title: 'Type', width: 100 },
    { key: 'diagnosis', title: 'Diagnosis', width: 120 },
    { key: 'treatment', title: 'Treatment', width: 120 },
    { key: 'veterinarian', title: 'Veterinarian', width: 120 },
    { key: 'drugUsed', title: 'Drug Used', width: 100 },
    { key: 'dosage', title: 'Dosage', width: 80 },
    { key: 'withdrawalPeriod', title: 'Withdrawal', width: 100 },
    { key: 'followUpDate', title: 'Follow Up', width: 100 },
    {
      key: 'actions',
      title: 'Actions',
      width: 120,
      render: (value: any, record: HealthRecord) => (
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
          Health Record
        </Text>
        <Button
          variant="primary"
          size="sm"
          startIcon={<Plus size={16} color={Colors.white} />}
          onPress={onAdd}
        >
          Add Treatment
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