import React from 'react';
import {AuthProvider} from './Authentication/AuthProvider';
import {Routes} from './Routes';

interface ProvidersProps {}

// If you have other providers you can wrap them here too

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
