import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export interface HerdRecord {
  id: string;
  tag_number: string;
  breed: string;
  date_of_birth: string;
  sex: 'male' | 'female';
  created_at: string;
  updated_at: string;
}

interface HerdContextType {
  herdRecords: HerdRecord[];
  loading: boolean;
  error: string | null;
  addHerdRecord: (record: Omit<HerdRecord, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateHerdRecord: (id: string, record: Partial<HerdRecord>) => Promise<void>;
  deleteHerdRecord: (id: string) => Promise<void>;
  refreshHerdRecords: () => Promise<void>;
  getAnimalAge: (dateOfBirth: string) => string;
  getCurrentWeight: (tagNumber: string) => Promise<number | null>;
}

const HerdContext = createContext<HerdContextType | undefined>(undefined);

export const HerdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [herdRecords, setHerdRecords] = useState<HerdRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHerdRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('herd_register')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHerdRecords(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch herd records');
    } finally {
      setLoading(false);
    }
  };

  const addHerdRecord = async (record: Omit<HerdRecord, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setError(null);
      
      const { data, error } = await supabase
        .from('herd_register')
        .insert([record])
        .select()
        .single();

      if (error) throw error;
      setHerdRecords(prev => [data, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add herd record');
      throw err;
    }
  };

  const updateHerdRecord = async (id: string, record: Partial<HerdRecord>) => {
    try {
      setError(null);
      
      const { data, error } = await supabase
        .from('herd_register')
        .update(record)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setHerdRecords(prev => prev.map(item => item.id === id ? data : item));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update herd record');
      throw err;
    }
  };

  const deleteHerdRecord = async (id: string) => {
    try {
      setError(null);
      
      const { error } = await supabase
        .from('herd_register')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setHerdRecords(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete herd record');
      throw err;
    }
  };

  const refreshHerdRecords = async () => {
    await fetchHerdRecords();
  };

  const getAnimalAge = (dateOfBirth: string): string => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const ageInMilliseconds = today.getTime() - birthDate.getTime();
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const ageInMonths = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    
    if (ageInYears > 0) {
      return `${ageInYears}y ${ageInMonths}m`;
    } else {
      return `${ageInMonths}m`;
    }
  };

  const getCurrentWeight = async (tagNumber: string): Promise<number | null> => {
    try {
      const { data, error } = await supabase
        .from('weight_records')
        .select('weight')
        .eq('tag_number', tagNumber)
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (error) return null;
      return data?.weight || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    fetchHerdRecords();
  }, []);

  const value: HerdContextType = {
    herdRecords,
    loading,
    error,
    addHerdRecord,
    updateHerdRecord,
    deleteHerdRecord,
    refreshHerdRecords,
    getAnimalAge,
    getCurrentWeight,
  };

  return (
    <HerdContext.Provider value={value}>
      {children}
    </HerdContext.Provider>
  );
};

export const useHerd = (): HerdContextType => {
  const context = useContext(HerdContext);
  if (!context) {
    throw new Error('useHerd must be used within a HerdProvider');
  }
  return context;
};