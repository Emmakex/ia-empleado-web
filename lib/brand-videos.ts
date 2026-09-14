import type { Locale } from "./i18n";

export type BrandVideoKey = "brand-story" | "team-work" | "product-walkthrough";

type LocalizedVideoCopy = {
  eyebrow: string;
  title: string;
  description: string;
  visualDescriptionLabel: string;
  visualDescription: string[];
  fallback: string;
  fallbackLink: string;
};

export type BrandVideoDefinition = {
  key: BrandVideoKey;
  mp4: string;
  webm: string;
  poster: string;
  width: 1280;
  height: 720;
  durationSeconds: number;
  copy: Record<Locale, LocalizedVideoCopy>;
};

const VIDEO_ROOT = "/branding/video";

export const brandVideos: Record<BrandVideoKey, BrandVideoDefinition> = {
  "brand-story": {
    key: "brand-story",
    mp4: `${VIDEO_ROOT}/brand-story.mp4`,
    webm: `${VIDEO_ROOT}/brand-story.webm`,
    poster: `${VIDEO_ROOT}/brand-story-poster.webp`,
    width: 1280,
    height: 720,
    durationSeconds: 8,
    copy: {
      es: {
        eyebrow: "EXPLICADOR VISUAL",
        title: "Personas, IA y sistemas coordinados en un mismo flujo",
        description: "Una secuencia silenciosa muestra cómo una tarea pasa por especialistas IA, sistemas y control humano hasta llegar a un resultado trazable.",
        visualDescriptionLabel: "Descripción visual",
        visualDescription: [
          "Una tarea entra en el núcleo de coordinación de IA Empleado.",
          "Clara, Alex, Sofía y Javier aparecen como especialistas conectados al mismo contexto.",
          "Los sistemas aportan información y el trabajo pasa entre especialistas mediante handoffs visibles.",
          "Una persona conserva el punto de aprobación antes de que el resultado se marque como completado.",
        ],
        fallback: "Tu navegador no puede reproducir este vídeo. La misma explicación está disponible en la descripción visual de esta sección.",
        fallbackLink: "Abrir versión MP4",
      },
      en: {
        eyebrow: "VISUAL EXPLAINER",
        title: "People, AI and systems coordinated in one workflow",
        description: "A silent sequence shows a task moving through AI specialists, systems and human control until it becomes a traceable outcome.",
        visualDescriptionLabel: "Visual description",
        visualDescription: [
          "A task enters the IA Empleado coordination core.",
          "Clara, Alex, Sofía and Javier appear as specialists connected to the same context.",
          "Systems provide information and work moves between specialists through visible handoffs.",
          "A person keeps the approval point before the outcome is shown as completed.",
        ],
        fallback: "Your browser cannot play this video. The same explanation is available in the visual description in this section.",
        fallbackLink: "Open MP4 version",
      },
    },
  },
  "team-work": {
    key: "team-work",
    mp4: `${VIDEO_ROOT}/team-work.mp4`,
    webm: `${VIDEO_ROOT}/team-work.webm`,
    poster: `${VIDEO_ROOT}/team-work-poster.webp`,
    width: 1280,
    height: 720,
    durationSeconds: 10,
    copy: {
      es: {
        eyebrow: "HANDOFF Y CONTROL",
        title: "Un trabajo coordinado mantiene visible quién hace qué",
        description: "La demo visual separa empleado IA, sistema, aprobación humana y resultado para explicar coordinación sin fingir un runtime en directo.",
        visualDescriptionLabel: "Descripción visual",
        visualDescription: [
          "Una tarea llega a Clara y se prepara el siguiente paso.",
          "El flujo consulta un sistema antes de transferir el contexto.",
          "La decisión relevante se detiene en un punto de aprobación humana.",
          "Sofía recibe el handoff y el resultado queda diferenciado del sistema y de la persona que aprobó.",
        ],
        fallback: "Tu navegador no puede reproducir este vídeo. La secuencia completa está descrita en el contenido de esta sección.",
        fallbackLink: "Abrir versión MP4",
      },
      en: {
        eyebrow: "HANDOFF AND CONTROL",
        title: "Coordinated work keeps responsibility visible",
        description: "The visual demo separates AI Employee, system, human approval and outcome to explain coordination without pretending a live runtime is connected.",
        visualDescriptionLabel: "Visual description",
        visualDescription: [
          "A task reaches Clara and prepares the next step.",
          "The workflow consults a system before transferring context.",
          "The consequential decision pauses at a human approval point.",
          "Sofía receives the handoff and the outcome stays distinct from both the system and the person who approved it.",
        ],
        fallback: "Your browser cannot play this video. The complete sequence is described in this section.",
        fallbackLink: "Open MP4 version",
      },
    },
  },
  "product-walkthrough": {
    key: "product-walkthrough",
    mp4: `${VIDEO_ROOT}/product-walkthrough.mp4`,
    webm: `${VIDEO_ROOT}/product-walkthrough.webm`,
    poster: `${VIDEO_ROOT}/product-walkthrough-poster.webp`,
    width: 1280,
    height: 720,
    durationSeconds: 10,
    copy: {
      es: {
        eyebrow: "RECORRIDO DE PRODUCTO",
        title: "Del problema operativo a una composición explicable",
        description: "El walkthrough resume cómo Team Builder y Process Analyzer convierten opciones predefinidas en una propuesta de equipo y un flujo con responsabilidades visibles.",
        visualDescriptionLabel: "Descripción visual",
        visualDescription: [
          "Se parte de un problema operativo representado como una secuencia de pasos.",
          "Team Builder agrupa especialistas y sistemas alrededor del trabajo que debe resolverse.",
          "Process Analyzer separa pasos automatizables, asistidos y de responsabilidad humana.",
          "La secuencia termina mostrando una propuesta explicable, no una promesa de autonomía ni de resultado garantizado.",
        ],
        fallback: "Tu navegador no puede reproducir este vídeo. El recorrido se resume también en la descripción visual de esta sección.",
        fallbackLink: "Abrir versión MP4",
      },
      en: {
        eyebrow: "PRODUCT WALKTHROUGH",
        title: "From an operational problem to an explainable composition",
        description: "The walkthrough summarizes how Team Builder and Process Analyzer turn predefined choices into a team proposal and a workflow with visible responsibilities.",
        visualDescriptionLabel: "Visual description",
        visualDescription: [
          "The sequence starts with an operational problem represented as a set of steps.",
          "Team Builder groups specialists and systems around the work that needs to be handled.",
          "Process Analyzer separates automatable, assisted and human-responsibility steps.",
          "The sequence ends with an explainable proposal, not a promise of autonomy or guaranteed results.",
        ],
        fallback: "Your browser cannot play this video. The walkthrough is also summarized in the visual description in this section.",
        fallbackLink: "Open MP4 version",
      },
    },
  },
};

export function getBrandVideo(key: BrandVideoKey, locale: Locale) {
  const video = brandVideos[key];
  return { ...video, copy: video.copy[locale] };
}
