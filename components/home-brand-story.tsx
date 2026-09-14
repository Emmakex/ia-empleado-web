import type { Locale } from "../lib/i18n";
import { BrandVideo } from "./brand-video";

type HomeBrandStoryProps = {
  locale: Locale;
};

export function HomeBrandStory({ locale }: HomeBrandStoryProps) {
  const isSpanish = locale === "es";

  return (
    <section
      className="content-section section-panel brand-video-section"
      aria-labelledby="brand-story-title"
      data-phase8d-video="home-brand-story"
    >
      <div className="container">
        <div className="brand-video-intro">
          <div>
            <p className="eyebrow">{isSpanish ? "IA Empleado en acción" : "IA Empleado in action"}</p>
            <h2 id="brand-story-title">
              {isSpanish
                ? "Personas, IA y sistemas trabajando como un solo equipo"
                : "People, AI and systems working as one team"}
            </h2>
          </div>
          <p className="section-lead">
            {isSpanish
              ? "Una vista breve de cómo los empleados IA se coordinan con tu equipo y tus sistemas, con el control humano visible en los puntos importantes."
              : "A short view of how AI employees coordinate with your team and systems, with human control visible at the important checkpoints."}
          </p>
        </div>

        <BrandVideo
          className="brand-video-home-story"
          label={
            isSpanish
              ? "Vídeo: personas, empleados IA y sistemas coordinándose con control humano"
              : "Video: people, AI employees and systems coordinating with human control"
          }
          poster="/branding/video/home/ia-empleado-brand-story-poster.webp"
          webmSrc="/branding/video/home/ia-empleado-brand-story.webm"
          mp4Src="/branding/video/home/ia-empleado-brand-story.mp4"
          mode="explainer"
          width={1920}
          height={1080}
        />
      </div>
    </section>
  );
}
