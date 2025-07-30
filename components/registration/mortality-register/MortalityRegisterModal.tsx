import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { TextField } from '../../inputs/TextField';
import { Picker } from '../../inputs/Picker';
import { Button } from '../../ui/Button';
import { X } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface MortalityRecord {
  id: string;
  animalTag: string;
  dateOfEvent: string;
  eventType: string;
  cause: string;
  weight: string;
  value: string;
  disposalMethod: string;
  notes: string;
}

interface MortalityRegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: Omit<MortalityRecord, 'id'>) => void;
  editRecord?: MortalityRecord | null;
}

const eventTypeOptions = [
  { label: 'Death', value: 'death' },
  { label: 'Cull', value: 'cull' },
  { label: 'Emergency Slaughter', value: 'emergency_slaughter' },
];

const disposalMethodOptions = [
  { label: 'Burial', value: 'burial' },
  { label: 'Burning', value: 'burning' },
  { label: 'Rendering', value: 'rendering' },
  { label: 'Veterinary Disposal', value: 'veterinary_disposal' },
];

export function MortalityRegisterModal({ visible, onClose, onSave, editRecord }: MortalityRegisterModalProps) {
  const [formData, setFormData] = useState({
    animalTag: '',
    dateOfEvent: '',
    eventType: '',
    cause: '',
    weight: '',
    value: '',
    disposalMethod: '',
    notes: '',
  });

  useEffect(() => {
    if (editRecord) {
      setFormData({
        animalTag: editRecord.animalTag,
        dateOfEvent: editRecord.dateOfEvent,
        eventType: editRecord.eventType,
        cause: editRecord.cause,
        weight: editRecord.weight,
        value: editRecord.value,
        disposalMethod: editRecord.disposalMethod,
        notes: editRecord.notes,
      });
    } else {
      setFormData({
        animalTag: '',
        dateOfEvent: '',
        eventType: '',
        cause: '',
        weight: '',
        value: '',
        disposalMethod: '',
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
            {editRecord ? 'Edit Mortality Record' : 'Add Mortality Record'}
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
            label="Date of Event"
            value={formData.dateOfEvent}
            onChangeText={(text) => setFormData({ ...formData, dateOfEvent: text })}
            placeholder="YYYY-MM-DD"
          />

          <Picker
            label="Event Type"
            value={formData.eventType}
            onValueChange={(value) => setFormData({ ...formData, eventType: value })}
            items={eventTypeOptions}
          />

          <TextField
            label="Cause"
            value={formData.cause}
            onChangeText={(text) => setFormData({ ...formData, cause: text })}
            placeholder="Enter cause of death/culling"
          />

          <TextField
            label="Weight (kg)"
            value={formData.weight}
            onChangeText={(text) => setFormData({ ...formData, weight: text })}
            placeholder="Enter weight"
            keyboardType="numeric"
          />

          <TextField
            label="Value ($)"
            value={formData.value}
            onChangeText={(text) => setFormData({ ...formData, value: text })}
            placeholder="Enter estimated value"
            keyboardType="numeric"
          />

          <Picker
            label="Disposal Method"
            value={formData.disposalMethod}
            onValueChange={(value) => setFormData({ ...formData, disposalMethod: value })}
            items={disposalMethodOptions}
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