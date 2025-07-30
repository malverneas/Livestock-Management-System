import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { TextField } from '../../inputs/TextField';
import { Picker } from '../../inputs/Picker';
import { Button } from '../../ui/Button';
import { X } from 'lucide-react-native';
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

interface PregnancyRegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: Omit<PregnancyRecord, 'id'>) => void;
  editRecord?: PregnancyRecord | null;
}

const pregnancyStatusOptions = [
  { label: 'Pregnant', value: 'pregnant' },
  { label: 'Not Pregnant', value: 'not_pregnant' },
  { label: 'Uncertain', value: 'uncertain' },
  { label: 'Calved', value: 'calved' },
];

const calvingDifficultyOptions = [
  { label: 'Easy', value: 'easy' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Difficult', value: 'difficult' },
  { label: 'Assisted', value: 'assisted' },
  { label: 'Caesarean', value: 'caesarean' },
];

export function PregnancyRegisterModal({ visible, onClose, onSave, editRecord }: PregnancyRegisterModalProps) {
  const [formData, setFormData] = useState({
    animalTag: '',
    breedingDate: '',
    bullUsed: '',
    pregnancyCheckDate: '',
    pregnancyStatus: '',
    expectedCalvingDate: '',
    actualCalvingDate: '',
    calfTag: '',
    calvingDifficulty: '',
    notes: '',
  });

  useEffect(() => {
    if (editRecord) {
      setFormData({
        animalTag: editRecord.animalTag,
        breedingDate: editRecord.breedingDate,
        bullUsed: editRecord.bullUsed,
        pregnancyCheckDate: editRecord.pregnancyCheckDate,
        pregnancyStatus: editRecord.pregnancyStatus,
        expectedCalvingDate: editRecord.expectedCalvingDate,
        actualCalvingDate: editRecord.actualCalvingDate,
        calfTag: editRecord.calfTag,
        calvingDifficulty: editRecord.calvingDifficulty,
        notes: editRecord.notes,
      });
    } else {
      setFormData({
        animalTag: '',
        breedingDate: '',
        bullUsed: '',
        pregnancyCheckDate: '',
        pregnancyStatus: '',
        expectedCalvingDate: '',
        actualCalvingDate: '',
        calfTag: '',
        calvingDifficulty: '',
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
            {editRecord ? 'Edit Pregnancy Record' : 'Add Pregnancy Record'}
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
            label="Breeding Date"
            value={formData.breedingDate}
            onChangeText={(text) => setFormData({ ...formData, breedingDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <TextField
            label="Bull Used"
            value={formData.bullUsed}
            onChangeText={(text) => setFormData({ ...formData, bullUsed: text })}
            placeholder="Enter bull tag number"
          />

          <TextField
            label="Pregnancy Check Date"
            value={formData.pregnancyCheckDate}
            onChangeText={(text) => setFormData({ ...formData, pregnancyCheckDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <Picker
            label="Pregnancy Status"
            value={formData.pregnancyStatus}
            onValueChange={(value) => setFormData({ ...formData, pregnancyStatus: value })}
            items={pregnancyStatusOptions}
          />

          <TextField
            label="Expected Calving Date"
            value={formData.expectedCalvingDate}
            onChangeText={(text) => setFormData({ ...formData, expectedCalvingDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <TextField
            label="Actual Calving Date"
            value={formData.actualCalvingDate}
            onChangeText={(text) => setFormData({ ...formData, actualCalvingDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <TextField
            label="Calf Tag"
            value={formData.calfTag}
            onChangeText={(text) => setFormData({ ...formData, calfTag: text })}
            placeholder="Enter calf tag number"
          />

          <Picker
            label="Calving Difficulty"
            value={formData.calvingDifficulty}
            onValueChange={(value) => setFormData({ ...formData, calvingDifficulty: value })}
            items={calvingDifficultyOptions}
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