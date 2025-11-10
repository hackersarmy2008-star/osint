import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AuthForm from '../components/AuthForm';
import { supabase } from '../lib/supabase';

export default function AuthScreen() {
  const [mode, setMode] = useState<'signIn'|'signUp'>('signIn');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>{mode === 'signIn' ? 'Welcome back' : 'Create your account'}</Text>
      <AuthForm mode={mode} onDone={()=>{}} />
      <Button title={mode === 'signIn' ? 'No account? Sign up' : 'Already have an account? Sign in'} onPress={()=> setMode(m => m==='signIn' ? 'signUp' : 'signIn')} />
      <Button title="Continue as guest" onPress={async ()=> {
        await supabase.auth.signInAnonymously();
      }} />
    </View>
  );
}