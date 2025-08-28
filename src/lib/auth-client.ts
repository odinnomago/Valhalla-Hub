'use client';

import { supabase } from './supabase';

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    });

    if (error) {
      console.error('Google OAuth Error:', error);
      return { error: error.message };
    }

    // The function will redirect to Google, so we won't reach this point
    return { success: 'Redirecting to Google...', data };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    return { error: 'Failed to initiate Google sign-in. Please try again.' };
  }
}

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { error: error.message };
    }
    
    return { success: 'Logged out successfully!' };
  } catch (error: any) {
    return { error: 'Failed to log out.' };
  }
}