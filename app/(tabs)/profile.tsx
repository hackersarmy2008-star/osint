import { View, Text, Button } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Profile() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 22 }}>👤 Profile</Text>
      <Button title="Sign out" onPress={()=> supabase.auth.signOut()} />
    </View>
  );
}