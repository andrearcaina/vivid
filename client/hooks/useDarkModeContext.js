'use client';
import { useContext } from 'react';
import { DarkModeContext } from '@/contexts/darkModeContext';

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('useDarkMode must be used within an DarkModeContextProvider');
    }
    return context;
}
