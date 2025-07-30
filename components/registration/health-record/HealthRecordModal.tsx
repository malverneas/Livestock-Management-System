import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { TextField } from '../../inputs/TextField';
import { Picker } from '../../inputs/Picker';
import { Button } from '../../ui/Button';
import { X } from 'lucide-react-native';
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

interface HealthRecordModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: Omit<HealthRecord, 'id'>) => void;
  editRecord?: HealthRecord | null;
}

const treatmentTypeOptions = [
  { label: 'Vaccination', value: 'vaccination' },
  { label: 'Deworming', value: 'deworming' },
  { label: 'Antibiotic Treatment', value: 'antibiotic' },
  { label: 'Injury Treatment', value: 'injury' },
  { label: 'Preventive Care', value: 'preventive' },
  { label: 'Emergency Treatment', value: 'emergency' },
  { label: 'Routine Check-up', value: 'checkup' },
];

export function HealthRecordModal({ visible, onClose, onSave, editRecord }: HealthRecordModalProps) {
  const [formData, setFormData] = useState({
    animalTag: '',
    treatmentDate: '',
    treatmentType: '',
    diagnosis: '',
    treatment: '',
    veterinarian: '',
    drugUsed: '',
    dosage: '',
    withdrawalPeriod: '',
    followUpDate: '',
    notes: '',
  });

  useEffect(() => {
    if (editRecord) {
      setFormData({
        animalTag: editRecord.animalTag,
        treatmentDate: editRecord.treatmentDate,
        treatmentType: editRecord.treatmentType,
        diagnosis: editRecord.diagnosis,
        treatment: editRecord.treatment,
        veterinarian: editRecord.veterinarian,
        drugUsed: editRecord.drugUsed,
        dosage: editRecord.dosage,
        withdrawalPeriod: editRecord.withdrawalPeriod,
        followUpDate: editRecord.followUpDate,
        notes: editRecord.notes,
      });
    } else {
      setFormData({
        animalTag: '',
        treatmentDate: '',
        treatmentType: '',
        diagnosis: '',
        treatment: '',
        veterinarian: '',
        drugUsed: '',
        dosage: '',
        withdrawalPeriod: '',
        followUpDate: '',
        notes: '',
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
            {editRecord ? 'Edit Health Record' : 'Add Health Record'}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.neutral[600]} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <TextField
            label="Animal Tag"
            value={formData.animalTag}
            onChangeText={(text) => setFormData({ ...formData, animalTag: text })}
            placeholder="Enter animal tag number"
          />

          <TextField
            label="Treatment Date"
            value={formData.treatmentDate}
            onChangeText={(text) => setFormData({ ...formData, treatmentDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <Picker
            label="Treatment Type"
            value={formData.treatmentType}
            onValueChange={(value) => setFormData({ ...formData, treatmentType: value })}
            items={treatmentTypeOptions}
          />

          <TextField
            label="Diagnosis"
            value={formData.diagnosis}
            onChangeText={(text) => setFormData({ ...formData, diagnosis: text })}
            placeholder="Enter diagnosis"
          />

          <TextField
            label="Treatment"
            value={formData.treatment}
            onChangeText={(text) => setFormData({ ...formData, treatment: text })}
            placeholder="Enter treatment given"
          />

          <TextField
            label="Veterinarian"
            value={formData.veterinarian}
            onChangeText={(text) => setFormData({ ...formData, veterinarian: text })}
            placeholder="Enter veterinarian name"
          />

          <TextField
            label="Drug Used"
            value={formData.drugUsed}
            onChangeText={(text) => setFormData({ ...formData, drugUsed: text })}
            placeholder="Enter drug name"
          />

          <TextField
            label="Dosage"
            value={formData.dosage}
            onChangeText={(text) => setFormData({ ...formData, dosage: text })}
            placeholder="Enter dosage"
          />

          <TextField
            label="Withdrawal Period (days)"
            value={formData.withdrawalPeriod}
            onChangeText={(text) => setFormData({ ...formData, withdrawalPeriod: text })}
            placeholder="Enter withdrawal period"
            keyboardType="numeric"
          />

          <TextField
            label="Follow Up Date"
            value={formData.followUpDate}
            onChangeText={(text) => setFormData({ ...formData, followUpDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <TextField
            label="Notes"
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            placeholder="Enter additional notes"
            multiline
            numberOfLines={3}
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