import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { Card } from '../../ui/Card';
import { DataTable } from '../../tables/DataTable';
import { Button } from '../../ui/Button';
import { Plus, CreditCard as Edit, Trash2 } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface BreedingSoundnessRecord {
  id: string;
  bullTag: string;
  evaluationDate: string;
  veterinarian: string;
  physicalExam: string;
  reproductiveExam: string;
  semenQuality: string;
  overallClassification: string;
  recommendations: string;
  nextEvaluationDate: string;
}

interface BreedingSoundnessTableProps {
  data: BreedingSoundnessRecord[];
  onAdd: () => void;
  onEdit: (record: BreedingSoundnessRecord) => void;
  onDelete: (id: string) => void;
}

export function BreedingSoundnessTable({ data, onAdd, onEdit, onDelete }: BreedingSoundnessTableProps) {
  const columns = [
    { key: 'bullTag', title: 'Bull Tag', width: 100 },
    { key: 'evaluationDate', title: 'Eval Date', width: 100 },
    { key: 'veterinarian', title: 'Veterinarian', width: 120 },
    { key: 'physicalExam', title: 'Physical', width: 80 },
    { key: 'reproductiveExam', title: 'Reproductive', width: 100 },
    { key: 'semenQuality', title: 'Semen', width: 80 },
    { key: 'overallClassification', title: 'Classification', width: 120 },
    { key: 'nextEvaluationDate', title: 'Next Eval', width: 100 },
    {
      key: 'actions',
      title: 'Actions',
      width: 120,
      render: (value: any, record: BreedingSoundnessRecord) => (
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
          Bull Breeding Soundness Evaluation
        </Text>
        <Button
          variant="primary"
          size="sm"
          startIcon={<Plus size={16} color={Colors.white} />}
          onPress={onAdd}
        >
          Add Evaluation
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