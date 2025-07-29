import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '../../components/typography/Text';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import Colors from '../../constants/Colors';
import { Stack } from 'expo-router';

// Import all the table components
import { HerdRegisterTable } from '../../components/registration/herd-register/HerdRegisterTable';
import { HerdRegisterModal } from '../../components/registration/herd-register/HerdRegisterModal';
import { CalfRegisterTable } from '../../components/registration/calf-register/CalfRegisterTable';
import { CalfRegisterModal } from '../../components/registration/calf-register/CalfRegisterModal';
import { DrugRegisterTable } from '../../components/registration/drug-register/DrugRegisterTable';
import { DrugRegisterModal } from '../../components/registration/drug-register/DrugRegisterModal';
import { HeatDetectionTable } from '../../components/registration/heat-detection/HeatDetectionTable';
import { HeatDetectionModal } from '../../components/registration/heat-detection/HeatDetectionModal';

// Sample data for each register
const sampleHerdData = [
  {
    id: '1',
    tagNumber: 'H001',
    breed: 'brahman',
    dateOfBirth: '2020-03-15',
    sex: 'female',
    dam: 'H050',
    sire: 'B001',
    weight: '450',
    status: 'active',
  },
  {
    id: '2',
    tagNumber: 'H002',
    breed: 'mashona',
    dateOfBirth: '2019-08-22',
    sex: 'male',
    dam: 'H051',
    sire: 'B002',
    weight: '520',
    status: 'active',
  },
];

const sampleCalfData = [
  {
    id: '1',
    tagNumber: 'C001',
    dateOfBirth: '2024-01-15',
    sex: 'female',
    dam: 'H001',
    sire: 'B001',
    birthWeight: '35',
    weaningWeight: '180',
    weaningDate: '2024-07-15',
  },
];

const sampleDrugData = [
  {
    id: '1',
    drugName: 'Ivermectin',
    batchNumber: 'IV2024001',
    expiryDate: '2025-12-31',
    quantity: '500ml',
    supplier: 'VetSupply Co.',
    dateReceived: '2024-01-10',
    cost: '45.00',
    withdrawalPeriod: '28',
  },
];

const sampleHeatDetectionData = [
  {
    id: '1',
    animalTag: 'H001',
    heatDate: '2024-06-15',
    observer: 'John Smith',
    intensity: 'strong',
    breedingDate: '2024-06-16',
    bullUsed: 'B001',
    notes: 'Good standing heat observed',
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
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('herd');
  
  // Modal states for each register
  const [herdModalVisible, setHerdModalVisible] = useState(false);
  const [calfModalVisible, setCalfModalVisible] = useState(false);
  const [drugModalVisible, setDrugModalVisible] = useState(false);
  const [heatDetectionModalVisible, setHeatDetectionModalVisible] = useState(false);
  
  // Edit record states
  const [editingHerdRecord, setEditingHerdRecord] = useState(null);
  const [editingCalfRecord, setEditingCalfRecord] = useState(null);
  const [editingDrugRecord, setEditingDrugRecord] = useState(null);
  const [editingHeatDetectionRecord, setEditingHeatDetectionRecord] = useState(null);
  
  // Data states
  const [herdData, setHerdData] = useState(sampleHerdData);
  const [calfData, setCalfData] = useState(sampleCalfData);
  const [drugData, setDrugData] = useState(sampleDrugData);
  const [heatDetectionData, setHeatDetectionData] = useState(sampleHeatDetectionData);

  // Handle scroll to specific bull if coming from genetics screen
  React.useEffect(() => {
    if (params.scrollToBull) {
      // Handle scrolling to specific bull record
      console.log('Scrolling to bull:', params.scrollToBull);
    }
  }, [params.scrollToBull]);

  // Herd Register handlers
  const handleAddHerd = () => {
    setEditingHerdRecord(null);
    setHerdModalVisible(true);
  };

  const handleEditHerd = (record: any) => {
    setEditingHerdRecord(record);
    setHerdModalVisible(true);
  };

  const handleDeleteHerd = (id: string) => {
    setHerdData(herdData.filter(item => item.id !== id));
  };

  const handleSaveHerd = (record: any) => {
    if (editingHerdRecord) {
      setHerdData(herdData.map(item => 
        item.id === editingHerdRecord.id ? { ...record, id: editingHerdRecord.id } : item
      ));
    } else {
      setHerdData([...herdData, { ...record, id: Date.now().toString() }]);
    }
  };

  // Calf Register handlers
  const handleAddCalf = () => {
    setEditingCalfRecord(null);
    setCalfModalVisible(true);
  };

  const handleEditCalf = (record: any) => {
    setEditingCalfRecord(record);
    setCalfModalVisible(true);
  };

  const handleDeleteCalf = (id: string) => {
    setCalfData(calfData.filter(item => item.id !== id));
  };

  const handleSaveCalf = (record: any) => {
    if (editingCalfRecord) {
      setCalfData(calfData.map(item => 
        item.id === editingCalfRecord.id ? { ...record, id: editingCalfRecord.id } : item
      ));
    } else {
      setCalfData([...calfData, { ...record, id: Date.now().toString() }]);
    }
  };

  // Drug Register handlers
  const handleAddDrug = () => {
    setEditingDrugRecord(null);
    setDrugModalVisible(true);
  };

  const handleEditDrug = (record: any) => {
    setEditingDrugRecord(record);
    setDrugModalVisible(true);
  };

  const handleDeleteDrug = (id: string) => {
    setDrugData(drugData.filter(item => item.id !== id));
  };

  const handleSaveDrug = (record: any) => {
    if (editingDrugRecord) {
      setDrugData(drugData.map(item => 
        item.id === editingDrugRecord.id ? { ...record, id: editingDrugRecord.id } : item
      ));
    } else {
      setDrugData([...drugData, { ...record, id: Date.now().toString() }]);
    }
  };

  // Heat Detection handlers
  const handleAddHeatDetection = () => {
    setEditingHeatDetectionRecord(null);
    setHeatDetectionModalVisible(true);
  };

  const handleEditHeatDetection = (record: any) => {
    setEditingHeatDetectionRecord(record);
    setHeatDetectionModalVisible(true);
  };

  const handleDeleteHeatDetection = (id: string) => {
    setHeatDetectionData(heatDetectionData.filter(item => item.id !== id));
  };

  const handleSaveHeatDetection = (record: any) => {
    if (editingHeatDetectionRecord) {
      setHeatDetectionData(heatDetectionData.map(item => 
        item.id === editingHeatDetectionRecord.id ? { ...record, id: editingHeatDetectionRecord.id } : item
      ));
    } else {
      setHeatDetectionData([...heatDetectionData, { ...record, id: Date.now().toString() }]);
    }
  };

  const tabs = [
    { id: 'herd', title: 'Herd Register' },
    { id: 'calf', title: 'Calf Register' },
    { id: 'drug', title: 'Drug Register' },
    { id: 'mortality', title: 'Cull & Mortalities' },
    { id: 'pregnancy', title: 'Pregnancy & Calving' },
    { id: 'sales', title: 'Sales & Purchases' },
    { id: 'breeding', title: 'Bull Breeding Soundness' },
    { id: 'feed', title: 'Feed Inventory' },
    { id: 'health', title: 'Health Record' },
    { id: 'heat', title: 'Heat Detection' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'herd':
        return (
          <>
            <HerdRegisterTable
              data={herdData}
              onAdd={handleAddHerd}
              onEdit={handleEditHerd}
              onDelete={handleDeleteHerd}
            />
            <HerdRegisterModal
              visible={herdModalVisible}
              onClose={() => setHerdModalVisible(false)}
              onSave={handleSaveHerd}
              editRecord={editingHerdRecord}
            />
          </>
        );
      case 'calf':
        return (
          <>
            <CalfRegisterTable
              data={calfData}
              onAdd={handleAddCalf}
              onEdit={handleEditCalf}
              onDelete={handleDeleteCalf}
            />
            <CalfRegisterModal
              visible={calfModalVisible}
              onClose={() => setCalfModalVisible(false)}
              onSave={handleSaveCalf}
              editRecord={editingCalfRecord}
            />
          </>
        );
      case 'drug':
        return (
          <>
            <DrugRegisterTable
              data={drugData}
              onAdd={handleAddDrug}
              onEdit={handleEditDrug}
              onDelete={handleDeleteDrug}
            />
            <DrugRegisterModal
              visible={drugModalVisible}
              onClose={() => setDrugModalVisible(false)}
              onSave={handleSaveDrug}
              editRecord={editingDrugRecord}
            />
          </>
        );
      case 'heat':
        return (
          <>
            <HeatDetectionTable
              data={heatDetectionData}
              onAdd={handleAddHeatDetection}
              onEdit={handleEditHeatDetection}
              onDelete={handleDeleteHeatDetection}
            />
            <HeatDetectionModal
              visible={heatDetectionModalVisible}
              onClose={() => setHeatDetectionModalVisible(false)}
              onSave={handleSaveHeatDetection}
              editRecord={editingHeatDetectionRecord}
            />
          </>
        );
      default:
        return (
          <View style={styles.placeholderContainer}>
            <Text variant="h6" color="neutral.500">
              {tabs.find(tab => tab.id === activeTab)?.title} - Coming Soon
            </Text>
            <Text variant="body2" color="neutral.400" style={styles.placeholderText}>
              This register will be implemented in the next update.
            </Text>
          </View>
        );
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        <View style={styles.tabs}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text
                variant="body2"
                weight={activeTab === tab.id ? 'medium' : 'regular'}
                color={activeTab === tab.id ? 'primary.500' : 'neutral.600'}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  tabsContainer: {
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
    backgroundColor: Colors.white,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary[500],
  },
  content: {
    flex: 1,
    padding: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 8,
  },
});