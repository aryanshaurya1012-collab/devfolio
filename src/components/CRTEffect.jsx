import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function CRTEffect() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {/* Ultra-subtle tactile film grain without blurring text */}
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.018}
      />
      {/* Crisp optical vignette focusing visual weight on the active center monolith */}
      <Vignette
        eskil={false}
        offset={0.2}
        darkness={0.75}
      />
    </EffectComposer>
  )
}
