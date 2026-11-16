import React from 'react';
import { Hero } from '../../hero/Hero';

export interface PresentationHeroPageProps {
  initialAuthMode?: 'signin' | 'signup' | null;
}

export const PresentationHeroPage: React.FC<PresentationHeroPageProps> = () => {
  return <Hero />;
};

export default PresentationHeroPage;
