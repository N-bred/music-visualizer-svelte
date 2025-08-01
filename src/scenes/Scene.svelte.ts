import * as T from "three";
import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
import { currentTheme, isTransitionRunning, currentScene, previousScene } from "@/store/PropertiesPanel.svelte";
import type { MeshGroup, SceneDynamicValues, SceneProperties } from "@/types";
import sceneMap from "@/scenes/";
import { lerpSceneProperties } from "@/utils/";
import type { LerpFunctions } from "@/utils/lerp";

export default class Scene extends T.Scene {
  boxGeometry = new T.BoxGeometry(1, 1, 1);
  boxMaterial = new T.MeshBasicMaterial();
  groups: MeshGroup[] = [new T.Group() as MeshGroup];
  transitionTimer: number = 0;
  maxScalar: number = 256;

  initialSceneProperties = $derived(sceneMap[previousScene.current].precalculateValues());

  targetSceneProperties = $derived(sceneMap[currentScene.current].precalculateValues());

  finalSceneProperties = $derived(sceneMap[previousScene.current].precalculateValues());

  dynamicValues: SceneDynamicValues = $derived(sceneMap[previousScene.current].dynamicValues);

  constructor() {
    super();
    this.setup();
  }

  setup() {
    this.groups.forEach((group) => {
      for (let i = 0; i < FFT_QUANTITY; ++i) {
        group.add(new T.Mesh(this.boxGeometry, this.boxMaterial.clone()));
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
    this.background = currentTheme.current.backgroundColor;
    this.rotation.z -= delta;

    const running = this.useSceneTransition(0.3, "easeOutSine", delta);

    this.groups.forEach((group, gi) => {
      for (let i = 0; i < FFT_QUANTITY; ++i) {
        if (running) {
          this.updateSceneAtIndex({ groupIndex: gi, index: i, sceneProperties: this.finalSceneProperties });
        }

        if (this.dynamicValues) {
          group.children[i].scale.x = this.dynamicValues(FFT[i]).scale[0];
          group.children[i].scale.y = this.dynamicValues(FFT[i]).scale[1];
          group.children[i].scale.z = this.dynamicValues(FFT[i]).scale[2];
        }

        group.children[i].material.color.lerpColors(
          currentTheme.current.color,
          currentTheme.current.transitionColor,
          Math.max(FFT[i] / this.maxScalar || 1)
        );
      }
    });

    this.maxScalar = FFT[0];
  }
}
