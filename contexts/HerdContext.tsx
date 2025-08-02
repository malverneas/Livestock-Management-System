import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface HerdRecord {
  id: string;
  tag_number: string;
  breed: string;
  age: number;
  sex: string;
}

interface HerdContextType {
  herdData: HerdRecord[];
  loading: boolean;
  addRecord: (record: Omit<HerdRecord, 'id'>) => Promise<void>;
  updateRecord: (id: string, record: Partial<HerdRecord>) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const HerdContext = createContext<HerdContextType | undefined>(undefined);

export function HerdProvider({ children }: { children: React.ReactNode }) {
  const [herdData, setHerdData] = useState<HerdRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('herd_register')
      .select('*')
      .eq('user_id', user.id)
      .order('tag_number');

    if (error) {
      console.error('Error fetching herd data:', error);
    } else {
      setHerdData(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const addRecord = async (record: Omit<HerdRecord, 'id'>) => {
    if (!user) return;

    const { error } = await supabase
      .from('herd_register')
      .insert([{ ...record, user_id: user.id }]);

    if (error) {
      console.error('Error adding herd record:', error);
      throw error;
    }
    
    await fetchData();
  };

  const updateRecord = async (id: string, record: Partial<HerdRecord>) => {
    const { error } = await supabase
      .from('herd_register')
      .update(record)
      .eq('id', id);

    if (error) {
      console.error('Error updating herd record:', error);
      throw error;
    }
    
    await fetchData();
  };

  const deleteRecord = async (id: string) => {
    const { error } = await supabase
      .from('herd_register')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting herd record:', error);
      throw error;
    }
    
    await fetchData();
  };

  const refreshData = async () => {
    await fetchData();
  };

  return (
    <HerdContext.Provider
      value={{
        herdData,
        loading,
        addRecord,
        updateRecord,
        deleteRecord,
        refreshData,
      }}
    >
      {children}
    </HerdContext.Provider>
  );
}

export function useHerd() {
  const context = useContext(HerdContext);
  if (context === undefined) {
    throw new Error('useHerd must be used within a HerdProvider');
  }
  return context;
}