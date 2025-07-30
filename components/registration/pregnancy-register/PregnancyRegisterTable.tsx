import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { Card } from '../../ui/Card';
import { DataTable } from '../../tables/DataTable';
import { Button } from '../../ui/Button';
import { Plus, CreditCard as Edit, Trash2 } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface PregnancyRecord {
  id: string;
  animalTag: string;
  breedingDate: string;
  bullUsed: string;
  pregnancyCheckDate: string;
  pregnancyStatus: string;
  expectedCalvingDate: string;
  actualCalvingDate: string;
  calfTag: string;
  calvingDifficulty: string;
  notes: string;
}

interface PregnancyRegisterTableProps {
  data: PregnancyRecord[];
  onAdd: () => void;
  onEdit: (record: PregnancyRecord) => void;
  onDelete: (id: string) => void;
}

export function PregnancyRegisterTable({ data, onAdd, onEdit, onDelete }: PregnancyRegisterTableProps) {
  const columns = [
    { key: 'animalTag', title: 'Animal Tag', width: 100 },
    { key: 'breedingDate', title: 'Breeding Date', width: 110 },
    { key: 'bullUsed', title: 'Bull Used', width: 100 },
    { key: 'pregnancyCheckDate', title: 'PD Date', width: 100 },
    { key: 'pregnancyStatus', title: 'Status', width: 80 },
    { key: 'expectedCalvingDate', title: 'Expected', width: 100 },
    { key: 'actualCalvingDate', title: 'Actual', width: 100 },
    { key: 'calfTag', title: 'Calf Tag', width: 80 },
    { key: 'calvingDifficulty', title: 'Difficulty', width: 100 },
    {
      key: 'actions',
      title: 'Actions',
      width: 120,
      render: (value: any, record: PregnancyRecord) => (
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
          Pregnancy & Calving Register
        </Text>
        <Button
          variant="primary"
          size="sm"
          startIcon={<Plus size={16} color={Colors.white} />}
          onPress={onAdd}
        >
          Add Record
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