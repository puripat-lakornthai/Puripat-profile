import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

// id ของแต่ละ section ↔ key ในไฟล์แปล
const SECTIONS: { id: string; tKey: string }[] = [
  { id: "home",         tKey: "nav.home" },
  { id: "about",        tKey: "nav.about" },
  { id: "skills",       tKey: "nav.skills" },
  { id: "projects",     tKey: "nav.projects" },
  { id: "certificates", tKey: "nav.certs" },
  { id: "contact",      tKey: "nav.contact" }
];

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setLang = (lng: "en" | "th") => {
    i18n.changeLanguage(lng); // i18n.ts จะ sync <html lang> + localStorage ให้แล้ว
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* แบรนด์ — กันชื่อเพี้ยนเวลาแปล */}
          <button
            onClick={() => scrollTo("home")}
            className="text-left text-xl font-bold text-gradient notranslate"
            translate="no"
            aria-label={t("nav.home")}
          >
            {t("nav.brand")}
          </button>

          {/* เมนูเดสก์ท็อป */}
          <div className="hidden md:flex items-center space-x-2">
            {SECTIONS.map(({ id, tKey }) => (
              <Button
                key={id}
                variant="ghost"
                onClick={() => scrollTo(id)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {t(tKey)}
              </Button>
            ))}
          </div>

          {/* ปุ่มภาษา + CTA */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={i18n.language === "en" ? "default" : "outline"}
                onClick={() => setLang("en")}
                aria-label="Switch to English"
              >
                EN
              </Button>
              <Button
                size="sm"
                variant={i18n.language === "th" ? "default" : "outline"}
                onClick={() => setLang("th")}
                aria-label="สลับเป็นภาษาไทย"
              >
                ไทย
              </Button>
            </div>

            <Button
              onClick={() => scrollTo("contact")}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all duration-300 glow-effect"
            >
              {t("nav.cta")}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
