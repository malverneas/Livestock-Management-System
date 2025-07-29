import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { TextField } from '../../inputs/TextField';
import { Button } from '../../ui/Button';
import { X } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface DrugRecord {
  id: string;
  drugName: string;
  batchNumber: string;
  expiryDate: string;
  quantity: string;
  supplier: string;
  dateReceived: string;
  cost: string;
  withdrawalPeriod: string;
}

interface DrugRegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: Omit<DrugRecord, 'id'>) => void;
  editRecord?: DrugRecord | null;
}

export function DrugRegisterModal({ visible, onClose, onSave, editRecord }: DrugRegisterModalProps) {
  const [formData, setFormData] = useState({
    drugName: '',
    batchNumber: '',
    expiryDate: '',
    quantity: '',
    supplier: '',
    dateReceived: '',
    cost: '',
    withdrawalPeriod: '',
  });

  useEffect(() => {
    if (editRecord) {
      setFormData({
        drugName: editRecord.drugName,
        batchNumber: editRecord.batchNumber,
        expiryDate: editRecord.expiryDate,
        quantity: editRecord.quantity,
        supplier: editRecord.supplier,
        dateReceived: editRecord.dateReceived,
        cost: editRecord.cost,
        withdrawalPeriod: editRecord.withdrawalPeriod,
      });
    } else {
      setFormData({
        drugName: '',
        batchNumber: '',
        expiryDate: '',
        quantity: '',
        supplier: '',
        dateReceived: '',
        cost: '',
        withdrawalPeriod: '',
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
            {editRecord ? 'Edit Drug Record' : 'Add New Drug'}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.neutral[600]} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <TextField
            label="Drug Name"
            value={formData.drugName}
            onChangeText={(text) => setFormData({ ...formData, drugName: text })}
            placeholder="Enter drug name"
          />

          <TextField
            label="Batch Number"
            value={formData.batchNumber}
            onChangeText={(text) => setFormData({ ...formData, batchNumber: text })}
            placeholder="Enter batch number"
          />

          <TextField
            label="Expiry Date"
            value={formData.expiryDate}
            onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <TextField
            label="Quantity"
            value={formData.quantity}
            onChangeText={(text) => setFormData({ ...formData, quantity: text })}
            placeholder="Enter quantity"
          />

          <TextField
            label="Supplier"
            value={formData.supplier}
            onChangeText={(text) => setFormData({ ...formData, supplier: text })}
            placeholder="Enter supplier name"
          />

          <TextField
            label="Date Received"
            value={formData.dateReceived}
            onChangeText={(text) => setFormData({ ...formData, dateReceived: text })}
            placeholder="YYYY-MM-DD"
          />

          <TextField
            label="Cost"
            value={formData.cost}
            onChangeText={(text) => setFormData({ ...formData, cost: text })}
            placeholder="Enter cost"
            keyboardType="numeric"
          />

          <TextField
            label="Withdrawal Period (days)"
            value={formData.withdrawalPeriod}
            onChangeText={(text) => setFormData({ ...formData, withdrawalPeriod: text })}
            placeholder="Enter withdrawal period"
            keyboardType="numeric"
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