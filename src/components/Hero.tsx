import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Phone } from "lucide-react";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-hero">
      <div className="container mx-auto px-6 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-gradient notranslate" translate="no">{t("hero.title_first")}</span>{" "}
              <span className="text-foreground notranslate" translate="no">{t("hero.title_last")}</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              {t("hero.role")}
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("hero.bio")}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-muted-foreground notranslate" translate="no">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>{t("hero.email")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>{t("hero.phone")}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
            <Button onClick={() => scrollToSection("projects")} size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all duration-300 glow-effect">
              {t("hero.view_work")}
            </Button>
            <Button onClick={() => scrollToSection("contact")} variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              {t("hero.contact")}
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
