import React from 'react';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';

export default function CRTEffect() {
  return (
    <EffectComposer disableNormalPass multisampling="{0}">
      <Noise opacity="{0.018}" />
      <Vignette darkness="{0.75}" eskil="{false}" offset="{0.15}" />
    </EffectComposer>
  );
}