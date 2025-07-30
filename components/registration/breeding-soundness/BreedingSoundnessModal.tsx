import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { TextField } from '../../inputs/TextField';
import { Picker } from '../../inputs/Picker';
import { Button } from '../../ui/Button';
import { X } from 'lucide-react-native';
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

interface BreedingSoundnessModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: Omit<BreedingSoundnessRecord, 'id'>) => void;
  editRecord?: BreedingSoundnessRecord | null;
}

const examResultOptions = [
  { label: 'Pass', value: 'pass' },
  { label: 'Fail', value: 'fail' },
  { label: 'Conditional', value: 'conditional' },
];

const classificationOptions = [
  { label: 'Satisfactory Potential Breeder', value: 'satisfactory' },
  { label: 'Un-Satisfactory Potential Breeder', value: 'unsatisfactory' },
  { label: 'Classification Deferred', value: 'deferred' },
];

export function BreedingSoundnessModal({ visible, onClose, onSave, editRecord }: BreedingSoundnessModalProps) {
  const [formData, setFormData] = useState({
    bullTag: '',
    evaluationDate: '',
    veterinarian: '',
    physicalExam: '',
    reproductiveExam: '',
    semenQuality: '',
    overallClassification: '',
    recommendations: '',
    nextEvaluationDate: '',
  });

  useEffect(() => {
    if (editRecord) {
      setFormData({
        bullTag: editRecord.bullTag,
        evaluationDate: editRecord.evaluationDate,
        veterinarian: editRecord.veterinarian,
        physicalExam: editRecord.physicalExam,
        reproductiveExam: editRecord.reproductiveExam,
        semenQuality: editRecord.semenQuality,
        overallClassification: editRecord.overallClassification,
        recommendations: editRecord.recommendations,
        nextEvaluationDate: editRecord.nextEvaluationDate,
      });
    } else {
      setFormData({
        bullTag: '',
        evaluationDate: '',
        veterinarian: '',
        physicalExam: '',
        reproductiveExam: '',
        semenQuality: '',
        overallClassification: '',
        recommendations: '',
        nextEvaluationDate: '',
      });
    }
  }, [editRecord, visible]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="h5" weight="medium">
            {editRecord ? 'Edit BSE Record' : 'Add BSE Record'}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.neutral[600]} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <TextField
            label="Bull Tag"
            value={formData.bullTag}
            onChangeText={(text) => setFormData({ ...formData, bullTag: text })}
            placeholder="Enter bull tag number"
          />

          <TextField
            label="Evaluation Date"
            value={formData.evaluationDate}
            onChangeText={(text) => setFormData({ ...formData, evaluationDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <TextField
            label="Veterinarian"
            value={formData.veterinarian}
            onChangeText={(text) => setFormData({ ...formData, veterinarian: text })}
            placeholder="Enter veterinarian name"
          />

          <Picker
            label="Physical Examination"
            value={formData.physicalExam}
            onValueChange={(value) => setFormData({ ...formData, physicalExam: value })}
            items={examResultOptions}
          />

          <Picker
            label="Reproductive Examination"
            value={formData.reproductiveExam}
            onValueChange={(value) => setFormData({ ...formData, reproductiveExam: value })}
            items={examResultOptions}
          />

          <Picker
            label="Semen Quality"
            value={formData.semenQuality}
            onValueChange={(value) => setFormData({ ...formData, semenQuality: value })}
            items={examResultOptions}
          />

          <Picker
            label="Overall Classification"
            value={formData.overallClassification}
            onValueChange={(value) => setFormData({ ...formData, overallClassification: value })}
            items={classificationOptions}
          />

          <TextField
            label="Recommendations"
            value={formData.recommendations}
            onChangeText={(text) => setFormData({ ...formData, recommendations: text })}
            placeholder="Enter recommendations"
            multiline
            numberOfLines={3}
          />

          <TextField
            label="Next Evaluation Date"
            value={formData.nextEvaluationDate}
            onChangeText={(text) => setFormData({ ...formData, nextEvaluationDate: text })}
            placeholder="YYYY-MM-DD"
          />
        </ScrollView>

        <View style={styles.footer}>
          <Button variant="outline" onPress={onClose} style={styles.button}>
            Cancel
          </Button>
          <Button variant="primary" onPress={handleSave} style={styles.button}>
            {editRecord ? 'Update' : 'Save'}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  button: {
    flex: 1,
  },
});