import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();

  // กำหนด mapping ไปยังคีย์ในไฟล์แปล
  const projectKeys = [
    "c2", // LINE Helpdesk Platform
    "c1", // Rocky Linux Docker Infrastructure
    "c4", // AI-Powered Smart Parking System
    "c3", // Enterprise Windows Server Infrastructure
    "c5", // Multi-Cloud Deployment Platform
    "c6"  // Network Infrastructure Management
  ];

  const featuredProjects = projectKeys.map((k) => ({
    title: t(`projects.${k}_title`),
    description: t(`projects.${k}_desc`),
    category: t(`projects.${k}_badge`),
    // arrays: ใช้ returnObjects:true
    features: t(`projects.${k}_bullets`, { returnObjects: true }) as string[],
    tags: t(`projects.${k}_chips`, { returnObjects: true }) as string[]
  }));

  return (
    <section id="projects" className="section-padding bg-gradient-soft">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("projects.title")} <span className="text-gradient">{/* accent */}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="card-effect bg-card border-border h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-primary border-primary mb-3">
                    {project.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    {t("projects.key_features", "Key Features:")}
                  </h4>
                  <ul className="space-y-2">
                    {project.features?.map((feature, fi) => (
                      <li key={fi} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    {t("projects.technologies_used", "Technologies Used:")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag, ti) => (
                      <Badge
                        key={ti}
                        variant="secondary"
                        className="bg-muted text-foreground border-border text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
