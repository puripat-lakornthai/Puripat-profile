import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Calendar, label: t("about.stats.years_old"), value: "21" },
    { icon: Award, label: t("about.stats.gpa"), value: "3.00" },
    { icon: GraduationCap, label: t("about.stats.training_programs"), value: "10+" },
    { icon: MapPin, label: t("about.stats.university"), value: t("about.mini_university_val") },
  ];

  // เพิ่มตัวแปรรูป (ไฟล์จริงใส่ใน public/)
  const PROFILE_IMG = "/profile.png";

  return (
    <section id="about" className="section-padding bg-gradient-soft">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("about.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <img
                src={PROFILE_IMG}
                alt="Profile"
                loading="lazy"
                className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-primary/20"
              />
            </div>

            <h3 className="text-2xl font-semibold text-primary">
              {t("about.headline")}
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>

            {/* Education & Location */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">
                  {t("about.mini_university_val")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">
                  {t("contact.location_val")}
                </span>
              </div>
            </div>
          </div>

          {/* Right stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <Card key={i} className="card-effect bg-card border-border">
                <CardContent className="p-6 text-center">
                  <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {s.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {s.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
