
'use server';

import { supabase, isDemoMode } from './supabase';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function registerUser(values: unknown) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { fullName, email, password } = validatedFields.data;

  if (isDemoMode) {
    return { error: 'Demo mode - please configure Supabase to enable registration.' };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          display_name: fullName,
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return { error: 'This email is already registered.' };
      }
      return { error: error.message };
    }

    return { 
      success: 'User registered successfully! Please check your email for verification.', 
      user: data.user 
    };
  } catch (error: any) {
    return { error: error.message || 'An unexpected error occurred.' };
  }
}

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function loginUser(values: unknown) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  if (isDemoMode) {
    return { error: 'Demo mode - please configure Supabase to enable login.' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Invalid email or password.' };
      }
      return { error: error.message };
    }

    return { success: 'Logged in successfully!', user: data.user };
  } catch (error: any) {
    return { error: 'An unexpected error occurred.' };
  }
}

export async function logoutUser() {
  if (isDemoMode) {
    return { success: 'Logged out successfully!' };
  }

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
