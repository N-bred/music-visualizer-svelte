import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
import type { LerpFunctions } from "@/utils/lerp";
import { Scene, Points, BufferGeometry, Float32BufferAttribute, MathUtils, ShaderMaterial } from "three";
import Vertex from "@/scenes/shaders/vertex.glsl";
import Fragment from "@/scenes/shaders/frag.glsl";

export default class ShaderScene extends Scene {
  transitionSpeed: number;
  lerpType: LerpFunctions = "linear";

  constructor(transitionSpeed: number = 0.3, lerpType: LerpFunctions = "linear") {
    super();
    this.transitionSpeed = transitionSpeed;
    this.lerpType = lerpType;
    this.setup();
  }

  setup() {
    const vertices = [];

    for (let i = 0; i < FFT_QUANTITY * 3; i++) {
      const x = MathUtils.randFloatSpread(2000);
      const y = MathUtils.randFloatSpread(2000);
      const z = MathUtils.randFloatSpread(2000);

      vertices.push(x, y, z);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

    const material = new ShaderMaterial({
      vertexShader: Vertex,
      fragmentShader: Fragment,
    });

    const points = new Points(geometry, material);
    this.add(points);
  }

  animate(FFT: number[], delta: number) {}
}
