import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Modal, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Text } from '../../components/typography/Text';
import { Card } from '../../components/ui/Card';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Button } from '../../components/ui/Button';
import { Picker } from '../../components/inputs/Picker';
import { DataTable } from '../../components/tables/DataTable';
import { PieChart } from '../../components/charts/PieChart';
import Colors from '../../constants/Colors';
import { Stack, useRouter } from 'expo-router';

// Sample data for herd totals
const herdTotals = {
  cows: 120,
  bulls: 15,
  heifers: 45,
  steers: 30,
  maleCalves: 25,
  femaleCalves: 28
};

// Sample data for pie charts
interface PieChartData {
  name: string;
  population: number;
  color: string;
}

const breedDistribution: PieChartData[] = [
  { name: 'Brahman', population: 120, color: Colors.primary[500] },
  { name: 'Angus', population: 80, color: Colors.success[500] },
  { name: 'Hereford', population: 60, color: Colors.warning[500] },
  { name: 'Others', population: 40, color: Colors.neutral[500] },
];

const sourceDistribution: PieChartData[] = [
  { name: 'Born', population: 180, color: Colors.primary[500] },
  { name: 'Purchased', population: 120, color: Colors.success[500] },
];

const sexBreakdown: PieChartData[] = [
  { name: 'Male', population: 70, color: Colors.primary[500] },
  { name: 'Female', population: 193, color: Colors.accent[500] },
];

const stockTypeBreakdown: PieChartData[] = [
  { name: 'Cows', population: 120, color: Colors.success[500] },
  { name: 'Bulls', population: 15, color: Colors.error[500] },
  { name: 'Heifers', population: 45, color: Colors.warning[500] },
  { name: 'Steers', population: 30, color: Colors.secondary[500] },
  { name: 'Calves', population: 53, color: Colors.accent[500] },
];

// Sample data for tables
const herdRegisterData = [
  { unitNo: 'B001', tag: 'TAG123', age: '4y 2m', breed: 'Mashona', sex: 'Male', stockType: 'Bull', source: 'Born' },
  { unitNo: 'C045', tag: 'TAG456', age: '3y 6m', breed: 'Brahman', sex: 'Female', stockType: 'Cow', source: 'Purchased' },
];

const calfRegisterData = [
  { unit: 'CLF001', calfId: 'TAG789', age: '2m', deliveryType: 'Normal', observer: 'John D.', birthWeight: '35kg', sex: 'Female' },
];

const drugRegisterData = [
  { drugClass: 'Antibiotic', type: 'Injectable', withdrawal: '14 days', pregnancySafe: 'Yes', stock: 'In Stock' },
];

const mortalityData = [
  { id: 'TAG111', date: '2024-02-15', cause: 'Disease', description: 'Respiratory failure' },
];

const transactionData = [
  { date: '2024-02-10', description: 'Sale of bull B023', amount: 2500, type: 'Sale' },
  { date: '2024-02-05', description: 'Purchase of heifer H045', amount: -3000, type: 'Purchase' },
];

const weightData = [
  { 
    id: 'B001', 
    stockType: 'Bull', 
    age: '4y 2m', 
    jan: '650', 
    feb: '665', 
    mar: '680', 
    apr: '695', 
    may: '705', 
    jun: '720', 
    jul: '735', 
    aug: '750', 
    sep: '765', 
    oct: '780', 
    nov: '790', 
    dec: '800' 
  },
];

// Sample data for feed inventory
const feedInventoryData = [
  {
    id: 'F001',
    name: 'Dairy Meal 18%',
    type: 'Cattle Feed',
    quantity: '250 kg',
    unit: '50kg bags',
    supplier: 'AgroFeeds',
    lastUpdated: '2025-07-01',
    status: 'In Stock'
  },
  {
    id: 'F002',
    name: 'Poultry Starter',
    type: 'Poultry Feed',
    quantity: '150 kg',
    unit: '25kg bags',
    supplier: 'Poultry Plus',
    lastUpdated: '2025-07-03',
    status: 'Low Stock'
  },
  {
    id: 'F003',
    name: 'Goat Pellets',
    type: 'Small Ruminant',
    quantity: '200 kg',
    unit: '40kg bags',
    supplier: 'Livestock Feeds',
    lastUpdated: '2025-06-28',
    status: 'In Stock'
  },
  {
    id: 'F004',
    name: 'Pig Grower',
    type: 'Swine Feed',
    quantity: '300 kg',
    unit: '50kg bags',
    supplier: 'ZimPig Feeds',
    lastUpdated: '2025-07-04',
    status: 'In Stock'
  },
];

// Filter options
const breedOptions = [
  { value: 'all', label: 'All' },
  { value: 'mashona', label: 'Mashona' },
  { value: 'brahman', label: 'Brahman' },
  { value: 'tuli', label: 'Tuli' },
  { value: 'nguni', label: 'Nguni' },
];

const sourceOptions = [
  { label: 'All', value: 'All' },
  { label: 'Born', value: 'Born' },
  { label: 'Purchased', value: 'Purchased' },
];

// Animal Health Record type
interface AnimalHealthRecord {
  id: string;
  animalId: string;
  date: string;
  treatment: string;
  status: 'Completed' | 'Scheduled' | 'Pending';
}

// Heat Detection and Breeding Record type
interface HeatBreedingRecord {
  id: string;
  earTagNumber: string;
  stockType: 'Cow' | 'Heifer' | 'Heifer (First Calf)' | 'Bull' | 'Steer';
  bodyConditionScore: number;
  heatDetectionDate: string;
  observer: string;
  servicedDate?: string;
  breedingStatus: 'Bred' | 'Open' | 'Confirmed Pregnant' | 'Failed';
  breedingMethod?: 'AI' | 'Natural' | 'Embryo Transfer';
  aiTechnician?: string;
  sireId?: string;
  strawId?: string;
  semenViability?: number; // percentage
  returnToHeatDate1?: string;
  dateServed2?: string;
  breedingMethod2?: 'AI' | 'Natural' | 'Embryo Transfer';
  sireUsed2?: string;
  returnToHeatDate2?: string;
}

// Pregnancy Diagnosis and Calving Record type
interface PregnancyCalvingRecord {
  id: string;
  cowEarTag: string;
  bodyConditionScore: number;
  lastServiceDate: string;
  firstTrimesterPD: 'Positive' | 'Negative' | 'Inconclusive' | 'Not Tested';
  secondTrimesterPD: 'Positive' | 'Negative' | 'Inconclusive' | 'Not Tested';
  thirdTrimesterPD: 'Positive' | 'Negative' | 'Inconclusive' | 'Not Tested';
  gestationPeriod: number; // in days
  expectedCalvingDate: string;
  actualCalvingDate?: string;
  calfId?: string;
  calfSex?: 'Male' | 'Female';
  deliveryType?: 'Natural' | 'Assisted' | 'C-Section';
  averageBCS: number;
  expectedReturnToHeatDate: string;
  actualFirstHeatDate?: string;
  expectedSecondHeatDate?: string;
  actualSecondHeatDate?: string;
  expectedSecondReturnToHeatDate?: string;
}

// Bull Breeding Soundness data type
interface BullBreedingRecord {
  id: string;
  date: string;
  age: string;
  pe: 'Excellent' | 'Good' | 'Poor';
  spermMotility: string;
  spermMorphology: string;
  scrotal: string;
  libido: 'Excellent' | 'Good' | 'Poor';
  score: string;
  classification: 'SPB' | 'USPB' | 'CD';
};

// Sample health records data
const animalHealthRecords: AnimalHealthRecord[] = [
  { id: '1', animalId: 'A1001', date: '2025-06-15', treatment: 'Deworming', status: 'Completed' },
  { id: '2', animalId: 'A1002', date: '2025-06-16', treatment: 'Vaccination', status: 'Scheduled' },
  { id: '3', animalId: 'A1003', date: '2025-06-17', treatment: 'Hoof Trimming', status: 'Pending' },
  { id: '4', animalId: 'A1004', date: '2025-06-18', treatment: 'Health Check', status: 'Completed' },
  { id: '5', animalId: 'A1005', date: '2025-06-19', treatment: 'Vaccination', status: 'Scheduled' },
];

// Sample pregnancy and calving records
// Sample heat detection and breeding records
const heatBreedingRecords: HeatBreedingRecord[] = [
  {
    id: 'HB001',
    earTagNumber: 'C1001',
    stockType: 'Cow',
    bodyConditionScore: 3.5,
    heatDetectionDate: '2025-01-10',
    observer: 'John Doe',
    servicedDate: '2025-01-11',
    breedingStatus: 'Confirmed Pregnant',
    breedingMethod: 'AI',
    aiTechnician: 'Dr. Smith',
    sireId: 'S-ANG-1234',
    strawId: 'ST-2025-001',
    semenViability: 85,
    returnToHeatDate1: '2025-02-01',
  },
  {
    id: 'HB002',
    earTagNumber: 'C1002',
    stockType: 'Heifer (First Calf)',
    bodyConditionScore: 3.0,
    heatDetectionDate: '2025-01-15',
    observer: 'Jane Smith',
    servicedDate: '2025-01-16',
    breedingStatus: 'Bred',
    breedingMethod: 'AI',
    aiTechnician: 'Dr. Smith',
    sireId: 'S-HER-5678',
    strawId: 'ST-2025-002',
    semenViability: 90,
  },
  {
    id: 'HB003',
    earTagNumber: 'C1003',
    stockType: 'Heifer',
    bodyConditionScore: 3.2,
    heatDetectionDate: '2025-02-01',
    observer: 'John Doe',
    servicedDate: '2025-02-02',
    breedingStatus: 'Open',
    breedingMethod: 'AI',
    aiTechnician: 'Dr. Johnson',
    sireId: 'S-SIM-9012',
    strawId: 'ST-2025-003',
    semenViability: 82,
    returnToHeatDate1: '2025-02-22',
    dateServed2: '2025-02-23',
    breedingMethod2: 'Natural',
    sireUsed2: 'B-ANG-001',
    returnToHeatDate2: '2025-03-15',
  },
];

const pregnancyCalvingRecords: PregnancyCalvingRecord[] = [
  {
    id: 'P001',
    cowEarTag: 'C1001',
    bodyConditionScore: 3.5,
    lastServiceDate: '2025-01-15',
    firstTrimesterPD: 'Positive',
    secondTrimesterPD: 'Positive',
    thirdTrimesterPD: 'Positive',
    gestationPeriod: 283,
    expectedCalvingDate: '2025-10-25',
    actualCalvingDate: '2025-10-24',
    calfId: 'CLF25001',
    calfSex: 'Female',
    deliveryType: 'Natural',
    averageBCS: 3.3,
    expectedReturnToHeatDate: '2025-12-15',
    actualFirstHeatDate: '2025-12-14',
    expectedSecondHeatDate: '2026-01-13',
    actualSecondHeatDate: '2026-01-15',
    expectedSecondReturnToHeatDate: '2026-02-12'
  },
  {
    id: 'P002',
    cowEarTag: 'C1002',
    bodyConditionScore: 3.0,
    lastServiceDate: '2025-02-20',
    firstTrimesterPD: 'Positive',
    secondTrimesterPD: 'Positive',
    thirdTrimesterPD: 'Positive',
    gestationPeriod: 280,
    expectedCalvingDate: '2025-11-27',
    averageBCS: 3.1,
    expectedReturnToHeatDate: '2026-01-15',
  },
  {
    id: 'P003',
    cowEarTag: 'C1003',
    bodyConditionScore: 3.2,
    lastServiceDate: '2025-03-10',
    firstTrimesterPD: 'Positive',
    secondTrimesterPD: 'Negative',
    thirdTrimesterPD: 'Not Tested',
    gestationPeriod: 0,
    expectedCalvingDate: 'N/A',
    averageBCS: 3.1,
    expectedReturnToHeatDate: '2025-04-10',
  },
];

const bullBreedingSoundnessData: BullBreedingRecord[] = [
  {
    id: 'B001',
    date: '2025-06-15',
    age: '2.5 years',
    pe: 'Excellent',
    spermMotility: '80%',
    spermMorphology: '85%',
    scrotal: '36 cm',
    libido: 'Excellent',
    score: '95',
    classification: 'SPB'
  },
  {
    id: 'B002',
    date: '2025-06-20',
    age: '3 years',
    pe: 'Good',
    spermMotility: '70%',
    spermMorphology: '65%',
    scrotal: '34 cm',
    libido: 'Good',
    score: '75',
    classification: 'SPB'
  },
  {
    id: 'B003',
    date: '2025-06-25',
    age: '4 years',
    pe: 'Poor',
    spermMotility: '40%',
    spermMorphology: '35%',
    scrotal: '30 cm',
    libido: 'Poor',
    score: '50',
    classification: 'USPB'
  },
  {
    id: 'B004',
    date: '2025-07-01',
    age: '2 years',
    pe: 'Good',
    spermMotility: '75%',
    spermMorphology: '80%',
    scrotal: '32 cm',
    libido: 'Excellent',
    score: '85',
    classification: 'SPB'
  }
];

// Interface for animal data
interface AnimalData {
  unitNo: string;
  tag: string;
  age: string;
  breed: string;
  sex: 'Male' | 'Female';
  stockType: string;
  source: string;
  id?: string;
}

// Interface for drug data
interface DrugData {
  id?: string;
  drugClass: string;
  type: string;
  name: string;
  batchNumber: string;
  expiryDate: string;
  quantity: string;
  unit: 'ml' | 'mg' | 'tablet' | 'bottle' | 'sachet';
  withdrawalPeriod: string;
  pregnancySafe: 'Yes' | 'No';
  stock: string;
  supplier?: string;
  notes?: string;
}

// Sample data for herd register
const initialHerdRegisterData: AnimalData[] = [
  { id: '1', unitNo: 'B001', tag: 'TAG123', age: '4y 2m', breed: 'Mashona', sex: 'Male', stockType: 'Bull', source: 'Born' },
  { id: '2', unitNo: 'C045', tag: 'TAG456', age: '3y 6m', breed: 'Brahman', sex: 'Female', stockType: 'Cow', source: 'Purchased' },
  { id: '3', unitNo: 'H012', tag: 'TAG789', age: '1y 8m', breed: 'Angus', sex: 'Female', stockType: 'Heifer', source: 'Born' },
  { id: '4', unitNo: 'S078', tag: 'TAG101', age: '2y 11m', breed: 'Hereford', sex: 'Male', stockType: 'Steer', source: 'Born' },
  { id: '5', unitNo: 'C102', tag: 'TAG202', age: '5y 0m', breed: 'Simmental', sex: 'Female', stockType: 'Cow', source: 'Purchased' },
];

// Sample data for drug register
const initialDrugRegisterData: DrugData[] = [
  { 
    id: '1', 
    drugClass: 'Antibiotic', 
    type: 'Injectable', 
    name: 'Oxytetracycline', 
    batchNumber: 'B12345',
    expiryDate: '2025-12-31',
    quantity: '100',
    unit: 'ml',
    withdrawalPeriod: '21 days',
    pregnancySafe: 'No',
    stock: '5 bottles',
    supplier: 'VetPharm Ltd'
  },
  { 
    id: '2', 
    drugClass: 'Vitamin', 
    type: 'Oral', 
    name: 'Vitamin B Complex', 
    batchNumber: 'VITB2025',
    expiryDate: '2026-06-30',
    quantity: '500',
    unit: 'ml',
    withdrawalPeriod: '0 days',
    pregnancySafe: 'Yes',
    stock: '2 liters',
    supplier: 'AgriHealth'
  },
];



export default function RegisterScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Register',
        }}
      />
      <RegisterContent />
    </>
  );
}

function RegisterContent() {
  // Drug register state
  const [drugRegisterData, setDrugRegisterData] = useState<DrugData[]>(initialDrugRegisterData);
  const [isAddDrugModalVisible, setIsAddDrugModalVisible] = useState(false);
  const [newDrug, setNewDrug] = useState<Omit<DrugData, 'id'>>({ 
    drugClass: '',
    type: '',
    name: '',
    batchNumber: '',
    expiryDate: '',
    quantity: '',
    unit: 'ml',
    withdrawalPeriod: '',
    pregnancySafe: 'No',
    stock: '',
    supplier: '',
    notes: ''
  });

  const handleAddDrug = () => {
    const newId = (drugRegisterData.length + 1).toString();
    setDrugRegisterData([...drugRegisterData, { ...newDrug, id: newId }]);
    setNewDrug({ 
      drugClass: '',
      type: '',
      name: '',
      batchNumber: '',
      expiryDate: '',
      quantity: '',
      unit: 'ml',
      withdrawalPeriod: '',
      pregnancySafe: 'No',
      stock: '',
      supplier: '',
      notes: ''
    });
    setIsAddDrugModalVisible(false);
  };

  const renderAddDrugModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isAddDrugModalVisible}
      onRequestClose={() => setIsAddDrugModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text variant="h6" weight="bold" style={styles.modalTitle}>Add New Drug</Text>
          
          <ScrollView 
            style={styles.modalScrollView}
            contentContainerStyle={styles.modalScrollViewContent}
          >
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Drug Class</Text>
              <TextInput
                style={styles.input}
                value={newDrug.drugClass}
                onChangeText={(text) => setNewDrug({...newDrug, drugClass: text})}
                placeholder="e.g., Antibiotic, Vitamin"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Type</Text>
              <TextInput
                style={styles.input}
                value={newDrug.type}
                onChangeText={(text) => setNewDrug({...newDrug, type: text})}
                placeholder="e.g., Injectable, Oral"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Drug Name</Text>
              <TextInput
                style={styles.input}
                value={newDrug.name}
                onChangeText={(text) => setNewDrug({...newDrug, name: text})}
                placeholder="e.g., Oxytetracycline"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Batch Number</Text>
              <TextInput
                style={styles.input}
                value={newDrug.batchNumber}
                onChangeText={(text) => setNewDrug({...newDrug, batchNumber: text})}
                placeholder="e.g., B12345"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                value={newDrug.expiryDate}
                onChangeText={(text) => setNewDrug({...newDrug, expiryDate: text})}
                placeholder="YYYY-MM-DD"
                keyboardType="numbers-and-punctuation"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Quantity</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={[styles.input, { flex: 1, marginRight: 8 }]}
                  value={newDrug.quantity}
                  onChangeText={(text) => setNewDrug({...newDrug, quantity: text})}
                  placeholder="e.g., 100"
                  keyboardType="numeric"
                />
                <Picker
                  selectedValue={newDrug.unit}
                  style={[styles.input, { flex: 1 }]}
                  onValueChange={(itemValue) => setNewDrug({...newDrug, unit: itemValue as DrugData['unit']})}
                >
                  <Picker.Item label="ml" value="ml" />
                  <Picker.Item label="mg" value="mg" />
                  <Picker.Item label="Tablets" value="tablet" />
                  <Picker.Item label="Bottles" value="bottle" />
                  <Picker.Item label="Sachets" value="sachet" />
                </Picker>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Withdrawal Period</Text>
              <TextInput
                style={styles.input}
                value={newDrug.withdrawalPeriod}
                onChangeText={(text) => setNewDrug({...newDrug, withdrawalPeriod: text})}
                placeholder="e.g., 21 days"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Pregnancy Safe</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity 
                  style={[styles.radioButton, newDrug.pregnancySafe === 'Yes' && styles.radioButtonSelected]}
                  onPress={() => setNewDrug({...newDrug, pregnancySafe: 'Yes'})}
                >
                  <Text>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.radioButton, newDrug.pregnancySafe === 'No' && styles.radioButtonSelected]}
                  onPress={() => setNewDrug({...newDrug, pregnancySafe: 'No'})}
                >
                  <Text>No</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Current Stock</Text>
              <TextInput
                style={styles.input}
                value={newDrug.stock}
                onChangeText={(text) => setNewDrug({...newDrug, stock: text})}
                placeholder="e.g., 5 bottles, 2 liters"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Supplier (Optional)</Text>
              <TextInput
                style={styles.input}
                value={newDrug.supplier}
                onChangeText={(text) => setNewDrug({...newDrug, supplier: text})}
                placeholder="e.g., VetPharm Ltd"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Notes (Optional)</Text>
              <TextInput
                style={[styles.input, { minHeight: 60, textAlignVertical: 'top' }]}
                value={newDrug.notes}
                onChangeText={(text) => setNewDrug({...newDrug, notes: text})}
                placeholder="Any additional notes"
                multiline
              />
            </View>
          </ScrollView>
          
          <View style={styles.modalButtons}>
            <Button 
              variant="outline" 
              onPress={() => setIsAddDrugModalVisible(false)}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button 
              onPress={handleAddDrug}
              disabled={!newDrug.drugClass || !newDrug.name || !newDrug.quantity}
            >
              Add Drug
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [herdRegisterData, setHerdRegisterData] = useState<AnimalData[]>(initialHerdRegisterData);
  const [newAnimal, setNewAnimal] = useState<Omit<AnimalData, 'id'>>({ 
    unitNo: '', 
    tag: '', 
    age: '', 
    breed: '', 
    sex: 'Male', 
    stockType: '', 
    source: '' 
  });
  const router = useRouter();

  const handleAddAnimal = () => {
    const newId = (herdRegisterData.length + 1).toString();
    setHerdRegisterData([...herdRegisterData, { ...newAnimal, id: newId }]);
    setNewAnimal({ unitNo: '', tag: '', age: '', breed: '', sex: 'Male', stockType: '', source: '' });
    setIsAddModalVisible(false);
  };

  const renderAddAnimalModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isAddModalVisible}
      onRequestClose={() => setIsAddModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text variant="h6" weight="bold" style={styles.modalTitle}>Add New Animal</Text>
          
          <ScrollView 
            style={styles.modalScrollView}
            contentContainerStyle={styles.modalScrollViewContent}
          >
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Unit No</Text>
              <TextInput
                style={styles.input}
                value={newAnimal.unitNo}
                onChangeText={(text) => setNewAnimal({...newAnimal, unitNo: text})}
                placeholder="e.g., B001"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Tag</Text>
              <TextInput
                style={styles.input}
                value={newAnimal.tag}
                onChangeText={(text) => setNewAnimal({...newAnimal, tag: text})}
                placeholder="e.g., TAG123"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={newAnimal.age}
                onChangeText={(text) => setNewAnimal({...newAnimal, age: text})}
                placeholder="e.g., 2y 3m"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Breed</Text>
              <TextInput
                style={styles.input}
                value={newAnimal.breed}
                onChangeText={(text) => setNewAnimal({...newAnimal, breed: text})}
                placeholder="e.g., Mashona"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Sex</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity 
                  style={[styles.radioButton, newAnimal.sex === 'Male' && styles.radioButtonSelected]}
                  onPress={() => setNewAnimal({...newAnimal, sex: 'Male'})}
                >
                  <Text>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.radioButton, newAnimal.sex === 'Female' && styles.radioButtonSelected]}
                  onPress={() => setNewAnimal({...newAnimal, sex: 'Female'})}
                >
                  <Text>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Stock Type</Text>
              <TextInput
                style={styles.input}
                value={newAnimal.stockType}
                onChangeText={(text) => setNewAnimal({...newAnimal, stockType: text})}
                placeholder="e.g., Bull, Cow, Heifer"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text variant="body2" style={styles.label}>Source</Text>
              <TextInput
                style={styles.input}
                value={newAnimal.source}
                onChangeText={(text) => setNewAnimal({...newAnimal, source: text})}
                placeholder="e.g., Born, Purchased"
              />
            </View>
          </ScrollView>
          
          <View style={styles.modalButtons}>
            <Button 
              variant="outline" 
              onPress={() => setIsAddModalVisible(false)}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button 
              onPress={handleAddAnimal}
              disabled={!newAnimal.unitNo || !newAnimal.tag}
            >
              Add Animal
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScreenContainer>

      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Herd at a Glance Section */}
        <Card title="Herd at a Glance" style={styles.card}>
          <View style={styles.filters}>
            <Picker
              label="Breed"
              value={selectedBreed}
              onValueChange={setSelectedBreed}
              items={breedOptions}
              style={styles.filter}
            />
            <Picker
              label="Source"
              value={selectedSource}
              onValueChange={setSelectedSource}
              items={sourceOptions}
              style={styles.filter}
            />
          </View>

          <View style={styles.totalsGrid}>
            <View style={styles.totalItem}>
              <Text variant="h3" weight="bold" color="primary.500">{herdTotals.cows}</Text>
              <Text variant="body2">Cows</Text>
            </View>
            <View style={styles.totalItem}>
              <Text variant="h4" weight="bold" color="error.500">{herdTotals.bulls}</Text>
              <Text variant="body2">Bulls</Text>
            </View>
            <View style={styles.totalItem}>
              <Text variant="h4" weight="bold" color="warning.500">{herdTotals.heifers}</Text>
              <Text variant="body2">Heifers</Text>
            </View>
            <View style={styles.totalItem}>
              <Text variant="h4" weight="bold" color="info.500">{herdTotals.steers}</Text>
              <Text variant="body2">Steers</Text>
            </View>
            <View style={styles.totalItem}>
              <Text variant="h4" weight="bold" color="success.500">{herdTotals.maleCalves}</Text>
              <Text variant="body2">Male Calves</Text>
            </View>
            <View style={styles.totalItem}>
              <Text variant="h4" weight="bold" color="accent.500">{herdTotals.femaleCalves}</Text>
              <Text variant="body2">Female Calves</Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chartsContainer}
          >
            <View style={styles.chart}>
              <Text variant="h6" weight="medium" style={styles.chartTitle}>Breed Distribution</Text>
              <PieChart
                data={breedDistribution}
                height={200}
                width={300}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
              />
            </View>
            <View style={styles.chart}>
              <Text variant="h6" weight="medium" style={styles.chartTitle}>Source Distribution</Text>
              <PieChart
                data={sourceDistribution}
                height={200}
                width={300}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
              />
            </View>
            <View style={styles.chart}>
              <Text variant="h6" weight="medium" style={styles.chartTitle}>Age Distribution</Text>
              <PieChart
                data={sourceDistribution}
                height={200}
                width={300}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
              />
            </View>
            <View style={styles.chart}>
              <Text variant="subtitle1" weight="medium" style={styles.chartTitle}>Stock Type Breakdown</Text>
              <PieChart
                data={stockTypeBreakdown}
                height={200}
                width={300}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
              />
            </View>
          </ScrollView>
        </Card>

        {/* Herd Register Section */}
        <Card 
          title="Herd Register" 
          style={styles.card}
          headerRight={
            <Button 
              size="sm" 
              onPress={() => setIsAddModalVisible(true)}
              style={styles.addButton}
            >
              + Add Animal
            </Button>
          }
        >
          <DataTable
            columns={[
              { key: 'unitNo', title: 'Unit No', width: 80 },
              { key: 'tag', title: 'Tag', width: 80 },
              { key: 'age', title: 'Age', width: 80 },
              { key: 'breed', title: 'Breed', width: 100 },
              { 
                key: 'sex', 
                title: 'Sex', 
                width: 80,
                render: (value: string) => (
                  <Text color={value === 'Male' ? 'primary.500' : 'accent.500'}>{value}</Text>
                )
              },
              { key: 'stockType', title: 'Type', width: 100 },
              { key: 'source', title: 'Source', width: 100 },
            ]}
            data={herdRegisterData}
          />
          {renderAddAnimalModal()}
        </Card>

        {/* Calf Register Section */}
        <Card title="Calf Register" style={styles.card}>
          <DataTable
            columns={[
              { key: 'unit', title: 'Unit', width: 80 },
              { key: 'calfId', title: 'Calf ID', width: 80 },
              { key: 'age', title: 'Age', width: 60 },
              { key: 'deliveryType', title: 'Delivery', width: 100 },
              { key: 'observer', title: 'Observer', width: 100 },
              { key: 'birthWeight', title: 'Weight', width: 80 },
              { key: 'sex', title: 'Sex', width: 80 },
            ]}
            data={calfRegisterData}
          />
        </Card>

        {/* Drug Register Section */}
        <Card 
          title="Drug Register" 
          style={styles.card}
          headerRight={
            <Button 
              size="sm" 
              onPress={() => setIsAddDrugModalVisible(true)}
              style={styles.addButton}
            >
              + Add Drug
            </Button>
          }
        >
          <DataTable
            columns={[
              { key: 'drugClass', title: 'Class', width: 100 },
              { key: 'type', title: 'Type', width: 80 },
              { key: 'name', title: 'Name', width: 120 },
              { 
                key: 'pregnancySafe', 
                title: 'Preg. Safe', 
                width: 80,
                render: (value: string) => (
                  <Text color={value === 'Yes' ? 'success.500' : 'error.500'}>{value}</Text>
                )
              },
              { key: 'withdrawalPeriod', title: 'Withdrawal', width: 100 },
              { key: 'stock', title: 'Stock', width: 100 },
            ]}
            data={drugRegisterData}
          />
          {renderAddDrugModal()}
        </Card>

        {/* Cull & Mortalities Section */}
        <Card title="Cull & Mortalities" style={styles.card}>
          <DataTable
            columns={[
              { key: 'id', title: 'ID', width: 100 },
              { key: 'date', title: 'Date', width: 100 },
              { key: 'cause', title: 'Cause', width: 100 },
              { key: 'description', title: 'Description', width: 200 },
            ]}
            data={mortalityData}
          />
        </Card>

        {/* Animal Health Records Section */}
        <Card title="Animal Health Records" style={styles.card}>
          <DataTable
            columns={[
              { key: 'date', title: 'Date', width: 100 },
              { key: 'animalId', title: 'Animal ID', width: 100 },
              { key: 'treatment', title: 'Treatment', width: 200 },
              { 
                key: 'status', 
                title: 'Status', 
                width: 100,
                render: (value: string) => (
                  <View style={[
                    styles.statusBadge, 
                    { 
                      backgroundColor: value === 'Completed' ? '#DCF7E8' : 
                                    value === 'Scheduled' ? '#E0F2FE' : '#FEF3C7',
                    }
                  ]}>
                    <Text 
                      variant="caption" 
                      style={{ 
                        color: value === 'Completed' ? Colors.success[700] : 
                              value === 'Scheduled' ? Colors.primary[700] : Colors.warning[700],
                        fontWeight: '500',
                      }}
                    >
                      {value}
                    </Text>
                  </View>
                )
              },
            ]}
            data={animalHealthRecords}
          />
        </Card>

        {/* Bull Breeding Soundness Section */}
        <Card title="Bull Breeding Soundness" style={styles.card}>
          <DataTable
            columns={[
              { key: 'date', title: 'Date', width: 80 },
              { key: 'id', title: 'Bull ID', width: 80 },
              { key: 'age', title: 'Age', width: 80 },
              { 
                key: 'pe', 
                title: 'PE', 
                width: 100,
                render: (value: string) => (
                  <Text color={
                    value === 'Excellent' ? 'success.500' : 
                    value === 'Good' ? 'primary.500' : 'error.500'
                  }>
                    {value}
                  </Text>
                )
              },
              { key: 'spermMotility', title: 'Sperm Motility', width: 100 },
              { key: 'spermMorphology', title: 'Sperm Morphology', width: 100 },
              { key: 'scrotal', title: 'Scrotal (cm)', width: 90 },
              { 
                key: 'libido', 
                title: 'Libido', 
                width: 90,
                render: (value: string) => (
                  <Text color={
                    value === 'Excellent' ? 'success.500' : 
                    value === 'Good' ? 'primary.500' : 'error.500'
                  }>
                    {value}
                  </Text>
                )
              },
              { key: 'score', title: 'Score', width: 80 },
              { 
                key: 'classification', 
                title: 'Classification', 
                width: 80,
                render: (value: string) => (
                  <Text color={
                    value === 'SPB' ? 'success.500' : 
                    value === 'USPB' ? 'error.500' : 'warning.500'
                  }>
                    {value}
                  </Text>
                )
              },
            ]}
            data={bullBreedingSoundnessData}
          />
        </Card>

        {/* Sales & Purchases Section */}
        <Card title="Sales & Purchases" style={styles.card}>
          <DataTable
            columns={[
              { key: 'date', title: 'Date', width: 100 },
              { key: 'description', title: 'Description', width: 200 },
              { 
                key: 'amount', 
                title: 'Amount', 
                width: 100,
                render: (value: number) => (
                  <Text color={value >= 0 ? 'success.500' : 'error.500'}>
                    {value >= 0 ? '+' : ''}{value}
                  </Text>
                )
              },
              { key: 'type', title: 'Type', width: 100 },
            ]}
            data={transactionData}
          />
        </Card>

        {/* Weight Record Section */}
        <Card title="Weight Record" style={styles.card}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DataTable
              columns={[
                { key: 'id', title: 'ID', width: 80 },
                { key: 'stockType', title: 'Type', width: 80 },
                { key: 'age', title: 'Age', width: 80 },
                { key: 'jan', title: 'Jan', width: 70 },
                { key: 'feb', title: 'Feb', width: 70 },
                { key: 'mar', title: 'Mar', width: 70 },
                { key: 'apr', title: 'Apr', width: 70 },
                { key: 'may', title: 'May', width: 70 },
                { key: 'jun', title: 'Jun', width: 70 },
                { key: 'jul', title: 'Jul', width: 70 },
                { key: 'aug', title: 'Aug', width: 70 },
                { key: 'sep', title: 'Sep', width: 70 },
                { key: 'oct', title: 'Oct', width: 70 },
                { key: 'nov', title: 'Nov', width: 70 },
                { key: 'dec', title: 'Dec', width: 70 },
              ]}
              data={weightData}
            />
          </ScrollView>
        </Card>

        {/* Feed Inventory Section */}
        <Card title="Feed Inventory" style={styles.card}>
          <DataTable
            columns={[
              { key: 'id', title: 'ID', width: 70 },
              { key: 'name', title: 'Feed Name', width: 120 },
              { key: 'type', title: 'Type', width: 100 },
              { 
                key: 'quantity', 
                title: 'Quantity', 
                width: 90,
                render: (value: string, row: any) => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{value} </Text>
                    <Text variant="caption" color="neutral.500">({row.unit})</Text>
                  </View>
                )
              },
              { key: 'supplier', title: 'Supplier', width: 100 },
              { key: 'lastUpdated', title: 'Last Updated', width: 100 },
              { 
                key: 'status', 
                title: 'Status', 
                width: 90,
                render: (value: string) => (
                  <View 
                    style={[
                      styles.statusBadge,
                      { 
                        backgroundColor: 
                          value === 'In Stock' ? 'rgba(34, 197, 94, 0.1)' :
                          value === 'Low Stock' ? 'rgba(234, 179, 8, 0.1)' :
                          'rgba(239, 68, 68, 0.1)',
                        borderColor: 
                          value === 'In Stock' ? Colors.success[400] :
                          value === 'Low Stock' ? Colors.warning[400] :
                          Colors.error[400],
                      }
                    ]}
                  >
                    <Text 
                      variant="caption" 
                      weight="medium"
                      color={
                        value === 'In Stock' ? 'success.600' :
                        value === 'Low Stock' ? 'warning.600' :
                        'error.600'
                      }
                    >
                      {value}
                    </Text>
                  </View>
                )
              },
            ]}
            data={feedInventoryData}
          />
        </Card>

        {/* Pregnancy Diagnosis and Calving Section */}
        <Card title="Pregnancy Diagnosis and Calving" style={styles.card}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <DataTable
              columns={[
                { key: 'cowEarTag', title: 'Cow Ear Tag', width: 100 },
                { key: 'bodyConditionScore', title: 'BCS', width: 70, render: (value: number) => value.toFixed(1) },
                { key: 'lastServiceDate', title: 'Last Service', width: 100 },
                { 
                  key: 'firstTrimesterPD', 
                  title: '1st Tri PD', 
                  width: 90,
                  render: (value: string) => (
                    <Text color={
                      value === 'Positive' ? 'success.500' : 
                      value === 'Negative' ? 'error.500' : 
                      value === 'Inconclusive' ? 'warning.500' : 'neutral.500'
                    }>
                      {value}
                    </Text>
                  )
                },
                { 
                  key: 'secondTrimesterPD', 
                  title: '2nd Tri PD', 
                  width: 90,
                  render: (value: string) => (
                    <Text color={
                      value === 'Positive' ? 'success.500' : 
                      value === 'Negative' ? 'error.500' : 
                      value === 'Inconclusive' ? 'warning.500' : 'neutral.500'
                    }>
                      {value}
                    </Text>
                  )
                },
                { 
                  key: 'thirdTrimesterPD', 
                  title: '3rd Tri PD', 
                  width: 90,
                  render: (value: string) => (
                    <Text color={
                      value === 'Positive' ? 'success.500' : 
                      value === 'Negative' ? 'error.500' : 
                      value === 'Inconclusive' ? 'warning.500' : 'neutral.500'
                    }>
                      {value}
                    </Text>
                  )
                },
                { key: 'gestationPeriod', title: 'Gestation (days)', width: 100 },
                { key: 'expectedCalvingDate', title: 'Exp. Calving', width: 100 },
                { key: 'actualCalvingDate', title: 'Actual Calving', width: 100 },
                { key: 'calfId', title: 'Calf ID', width: 90 },
                { 
                  key: 'calfSex', 
                  title: 'Calf Sex', 
                  width: 80,
                  render: (value: string) => (
                    <Text color={value === 'Female' ? 'accent.500' : 'primary.500'}>
                      {value}
                    </Text>
                  )
                },
                { key: 'deliveryType', title: 'Delivery Type', width: 100 },
                { key: 'averageBCS', title: 'Avg BCS', width: 80, render: (value: number) => value?.toFixed(1) },
                { key: 'expectedReturnToHeatDate', title: 'Exp. 1st Heat', width: 100 },
                { key: 'actualFirstHeatDate', title: 'Actual 1st Heat', width: 100 },
                { key: 'expectedSecondHeatDate', title: 'Exp. 2nd Heat', width: 100 },
                { key: 'actualSecondHeatDate', title: 'Actual 2nd Heat', width: 100 },
                { key: 'expectedSecondReturnToHeatDate', title: 'Exp. 2nd Return', width: 110 },
              ]}
              data={pregnancyCalvingRecords}
            />
          </ScrollView>
        </Card>

        {/* Heat Detection and Breeding Section */}
        <Card title="Heat Detection and Breeding" style={styles.card}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <DataTable
              columns={[
                { key: 'earTagNumber', title: 'Ear Tag', width: 90 },
                { key: 'stockType', title: 'Stock Type', width: 120 },
                { 
                  key: 'bodyConditionScore', 
                  title: 'BCS', 
                  width: 70, 
                  render: (value: number) => value?.toFixed(1) 
                },
                { key: 'heatDetectionDate', title: 'Heat Detected', width: 100 },
                { key: 'observer', title: 'Observer', width: 100 },
                { key: 'servicedDate', title: 'Serviced Date', width: 100 },
                { 
                  key: 'breedingStatus', 
                  title: 'Status', 
                  width: 100,
                  render: (value: string) => (
                    <Text 
                      color={
                        value === 'Confirmed Pregnant' ? 'success.500' :
                        value === 'Bred' ? 'primary.500' :
                        value === 'Open' ? 'warning.500' : 'error.500'
                      }
                    >
                      {value}
                    </Text>
                  )
                },
                { key: 'breedingMethod', title: 'Method', width: 90 },
                { key: 'aiTechnician', title: 'AI Tech', width: 100 },
                { 
                  key: 'sireId', 
                  title: 'Sire/Straw ID', 
                  width: 120,
                  render: (_: any, record: HeatBreedingRecord) => 
                    record.breedingMethod === 'AI' 
                      ? `${record.sireId || ''} / ${record.strawId || ''}` 
                      : record.sireId || ''
                },
                { 
                  key: 'semenViability', 
                  title: 'Viability %', 
                  width: 90,
                  render: (value: number) => value ? `${value}%` : 'N/A'
                },
                { key: 'returnToHeatDate1', title: 'Return to Heat 1', width: 110 },
                { key: 'dateServed2', title: 'Date Served 2', width: 100 },
                { key: 'breedingMethod2', title: 'Method 2', width: 90 },
                { key: 'sireUsed2', title: 'Sire Used 2', width: 100 },
                { key: 'returnToHeatDate2', title: 'Return to Heat 2', width: 110 },
              ]}
              data={heatBreedingRecords}
            />
          </ScrollView>
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    flexDirection: 'column',
  },
  modalScrollView: {
    flex: 1,
    marginBottom: 16,
  },
  modalScrollViewContent: {
    paddingBottom: 16,
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: Colors.neutral[700],
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 5,
  },
  radioButton: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: Colors.primary[50],
    borderColor: Colors.primary[500],
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelButton: {
    marginRight: 10,
  },
  addButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  filter: {
    flex: 1,
  },
  totalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  totalItem: {
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
    backgroundColor: Colors.neutral[50],
    padding: 12,
    borderRadius: 8,
  },
  chartsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  chart: {
    flex: 1,
    alignItems: 'center',
  },
  chartTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
});
