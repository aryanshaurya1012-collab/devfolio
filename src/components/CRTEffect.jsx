import { EffectComposer, Scanline, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function CRTEffect() {
  return (
    <EffectComposer>
      <ChromaticAberration
        offset={[0.001, 0.001]}
        radialModulation={false}
        modulationOffset={0}
      />
      <Scanline
        blendFunction={BlendFunction.OVERLAY}
        density={1.5}
        opacity={0.15}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.02}
      />
      <Vignette
        eskil={false}
        offset={0.15}
        darkness={0.9}
      />
    </EffectComposer>
  )
}
