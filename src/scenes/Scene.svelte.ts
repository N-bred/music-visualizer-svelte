import { Scene, Mesh, BoxGeometry, MeshBasicMaterial, Group } from "three";
import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
import { isTransitionRunning, currentScene, previousScene, scenePropsRequireUpdate, getCurrentTheme } from "@/store/PropertiesPanel.svelte";
import type { MeshGroup, SceneDynamicValues, SceneProperties } from "@/types";
import sceneMap from "@/scenes/";
import { lerpSceneProperties } from "@/utils/";
import type { LerpFunctions } from "@/utils/lerp";

export default class CustomScene extends Scene {
  boxGeometry = new BoxGeometry(1, 1, 1);
  boxMaterial = new MeshBasicMaterial();
  groups: MeshGroup[] = [new Group() as MeshGroup];
  transitionTimer: number = 0;
  maxScalar: number = 256;
  transitionSpeed: number;
  lerpType: LerpFunctions = "linear";

  initialSceneProperties = $derived(sceneMap[previousScene.current].precalculateValues());

  targetSceneProperties = $derived(sceneMap[currentScene.current].precalculateValues());

  finalSceneProperties = $derived(sceneMap[previousScene.current].precalculateValues());

  dynamicValues: SceneDynamicValues = $derived(sceneMap[previousScene.current].dynamicValues);

  constructor(transitionSpeed: number = 0.3, lerpType: LerpFunctions = "linear") {
    super();
    this.transitionSpeed = transitionSpeed;
    this.lerpType = lerpType;
    this.setup();
  }

  setup() {
    this.groups.forEach((group) => {
      for (let i = 0; i < FFT_QUANTITY; ++i) {
        group.add(new Mesh(this.boxGeometry, this.boxMaterial.clone()));
      }
      this.add(group);
    });
    this.updateScene();
  }

  updateScene() {
    this.groups.forEach((_, gi) => {
      for (let i = 0; i < FFT_QUANTITY; ++i) {
        this.updateSceneAtIndex({
          groupIndex: gi,
          index: i,
          sceneProperties: this.finalSceneProperties,
        });
      }
    });
  }

  updateSceneAtIndex({ groupIndex, index, sceneProperties }: { groupIndex: number; index: number; sceneProperties: SceneProperties }) {
    this.groups[groupIndex].children[index].position.x = sceneProperties[index].position[0];
    this.groups[groupIndex].children[index].position.y = sceneProperties[index].position[1];
    this.groups[groupIndex].children[index].position.z = sceneProperties[index].position[2];
    this.groups[groupIndex].children[index].rotation.x = sceneProperties[index].rotation[0];
    this.groups[groupIndex].children[index].rotation.y = sceneProperties[index].rotation[1];
    this.groups[groupIndex].children[index].rotation.z = sceneProperties[index].rotation[2];
  }

  useSceneTransition(timing: number, lerpType: LerpFunctions, delta: number) {
    if (isTransitionRunning.current) {
      if (this.transitionTimer < 1) {
        this.finalSceneProperties = lerpSceneProperties(this.initialSceneProperties, this.targetSceneProperties, this.transitionTimer, lerpType);
        this.transitionTimer += delta / timing;
        return true;
      } else {
        isTransitionRunning.current = false;
        this.transitionTimer = 0;
        previousScene.current = currentScene.current;
        return false;
      }
    }
    return false;
  }

  animate(FFT: number[], delta: number) {
    this.background = getCurrentTheme().backgroundColor;
    this.rotation.z -= delta;

    const running = this.useSceneTransition(this.transitionSpeed, this.lerpType, delta);

    this.groups.forEach((group, gi) => {
      for (let i = 0; i < FFT_QUANTITY; ++i) {
        const amp = FFT[i] / 1.7;

        if (running || scenePropsRequireUpdate.current) {
          this.updateSceneAtIndex({ groupIndex: gi, index: i, sceneProperties: this.finalSceneProperties });
        }

        if (this.dynamicValues) {
          group.children[i].scale.x = this.dynamicValues(amp).scale[0];
          group.children[i].scale.y = this.dynamicValues(amp).scale[1];
          group.children[i].scale.z = this.dynamicValues(amp).scale[2];
        }

        group.children[i].material.color.lerpColors(getCurrentTheme().color, getCurrentTheme().transitionColor, FFT[i] / this.maxScalar);

        this.maxScalar = this.maxScalar < FFT[i] ? FFT[i] : this.maxScalar;
      }
    });

    scenePropsRequireUpdate.current = false;
  }
}
