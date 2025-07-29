import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { Card } from '../../ui/Card';
import { DataTable } from '../../tables/DataTable';
import { Button } from '../../ui/Button';
import { Plus, CreditCard as Edit, Trash2 } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface HeatDetectionRecord {
  id: string;
  animalTag: string;
  heatDate: string;
  observer: string;
  intensity: string;
  breedingDate: string;
  bullUsed: string;
  notes: string;
}

interface HeatDetectionTableProps {
  data: HeatDetectionRecord[];
  onAdd: () => void;
  onEdit: (record: HeatDetectionRecord) => void;
  onDelete: (id: string) => void;
}

export function HeatDetectionTable({ data, onAdd, onEdit, onDelete }: HeatDetectionTableProps) {
  const columns = [
    { key: 'animalTag', title: 'Animal Tag', width: 100 },
    { key: 'heatDate', title: 'Heat Date', width: 100 },
    { key: 'observer', title: 'Observer', width: 100 },
    { key: 'intensity', title: 'Intensity', width: 80 },
    { key: 'breedingDate', title: 'Breeding Date', width: 100 },
    { key: 'bullUsed', title: 'Bull Used', width: 100 },
    { key: 'notes', title: 'Notes', width: 120 },
    {
      key: 'actions',
      title: 'Actions',
      width: 120,
      render: (value: any, record: HeatDetectionRecord) => (
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
          Heat Detection & Breeding Record
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