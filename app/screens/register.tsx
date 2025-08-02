import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../components/typography/Text';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import Colors from '../../constants/Colors';
import { Stack } from 'expo-router';
import { useHerd } from '../../contexts/HerdContext';
import { useCalf } from '../../contexts/CalfContext';

// Import all the table components
import { HerdRegisterTable } from '../../components/registration/herd-register/HerdRegisterTable';
import { HerdRegisterModal } from '../../components/registration/herd-register/HerdRegisterModal';
import { CalfRegisterTable } from '../../components/registration/calf-register/CalfRegisterTable';
import { CalfRegisterModal } from '../../components/registration/calf-register/CalfRegisterModal';
import { DrugRegisterTable } from '../../components/registration/drug-register/DrugRegisterTable';
import { DrugRegisterModal } from '../../components/registration/drug-register/DrugRegisterModal';
import { HeatDetectionTable } from '../../components/registration/heat-detection/HeatDetectionTable';
import { HeatDetectionModal } from '../../components/registration/heat-detection/HeatDetectionModal';
import { MortalityRegisterTable } from '../../components/registration/mortality-register/MortalityRegisterTable';
import { MortalityRegisterModal } from '../../components/registration/mortality-register/MortalityRegisterModal';
import { PregnancyRegisterTable } from '../../components/registration/pregnancy-register/PregnancyRegisterTable';
import { PregnancyRegisterModal } from '../../components/registration/pregnancy-register/PregnancyRegisterModal';
import { SalesRegisterTable } from '../../components/registration/sales-register/SalesRegisterTable';
import { SalesRegisterModal } from '../../components/registration/sales-register/SalesRegisterModal';
import { BreedingSoundnessTable } from '../../components/registration/breeding-soundness/BreedingSoundnessTable';
import { BreedingSoundnessModal } from '../../components/registration/breeding-soundness/BreedingSoundnessModal';
import { FeedInventoryTable } from '../../components/registration/feed-inventory/FeedInventoryTable';
import { FeedInventoryModal } from '../../components/registration/feed-inventory/FeedInventoryModal';
import { HealthRecordTable } from '../../components/registration/health-record/HealthRecordTable';
import { HealthRecordModal } from '../../components/registration/health-record/HealthRecordModal';
import { WeightRecordsTable } from '../../components/registration/weight-records/WeightRecordsTable';
import { WeightRecordsModal } from '../../components/registration/weight-records/WeightRecordsModal';

// Sample data for registers not yet connected to context
const sampleData = {
  drug: [],
  heatDetection: [],
  mortality: [],
  pregnancy: [],
  sales: [],
  breedingSoundness: [],
  feedInventory: [],
  healthRecord: [],
  weightRecords: [],
};

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
  const { herdData, addRecord: addHerdRecord, updateRecord: updateHerdRecord, deleteRecord: deleteHerdRecord } = useHerd();
  const { calfData, addRecord: addCalfRecord, updateRecord: updateCalfRecord, deleteRecord: deleteCalfRecord } = useCalf();
  
  const [activeTab, setActiveTab] = useState('herd');
  
  // Modal states for each register
  const [herdModalVisible, setHerdModalVisible] = useState(false);
  const [calfModalVisible, setCalfModalVisible] = useState(false);
  const [drugModalVisible, setDrugModalVisible] = useState(false);
  const [heatDetectionModalVisible, setHeatDetectionModalVisible] = useState(false);
  const [mortalityModalVisible, setMortalityModalVisible] = useState(false);
  const [pregnancyModalVisible, setPregnancyModalVisible] = useState(false);
  const [salesModalVisible, setSalesModalVisible] = useState(false);
  const [breedingSoundnessModalVisible, setBreedingSoundnessModalVisible] = useState(false);
  const [feedInventoryModalVisible, setFeedInventoryModalVisible] = useState(false);
  const [healthRecordModalVisible, setHealthRecordModalVisible] = useState(false);
  const [weightRecordsModalVisible, setWeightRecordsModalVisible] = useState(false);
  
  // Edit record states
  const [editingHerdRecord, setEditingHerdRecord] = useState(null);
  const [editingCalfRecord, setEditingCalfRecord] = useState(null);
  const [editingDrugRecord, setEditingDrugRecord] = useState(null);
  const [editingHeatDetectionRecord, setEditingHeatDetectionRecord] = useState(null);
  const [editingMortalityRecord, setEditingMortalityRecord] = useState(null);
  const [editingPregnancyRecord, setEditingPregnancyRecord] = useState(null);
  const [editingSalesRecord, setEditingSalesRecord] = useState(null);
  const [editingBreedingSoundnessRecord, setEditingBreedingSoundnessRecord] = useState(null);
  const [editingFeedInventoryRecord, setEditingFeedInventoryRecord] = useState(null);
  const [editingHealthRecord, setEditingHealthRecord] = useState(null);
  const [editingWeightRecord, setEditingWeightRecord] = useState(null);
  
  // Data states
  const [drugData, setDrugData] = useState(sampleData.drug);
  const [heatDetectionData, setHeatDetectionData] = useState(sampleData.heatDetection);
  const [mortalityData, setMortalityData] = useState(sampleData.mortality);
  const [pregnancyData, setPregnancyData] = useState(sampleData.pregnancy);
  const [salesData, setSalesData] = useState(sampleData.sales);
  const [breedingSoundnessData, setBreedingSoundnessData] = useState(sampleData.breedingSoundness);
  const [feedInventoryData, setFeedInventoryData] = useState(sampleData.feedInventory);
  const [healthRecordData, setHealthRecordData] = useState(sampleData.healthRecord);
  const [weightRecordsData, setWeightRecordsData] = useState(sampleData.weightRecords);

  // Herd Register handlers
  const handleAddHerd = () => {
    setEditingHerdRecord(null);
    setHerdModalVisible(true);
  };

  const handleEditHerd = (record: any) => {
    setEditingHerdRecord(record);
    setHerdModalVisible(true);
  };

  const handleDeleteHerd = async (id: string) => {
    await deleteHerdRecord(id);
  };

  const handleSaveHerd = async (record: any) => {
    if (editingHerdRecord) {
      await updateHerdRecord(editingHerdRecord.id, record);
    } else {
      await addHerdRecord(record);
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

  const handleDeleteCalf = async (id: string) => {
    await deleteCalfRecord(id);
  };

  const handleSaveCalf = async (record: any) => {
    if (editingCalfRecord) {
      await updateCalfRecord(editingCalfRecord.id, record);
    } else {
      await addCalfRecord(record);
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

  // Mortality Register handlers
  const handleAddMortality = () => {
    setEditingMortalityRecord(null);
    setMortalityModalVisible(true);
  };

  const handleEditMortality = (record: any) => {
    setEditingMortalityRecord(record);
    setMortalityModalVisible(true);
  };

  const handleDeleteMortality = (id: string) => {
    setMortalityData(mortalityData.filter(item => item.id !== id));
  };

  const handleSaveMortality = (record: any) => {
    if (editingMortalityRecord) {
      setMortalityData(mortalityData.map(item => 
        item.id === editingMortalityRecord.id ? { ...record, id: editingMortalityRecord.id } : item
      ));
    } else {
      setMortalityData([...mortalityData, { ...record, id: Date.now().toString() }]);
    }
  };

  // Pregnancy Register handlers
  const handleAddPregnancy = () => {
    setEditingPregnancyRecord(null);
    setPregnancyModalVisible(true);
  };

  const handleEditPregnancy = (record: any) => {
    setEditingPregnancyRecord(record);
    setPregnancyModalVisible(true);
  };

  const handleDeletePregnancy = (id: string) => {
    setPregnancyData(pregnancyData.filter(item => item.id !== id));
  };

  const handleSavePregnancy = (record: any) => {
    if (editingPregnancyRecord) {
      setPregnancyData(pregnancyData.map(item => 
        item.id === editingPregnancyRecord.id ? { ...record, id: editingPregnancyRecord.id } : item
      ));
    } else {
      setPregnancyData([...pregnancyData, { ...record, id: Date.now().toString() }]);
    }
  };

  // Sales Register handlers
  const handleAddSales = () => {
    setEditingSalesRecord(null);
    setSalesModalVisible(true);
  };

  const handleEditSales = (record: any) => {
    setEditingSalesRecord(record);
    setSalesModalVisible(true);
  };

  const handleDeleteSales = (id: string) => {
    setSalesData(salesData.filter(item => item.id !== id));
  };

  const handleSaveSales = (record: any) => {
    if (editingSalesRecord) {
      setSalesData(salesData.map(item => 
        item.id === editingSalesRecord.id ? { ...record, id: editingSalesRecord.id } : item
      ));
    } else {
      setSalesData([...salesData, { ...record, id: Date.now().toString() }]);
    }
  };

  // Breeding Soundness handlers
  const handleAddBreedingSoundness = () => {
    setEditingBreedingSoundnessRecord(null);
    setBreedingSoundnessModalVisible(true);
  };

  const handleEditBreedingSoundness = (record: any) => {
    setEditingBreedingSoundnessRecord(record);
    setBreedingSoundnessModalVisible(true);
  };

  const handleDeleteBreedingSoundness = (id: string) => {
    setBreedingSoundnessData(breedingSoundnessData.filter(item => item.id !== id));
  };

  const handleSaveBreedingSoundness = (record: any) => {
    if (editingBreedingSoundnessRecord) {
      setBreedingSoundnessData(breedingSoundnessData.map(item => 
        item.id === editingBreedingSoundnessRecord.id ? { ...record, id: editingBreedingSoundnessRecord.id } : item
      ));
    } else {
      setBreedingSoundnessData([...breedingSoundnessData, { ...record, id: Date.now().toString() }]);
    }
  };

  // Feed Inventory handlers
  const handleAddFeedInventory = () => {
    setEditingFeedInventoryRecord(null);
    setFeedInventoryModalVisible(true);
  };

  const handleEditFeedInventory = (record: any) => {
    setEditingFeedInventoryRecord(record);
    setFeedInventoryModalVisible(true);
  };

  const handleDeleteFeedInventory = (id: string) => {
    setFeedInventoryData(feedInventoryData.filter(item => item.id !== id));
  };

  const handleSaveFeedInventory = (record: any) => {
    if (editingFeedInventoryRecord) {
      setFeedInventoryData(feedInventoryData.map(item => 
        item.id === editingFeedInventoryRecord.id ? { ...record, id: editingFeedInventoryRecord.id } : item
      ));
    } else {
      setFeedInventoryData([...feedInventoryData, { ...record, id: Date.now().toString() }]);
    }
  };

  // Health Record handlers
  const handleAddHealthRecord = () => {
    setEditingHealthRecord(null);
    setHealthRecordModalVisible(true);
  };

  const handleEditHealthRecord = (record: any) => {
    setEditingHealthRecord(record);
    setHealthRecordModalVisible(true);
  };

  const handleDeleteHealthRecord = (id: string) => {
    setHealthRecordData(healthRecordData.filter(item => item.id !== id));
  };

  const handleSaveHealthRecord = (record: any) => {
    if (editingHealthRecord) {
      setHealthRecordData(healthRecordData.map(item => 
        item.id === editingHealthRecord.id ? { ...record, id: editingHealthRecord.id } : item
      ));
    } else {
      setHealthRecordData([...healthRecordData, { ...record, id: Date.now().toString() }]);
    }
  };

  // Weight Records handlers
  const handleAddWeightRecord = () => {
    setEditingWeightRecord(null);
    setWeightRecordsModalVisible(true);
  };

  const handleEditWeightRecord = (record: any) => {
    setEditingWeightRecord(record);
    setWeightRecordsModalVisible(true);
  };

  const handleDeleteWeightRecord = (id: string) => {
    setWeightRecordsData(weightRecordsData.filter(item => item.id !== id));
  };

  const handleSaveWeightRecord = (record: any) => {
    if (editingWeightRecord) {
      setWeightRecordsData(weightRecordsData.map(item => 
        item.id === editingWeightRecord.id ? { ...record, id: editingWeightRecord.id } : item
      ));
    } else {
      setWeightRecordsData([...weightRecordsData, { ...record, id: Date.now().toString() }]);
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
    { id: 'weight', title: 'Weight Records' },
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
      case 'mortality':
        return (
          <>
            <MortalityRegisterTable
              data={mortalityData}
              onAdd={handleAddMortality}
              onEdit={handleEditMortality}
              onDelete={handleDeleteMortality}
            />
            <MortalityRegisterModal
              visible={mortalityModalVisible}
              onClose={() => setMortalityModalVisible(false)}
              onSave={handleSaveMortality}
              editRecord={editingMortalityRecord}
            />
          </>
        );
      case 'pregnancy':
        return (
          <>
            <PregnancyRegisterTable
              data={pregnancyData}
              onAdd={handleAddPregnancy}
              onEdit={handleEditPregnancy}
              onDelete={handleDeletePregnancy}
            />
            <PregnancyRegisterModal
              visible={pregnancyModalVisible}
              onClose={() => setPregnancyModalVisible(false)}
              onSave={handleSavePregnancy}
              editRecord={editingPregnancyRecord}
            />
          </>
        );
      case 'sales':
        return (
          <>
            <SalesRegisterTable
              data={salesData}
              onAdd={handleAddSales}
              onEdit={handleEditSales}
              onDelete={handleDeleteSales}
            />
            <SalesRegisterModal
              visible={salesModalVisible}
              onClose={() => setSalesModalVisible(false)}
              onSave={handleSaveSales}
              editRecord={editingSalesRecord}
            />
          </>
        );
      case 'breeding':
        return (
          <>
            <BreedingSoundnessTable
              data={breedingSoundnessData}
              onAdd={handleAddBreedingSoundness}
              onEdit={handleEditBreedingSoundness}
              onDelete={handleDeleteBreedingSoundness}
            />
            <BreedingSoundnessModal
              visible={breedingSoundnessModalVisible}
              onClose={() => setBreedingSoundnessModalVisible(false)}
              onSave={handleSaveBreedingSoundness}
              editRecord={editingBreedingSoundnessRecord}
            />
          </>
        );
      case 'feed':
        return (
          <>
            <FeedInventoryTable
              data={feedInventoryData}
              onAdd={handleAddFeedInventory}
              onEdit={handleEditFeedInventory}
              onDelete={handleDeleteFeedInventory}
            />
            <FeedInventoryModal
              visible={feedInventoryModalVisible}
              onClose={() => setFeedInventoryModalVisible(false)}
              onSave={handleSaveFeedInventory}
              editRecord={editingFeedInventoryRecord}
            />
          </>
        );
      case 'health':
        return (
          <>
            <HealthRecordTable
              data={healthRecordData}
              onAdd={handleAddHealthRecord}
              onEdit={handleEditHealthRecord}
              onDelete={handleDeleteHealthRecord}
            />
            <HealthRecordModal
              visible={healthRecordModalVisible}
              onClose={() => setHealthRecordModalVisible(false)}
              onSave={handleSaveHealthRecord}
              editRecord={editingHealthRecord}
            />
          </>
        );
      case 'weight':
        return (
          <>
            <WeightRecordsTable
              data={weightRecordsData}
              onAdd={handleAddWeightRecord}
              onEdit={handleEditWeightRecord}
              onDelete={handleDeleteWeightRecord}
            />
            <WeightRecordsModal
              visible={weightRecordsModalVisible}
              onClose={() => setWeightRecordsModalVisible(false)}
              onSave={handleSaveWeightRecord}
              editRecord={editingWeightRecord}
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