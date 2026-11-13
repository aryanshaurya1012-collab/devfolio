import { EffectComposer, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function CRTEffect() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <ChromaticAberration
        offset={[0.0005, 0.0005]}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.025}
      />
      <Vignette
        eskil={false}
        offset={0.25}
        darkness={0.85}
      />
    </EffectComposer>
  )
}
