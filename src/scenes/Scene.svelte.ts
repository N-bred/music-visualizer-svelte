import * as T from "three";
import { FFT_QUANTITY } from "@/store/DefaultValues.svelte";
import { currentTheme } from "@/store/PropertiesPanel.svelte";
import type { MeshGroup, SceneDynamicValues, SceneProperties } from "@/types";

export default class Scene extends T.Scene {
  current = new T.Scene();
  boxGeometry = new T.BoxGeometry(1, 1, 1);
  boxMaterial = new T.MeshBasicMaterial();
  groups: MeshGroup[] = [new T.Group() as MeshGroup];
  dynamicValues: SceneDynamicValues | null = null;

  constructor() {
    super();
    this.setup();
  }

  setup() {
    this.groups.forEach((group) => {
      for (let i = 0; i < FFT_QUANTITY; ++i) {
        group.add(new T.Mesh(this.boxGeometry, this.boxMaterial.clone()));
      }
    });
  }

  updateScene(sceneProperties: SceneProperties, dynamicValues: SceneDynamicValues) {
    this.dynamicValues = dynamicValues;
    this.groups.forEach((group) => {
      for (let i = 0; i < FFT_QUANTITY; ++i) {
        group.children[i].position.x = sceneProperties[i].position[0];
        group.children[i].position.y = sceneProperties[i].position[1];
        group.children[i].position.z = sceneProperties[i].position[2];
        group.children[i].rotation.x = sceneProperties[i].rotation[0];
        group.children[i].rotation.y = sceneProperties[i].rotation[1];
        group.children[i].rotation.z = sceneProperties[i].rotation[2];
      }
    });
  }

  animate(FFT: number[], delta: number) {
    this.background = currentTheme.current.backgroundColor;
    this.rotation.z = -delta * 1;
    this.groups.forEach((group) => {
      for (let i = 0; i < FFT_QUANTITY; ++i) {
        if (this.dynamicValues) {
          group.children[i].scale.x = this.dynamicValues(FFT[i]).scale[0];
          group.children[i].scale.y = this.dynamicValues(FFT[i]).scale[1];
          group.children[i].scale.z = this.dynamicValues(FFT[i]).scale[2];
        }

        group.children[i].material.color.lerpColors(currentTheme.current.color, currentTheme.current.transitionColor, Math.max(FFT[i] || 1));
      }
    });
  }
}
