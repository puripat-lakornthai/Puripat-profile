import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Globe,
  Database,
  Server,
  Cloud,
  Brain,
  Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next"; // ⬅️ เพิ่ม

const Skills = () => {
  const { t } = useTranslation(); // ⬅️ เพิ่ม

  // ใช้ key ตามไฟล์ en.json / th.json ของคุณ
  const skillCategories = [
    {
      icon: Code,
      title: t("skills.col1_title_lang"),
      skills: t("skills.col1_lang", { returnObjects: true }) as string[],
    },
    {
      icon: Globe,
      title: t("skills.col1_title_web"),
      skills: t("skills.col1_web", { returnObjects: true }) as string[],
    },
    {
      icon: Database,
      title: t("skills.col1_title_db"),
      skills: t("skills.col1_db", { returnObjects: true }) as string[],
    },
    {
      icon: Server,
      title: t("skills.col2_title_server"),
      skills: t("skills.col2_server", { returnObjects: true }) as string[],
    },
    {
      icon: Cloud,
      title: t("skills.col2_title_cloud"),
      skills: t("skills.col2_cloud", { returnObjects: true }) as string[],
    },
    {
      icon: Brain,
      title: t("skills.col2_title_ai"),
      skills: t("skills.col2_ai", { returnObjects: true }) as string[],
    },
    {
      icon: Settings,
      title: t("skills.col3_title_infra"),
      skills: t("skills.col3_infra", { returnObjects: true }) as string[],
    },
  ];

  // เดิมคุณใส่ tools เป็น array ตรง ๆ — ย้ายมาอ่านจากไฟล์แปล
  const tools = t("skills.col3_tools", { returnObjects: true }) as string[];

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {/* เดิม: Technical Skills */}
            {t("skills.title").split(" ").length > 1 ? (
              <>
                {t("skills.title").split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-gradient">
                  {t("skills.title").split(" ").slice(-1)}
                </span>
              </>
            ) : (
              <span className="text-gradient">{t("skills.title")}</span>
            )}
          </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <Card key={index} className="card-effect bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <category.icon className="w-6 h-6 text-primary" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="bg-muted text-foreground border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Development Tools */}
        <Card className="card-effect bg-gradient-soft border-border">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              {t("skills.col3_title_tools")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm py-2 px-4"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;
