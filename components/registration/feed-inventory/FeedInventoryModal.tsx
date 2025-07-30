import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../typography/Text';
import { TextField } from '../../inputs/TextField';
import { Picker } from '../../inputs/Picker';
import { Button } from '../../ui/Button';
import { X } from 'lucide-react-native';
import Colors from '../../../constants/Colors';

interface FeedInventoryRecord {
  id: string;
  feedType: string;
  brand: string;
  batchNumber: string;
  dateReceived: string;
  expiryDate: string;
  quantityReceived: string;
  currentStock: string;
  unitCost: string;
  supplier: string;
  storageLocation: string;
}

interface FeedInventoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (record: Omit<FeedInventoryRecord, 'id'>) => void;
  editRecord?: FeedInventoryRecord | null;
}

const feedTypeOptions = [
  { label: 'Dairy Meal', value: 'dairy_meal' },
  { label: 'Beef Fattener', value: 'beef_fattener' },
  { label: 'Calf Starter', value: 'calf_starter' },
  { label: 'Hay', value: 'hay' },
  { label: 'Silage', value: 'silage' },
  { label: 'Concentrates', value: 'concentrates' },
  { label: 'Minerals', value: 'minerals' },
  { label: 'Supplements', value: 'supplements' },
];

export function FeedInventoryModal({ visible, onClose, onSave, editRecord }: FeedInventoryModalProps) {
  const [formData, setFormData] = useState({
    feedType: '',
    brand: '',
    batchNumber: '',
    dateReceived: '',
    expiryDate: '',
    quantityReceived: '',
    currentStock: '',
    unitCost: '',
    supplier: '',
    storageLocation: '',
  });

  useEffect(() => {
    if (editRecord) {
      setFormData({
        feedType: editRecord.feedType,
        brand: editRecord.brand,
        batchNumber: editRecord.batchNumber,
        dateReceived: editRecord.dateReceived,
        expiryDate: editRecord.expiryDate,
        quantityReceived: editRecord.quantityReceived,
        currentStock: editRecord.currentStock,
        unitCost: editRecord.unitCost,
        supplier: editRecord.supplier,
        storageLocation: editRecord.storageLocation,
      });
    } else {
      setFormData({
        feedType: '',
        brand: '',
        batchNumber: '',
        dateReceived: '',
        expiryDate: '',
        quantityReceived: '',
        currentStock: '',
        unitCost: '',
        supplier: '',
        storageLocation: '',
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
            {editRecord ? 'Edit Feed Record' : 'Add Feed Record'}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.neutral[600]} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Picker
            label="Feed Type"
            value={formData.feedType}
            onValueChange={(value) => setFormData({ ...formData, feedType: value })}
            items={feedTypeOptions}
          />

          <TextField
            label="Brand"
            value={formData.brand}
            onChangeText={(text) => setFormData({ ...formData, brand: text })}
            placeholder="Enter brand name"
          />

          <TextField
            label="Batch Number"
            value={formData.batchNumber}
            onChangeText={(text) => setFormData({ ...formData, batchNumber: text })}
            placeholder="Enter batch number"
          />

          <TextField
            label="Date Received"
            value={formData.dateReceived}
            onChangeText={(text) => setFormData({ ...formData, dateReceived: text })}
            placeholder="YYYY-MM-DD"
          />

          <TextField
            label="Expiry Date"
            value={formData.expiryDate}
            onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
            placeholder="YYYY-MM-DD"
          />

          <TextField
            label="Quantity Received (kg)"
            value={formData.quantityReceived}
            onChangeText={(text) => setFormData({ ...formData, quantityReceived: text })}
            placeholder="Enter quantity received"
            keyboardType="numeric"
          />

          <TextField
            label="Current Stock (kg)"
            value={formData.currentStock}
            onChangeText={(text) => setFormData({ ...formData, currentStock: text })}
            placeholder="Enter current stock"
            keyboardType="numeric"
          />

          <TextField
            label="Unit Cost ($)"
            value={formData.unitCost}
            onChangeText={(text) => setFormData({ ...formData, unitCost: text })}
            placeholder="Enter unit cost"
            keyboardType="numeric"
          />

          <TextField
            label="Supplier"
            value={formData.supplier}
            onChangeText={(text) => setFormData({ ...formData, supplier: text })}
            placeholder="Enter supplier name"
          />

          <TextField
            label="Storage Location"
            value={formData.storageLocation}
            onChangeText={(text) => setFormData({ ...formData, storageLocation: text })}
            placeholder="Enter storage location"
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