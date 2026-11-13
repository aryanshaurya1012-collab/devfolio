import { EffectComposer, Scanline, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function CRTEffect() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <ChromaticAberration
        offset={[0.001, 0.001]}
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
        opacity={0.01}
      />
      <Vignette
        eskil={false}
        offset={0.15}
        darkness={0.9}
      />
    </EffectComposer>
  )
}
