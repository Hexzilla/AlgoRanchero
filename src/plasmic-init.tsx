import { initPlasmicLoader } from "@plasmicapp/loader-react";
export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "gemQPJSCVibKN2tjcS3BQj",  // ID of a project you are using
      token: "ui682UKPorPcHvAYcvJ2J0HmdOb5FwXX7gFSenbccSlh5wEEvhaq6EMqCkrllVmTXv4KqQWB0YGzRTiA"  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})
