import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface HerdRecord {
  id: string;
  tag: string;
  breed: string;
  age: number;
  sex: 'Male' | 'Female';
  created_at: string;
  user_id: string;
}

interface HerdContextType {
  herdRecords: HerdRecord[];
  loading: boolean;
  error: string | null;
  addHerdRecord: (record: Omit<HerdRecord, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  updateHerdRecord: (id: string, record: Partial<HerdRecord>) => Promise<void>;
  deleteHerdRecord: (id: string) => Promise<void>;
  refreshHerdRecords: () => Promise<void>;
}

const HerdContext = createContext<HerdContextType | undefined>(undefined);

export const HerdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [herdRecords, setHerdRecords] = useState<HerdRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchHerdRecords = async () => {
    if (!user) {
      setHerdRecords([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('herd_register')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      
      setHerdRecords(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch herd records');
      console.error('Error fetching herd records:', err);
    } finally {
      setLoading(false);
    }
  };

  const addHerdRecord = async (record: Omit<HerdRecord, 'id' | 'created_at' | 'user_id'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      
      const { data, error: insertError } = await supabase
        .from('herd_register')
        .insert([{ ...record, user_id: user.id }])
        .select()
        .single();

      if (insertError) throw insertError;
      
      setHerdRecords(prev => [data, ...prev]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add herd record';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateHerdRecord = async (id: string, record: Partial<HerdRecord>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      
      const { data, error: updateError } = await supabase
        .from('herd_register')
        .update(record)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;
      
      setHerdRecords(prev => 
        prev.map(item => item.id === id ? data : item)
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update herd record';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteHerdRecord = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      
      const { error: deleteError } = await supabase
        .from('herd_register')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;
      
      setHerdRecords(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete herd record';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const refreshHerdRecords = async () => {
    await fetchHerdRecords();
  };

  useEffect(() => {
    fetchHerdRecords();
  }, [user]);

  const value: HerdContextType = {
    herdRecords,
    loading,
    error,
    addHerdRecord,
    updateHerdRecord,
    deleteHerdRecord,
    refreshHerdRecords,
  };

  return (
    <HerdContext.Provider value={value}>
      {children}
    </HerdContext.Provider>
  );
};

export const useHerd = (): HerdContextType => {
  const context = useContext(HerdContext);
  if (context === undefined) {
    throw new Error('useHerd must be used within a HerdProvider');
  }
  return context;
};