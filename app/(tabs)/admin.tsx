import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Admin() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCount = async () => {
    setLoading(true);
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setCount(count ?? 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 22 }}>👥 Total users</Text>
      {loading ? <ActivityIndicator /> : <Text style={{ fontSize: 32, fontWeight: '700' }}>{count}</Text>}
      <Button title="Refresh" onPress={fetchCount} />
      <Text style={{ padding: 16, opacity: 0.7, textAlign: 'center' }}>This counts rows in the public.profiles table. A trigger ensures a row is created on sign-up.</Text>
    </View>
  );
}