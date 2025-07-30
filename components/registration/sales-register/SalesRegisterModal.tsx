import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { TextField } from '../../inputs/TextField';
import { Picker } from '../../inputs/Picker';
import { Button } from '../../ui/Button';
import { X } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface SalesRecord {
  id: string;
  animalTag: string;
  transactionDate: string;
  transactionType: string;
  buyer: string;
  weight: string;
  pricePerKg: string;
  totalPrice: string;
  paymentMethod: string;
  notes: string;
}

interface SalesRegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: Omit<SalesRecord, 'id'>) => void;
  editRecord?: SalesRecord | null;
}

const transactionTypeOptions = [
  { label: 'Sale', value: 'sale' },
  { label: 'Purchase', value: 'purchase' },
];

const paymentMethodOptions = [
  { label: 'Cash', value: 'cash' },
  { label: 'Bank Transfer', value: 'bank_transfer' },
  { label: 'Check', value: 'check' },
  { label: 'Credit', value: 'credit' },
];

export function SalesRegisterModal({ visible, onClose, onSave, editRecord }: SalesRegisterModalProps) {
  const [formData, setFormData] = useState({
    animalTag: '',
    transactionDate: '',
    transactionType: '',
    buyer: '',
    weight: '',
    pricePerKg: '',
    totalPrice: '',
    paymentMethod: '',
    notes: '',
  });

  useEffect(() => {
    if (editRecord) {
      setFormData({
        animalTag: editRecord.animalTag,
        transactionDate: editRecord.transactionDate,
        transactionType: editRecord.transactionType,
        buyer: editRecord.buyer,
        weight: editRecord.weight,
        pricePerKg: editRecord.pricePerKg,
        totalPrice: editRecord.totalPrice,
        paymentMethod: editRecord.paymentMethod,
        notes: editRecord.notes,
      });
    } else {
      setFormData({
        animalTag: '',
        transactionDate: '',
        transactionType: '',
        buyer: '',
        weight: '',
        pricePerKg: '',
        totalPrice: '',
        paymentMethod: '',
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
            {editRecord ? 'Edit Transaction' : 'Add New Transaction'}
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
            label="Transaction Date"
            value={formData.transactionDate}
            onChangeText={(text) => setFormData({ ...formData, transactionDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <Picker
            label="Transaction Type"
            value={formData.transactionType}
            onValueChange={(value) => setFormData({ ...formData, transactionType: value })}
            items={transactionTypeOptions}
          />

          <TextField
            label="Buyer/Seller"
            value={formData.buyer}
            onChangeText={(text) => setFormData({ ...formData, buyer: text })}
            placeholder="Enter buyer or seller name"
          />

          <TextField
            label="Weight (kg)"
            value={formData.weight}
            onChangeText={(text) => setFormData({ ...formData, weight: text })}
            placeholder="Enter weight"
            keyboardType="numeric"
          />

          <TextField
            label="Price per kg ($)"
            value={formData.pricePerKg}
            onChangeText={(text) => setFormData({ ...formData, pricePerKg: text })}
            placeholder="Enter price per kg"
            keyboardType="numeric"
          />

          <TextField
            label="Total Price ($)"
            value={formData.totalPrice}
            onChangeText={(text) => setFormData({ ...formData, totalPrice: text })}
            placeholder="Enter total price"
            keyboardType="numeric"
          />

          <Picker
            label="Payment Method"
            value={formData.paymentMethod}
            onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            items={paymentMethodOptions}
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