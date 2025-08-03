<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    const panelSongs: HTMLDivElement = document.querySelector(".panel-songs")!;
    const panelData: HTMLDivElement = document.querySelector(".panel-data")!;
    const panelSongsButton: HTMLButtonElement = document.querySelector("#hamburger-button-panel-songs")!;
    const panelDataButton: HTMLButtonElement = document.querySelector("#hamburger-button-panel-data")!;

    const menuState = {
      currentElement: panelSongs,
    };

    const handleMobileHamburgerButtonClick = (button: HTMLButtonElement, panel: HTMLDivElement) => {
      button.addEventListener("click", (e: Event) => {
        e.preventDefault();

        if (menuState.currentElement.dataset.active === "true") {
          if (panel === menuState.currentElement) {
            menuState.currentElement.classList.remove("active");
            panel.dataset.active = "false";
            return;
          } else {
            menuState.currentElement.classList.remove("active");
            menuState.currentElement.dataset.active = "false";
          }
        }

        panel.dataset.active = "true";
        panel.classList.add("active");
        menuState.currentElement = panel;
      });
    };

    handleMobileHamburgerButtonClick(panelSongsButton, panelSongs);
    handleMobileHamburgerButtonClick(panelDataButton, panelData);
  });
</script>
