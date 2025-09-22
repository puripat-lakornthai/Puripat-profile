import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // ใช้ข้อความจากไฟล์แปล (มี fallback ถ้ายังไม่ได้ใส่คีย์)
  const brand = t("nav.brand", "Puripat Lakornthai");
  const subtitle = t("footer.subtitle", "Full Stack Developer & IT Student");
  const rights = t("footer.rights", "All rights reserved.");
  const emailSubject = t("contact.form_subject", "Contact from Portfolio");
  const emailBody = t("contact.form_body_hint", "Hi Puripat,\n\n");

  const gmailUrl =
    "https://mail.google.com/mail/?" +
    `view=cm&fs=1&to=puripat.lakornthai@gmail.com` +
    `&su=${encodeURIComponent(emailSubject)}` +
    `&body=${encodeURIComponent(emailBody)}`;

  return (
    <footer className="bg-muted border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gradient mb-2">
              {brand}
            </h3>
            <p className="text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <a
                href="https://github.com/puripat-lakornthai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </Button>

            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <a
                href="https://www.linkedin.com/in/puripat-lakornthai-7975b5327/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>

            <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {currentYear} {brand}. {rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
