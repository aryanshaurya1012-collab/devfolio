import { EffectComposer, Scanline, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function CRTEffect() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <ChromaticAberration
        offset={[0.0015, 0.0015]}
        radialModulation={false}
        modulationOffset={0}
      />
      <Scanline
        blendFunction={BlendFunction.OVERLAY}
        density={1.5}
        opacity={0.12}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.015}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={1.1}
      />
    </EffectComposer>
  )
}
