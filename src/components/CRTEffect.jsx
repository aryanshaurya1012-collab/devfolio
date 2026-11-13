import { EffectComposer, Scanline, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function CRTEffect() {
  return (
    <EffectComposer>
      <ChromaticAberration
        offset={[0.002, 0.002]}
        radialModulation={false}
        modulationOffset={0}
      />
      <Scanline
        blendFunction={BlendFunction.OVERLAY}
        density={2.5}
        opacity={0.4}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.18}
      />
      <Vignette
        eskil={false}
        offset={0.15}
        darkness={0.95}
      />
    </EffectComposer>
  )
}

