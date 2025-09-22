import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

type Cert = {
  id: string;
  title: string;
  issuer: string;
  issuedOn: string;
  hours?: string;
  certNumber?: string;
  image: string;
};

const CERTS: Cert[] = [
  {
    id: "ec-agile",
    title: "Agile Product Management: A Concise Introduction",
    issuer: "EC-Council Continuing Education",
    issuedOn: "7 Sep 2025",
    hours: "1 Hour",
    certNumber: "433989",
    image: "/certificates/Agile Product Management A Concise Introduction.png"
  },
  {
    id: "ec-sql",
    title: "SQL Injection Attacks",
    issuer: "EC-Council Continuing Education",
    issuedOn: "4 Sep 2025",
    hours: "1 Hour",
    certNumber: "433355",
    image: "/certificates/SQL Injection Attacks.png"
  },
  {
    id: "ec-jira",
    title: "Jira Agile Project Management + Jira Administration + Jira Agile",
    issuer: "EC-Council Continuing Education",
    issuedOn: "5 Sep 2025",
    hours: "1 Hour",
    certNumber: "433483",
    image: "/certificates/Jira Agile Project Management + Jira Administration + Jira Agile.png"
  },
  {
    id: "aws-academy-cloud",
    title: "AWS Academy Graduate – Cloud Foundations",
    issuer: "AWS Academy",
    issuedOn: "15 Jan 2025",
    hours: "20 Hours",
    image: "/certificates/AWS Academy Cloud.png"
  }
];

export default function Certificates() {
  const { t } = useTranslation();

  return (
    <section id="certificates" className="section-padding scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            {t("certs.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("certs.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTS.map((c) => (
            <Card key={c.id} className="card-effect bg-card border-border overflow-hidden">
              {/* Thumbnail */}
              <a href={c.image} target="_blank" rel="noopener noreferrer" className="block">
                <div className="aspect-[16/11] w-full bg-muted flex items-center justify-center">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </a>

              <CardHeader>
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="secondary">{c.issuer}</Badge>
                  {c.hours && <Badge variant="outline">{c.hours}</Badge>}
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <b>{t("certs.issued_on")}:</b> {c.issuedOn}
                </p>
                {c.certNumber && (
                  <p className="text-sm text-muted-foreground">
                    <b>{t("certs.cert_no")}:</b> {c.certNumber}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
