import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { TextField } from '../../inputs/TextField';
import { Picker } from '../../inputs/Picker';
import { Button } from '../../ui/Button';
import { X } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface CalfRecord {
  id: string;
  tagNumber: string;
  dateOfBirth: string;
  sex: string;
  dam: string;
  sire: string;
  birthWeight: string;
  weaningWeight: string;
  weaningDate: string;
}

interface CalfRegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: Omit<CalfRecord, 'id'>) => void;
  editRecord?: CalfRecord | null;
}

const sexOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

export function CalfRegisterModal({ visible, onClose, onSave, editRecord }: CalfRegisterModalProps) {
  const [formData, setFormData] = useState({
    tagNumber: '',
    dateOfBirth: '',
    sex: '',
    dam: '',
    sire: '',
    birthWeight: '',
    weaningWeight: '',
    weaningDate: '',
  });

  useEffect(() => {
    if (editRecord) {
      setFormData({
        tagNumber: editRecord.tagNumber,
        dateOfBirth: editRecord.dateOfBirth,
        sex: editRecord.sex,
        dam: editRecord.dam,
        sire: editRecord.sire,
        birthWeight: editRecord.birthWeight,
        weaningWeight: editRecord.weaningWeight,
        weaningDate: editRecord.weaningDate,
      });
    } else {
      setFormData({
        tagNumber: '',
        dateOfBirth: '',
        sex: '',
        dam: '',
        sire: '',
        birthWeight: '',
        weaningWeight: '',
        weaningDate: '',
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
            {editRecord ? 'Edit Calf Record' : 'Add New Calf'}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.neutral[600]} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <TextField
            label="Tag Number"
            value={formData.tagNumber}
            onChangeText={(text) => setFormData({ ...formData, tagNumber: text })}
            placeholder="Enter calf tag number"
          />

          <TextField
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
            placeholder="YYYY-MM-DD"
          />

          <Picker
            label="Sex"
            value={formData.sex}
            onValueChange={(value) => setFormData({ ...formData, sex: value })}
            items={sexOptions}
          />

          <TextField
            label="Dam (Mother)"
            value={formData.dam}
            onChangeText={(text) => setFormData({ ...formData, dam: text })}
            placeholder="Enter dam tag number"
          />

          <TextField
            label="Sire (Father)"
            value={formData.sire}
            onChangeText={(text) => setFormData({ ...formData, sire: text })}
            placeholder="Enter sire tag number"
          />

          <TextField
            label="Birth Weight (kg)"
            value={formData.birthWeight}
            onChangeText={(text) => setFormData({ ...formData, birthWeight: text })}
            placeholder="Enter birth weight"
            keyboardType="numeric"
          />

          <TextField
            label="Weaning Weight (kg)"
            value={formData.weaningWeight}
            onChangeText={(text) => setFormData({ ...formData, weaningWeight: text })}
            placeholder="Enter weaning weight"
            keyboardType="numeric"
          />

          <TextField
            label="Weaning Date"
            value={formData.weaningDate}
            onChangeText={(text) => setFormData({ ...formData, weaningDate: text })}
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