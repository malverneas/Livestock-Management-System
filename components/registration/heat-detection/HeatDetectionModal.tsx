import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { TextField } from '../../inputs/TextField';
import { Picker } from '../../inputs/Picker';
import { Button } from '../../ui/Button';
import { X } from 'lucide-react-native';
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

interface HeatDetectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: Omit<HeatDetectionRecord, 'id'>) => void;
  editRecord?: HeatDetectionRecord | null;
}

const intensityOptions = [
  { label: 'Weak', value: 'weak' },
  { label: 'Moderate', value: 'moderate' },
  { label: 'Strong', value: 'strong' },
];

export function HeatDetectionModal({ visible, onClose, onSave, editRecord }: HeatDetectionModalProps) {
  const [formData, setFormData] = useState({
    animalTag: '',
    heatDate: '',
    observer: '',
    intensity: '',
    breedingDate: '',
    bullUsed: '',
    notes: '',
  });

  useEffect(() => {
    if (editRecord) {
      setFormData({
        animalTag: editRecord.animalTag,
        heatDate: editRecord.heatDate,
        observer: editRecord.observer,
        intensity: editRecord.intensity,
        breedingDate: editRecord.breedingDate,
        bullUsed: editRecord.bullUsed,
        notes: editRecord.notes,
      });
    } else {
      setFormData({
        animalTag: '',
        heatDate: '',
        observer: '',
        intensity: '',
        breedingDate: '',
        bullUsed: '',
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
            {editRecord ? 'Edit Heat Detection Record' : 'Add Heat Detection Record'}
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
            label="Heat Date"
            value={formData.heatDate}
            onChangeText={(text) => setFormData({ ...formData, heatDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <TextField
            label="Observer"
            value={formData.observer}
            onChangeText={(text) => setFormData({ ...formData, observer: text })}
            placeholder="Enter observer name"
          />

          <Picker
            label="Heat Intensity"
            value={formData.intensity}
            onValueChange={(value) => setFormData({ ...formData, intensity: value })}
            items={intensityOptions}
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