import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

// อ่านคีย์จาก .env (ต้องขึ้นต้นด้วย VITE_)
const W3F_ACCESS_KEY = import.meta.env.VITE_W3F_ACCESS_KEY as string | undefined;

const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
    botField: "", // honeypot กันบอท
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ===== ส่งจริงผ่าน Web3Forms (ไม่เด้ง Gmail) =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (formData.botField) return; // กันบอท

    if (!W3F_ACCESS_KEY) {
      toast({
        title: "ยังไม่ได้ตั้งค่า access_key",
        description: "เพิ่ม VITE_W3F_ACCESS_KEY ในไฟล์ .env แล้วรีสตาร์ท dev server",
        variant: "destructive",
      });
      return;
    }

    // ตรวจง่าย ๆ
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "กรอกไม่ครบ",
        description: "ใส่ชื่อ อีเมล และข้อความให้ครบก่อนนะ",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();

      // ใช้คีย์จาก .env
      payload.append("access_key", W3F_ACCESS_KEY);

      // ผู้รับ (จะส่งเข้ากล่องเมลคุณ — ใส่หลายคนคั่น , ได้)
      payload.append("to", "puripat.lakornthai@gmail.com");

      // หัวข้อ + เนื้อหา (จะโชว์ในเมล)
      payload.append("subject", `Contact from Portfolio – ${formData.firstName} ${formData.lastName}`);
      payload.append(
        "message",
        `${formData.message}\n\n—\nFrom: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nCompany: ${formData.company || "-"}`
      );

      // ฟิลด์เสริมให้ format ในอีเมลดูดีขึ้น
      payload.append("from_name", `${formData.firstName} ${formData.lastName}`);
      payload.append("from_email", formData.email);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await res.json();

      if (data.success) {
        toast({ title: "ส่งแล้ว ✅", description: "ข้อความถูกส่งเข้ากล่องเมลของคุณ" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          message: "",
          botField: "",
        });
      } else {
        throw new Error(data.message || "Failed to send");
      }
    } catch (err: any) {
      toast({
        title: "ส่งไม่สำเร็จ",
        description: err?.message || "ลองใหม่อีกครั้ง",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.email_label"),
      value: "puripat.lakornthai@gmail.com",
      href:
        "https://mail.google.com/mail/?view=cm&fs=1&to=puripat.lakornthai@gmail.com&su=Contact%20from%20Portfolio&body=Hi%20Puripat%2C%0A%0A",
    },
    { icon: Phone, label: t("contact.phone_label"), value: "+66 92 551 9692", href: "tel:+66925519692" },
    { icon: MapPin, label: t("contact.location_label"), value: t("contact.location_val"), href: null },
  ];

  // const emergencyContact = { ... } // (คอมเมนต์ไว้ตามเดิม)

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <Card className="card-effect bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  {t("contact.left_title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  {t("contact.left_p")}
                </p>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{info.label}</div>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith("http") ? "_blank" : undefined}
                            rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-muted-foreground">{info.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-4">
                  <h4 className="font-semibold text-foreground mb-3">
                    {t("contact.social_title")}
                  </h4>
                  <div className="flex gap-3">
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <a
                        href="https://github.com/puripat-lakornthai"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <a
                        href="https://www.linkedin.com/in/puripat-lakornthai-7975b5327/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact (คงคอมเมนต์ไว้ตามเดิม) */}
          </div>

          {/* Right Side - Contact Form */}
          <Card className="card-effect bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl">{t("contact.form_title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot (hidden) */}
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("contact.form_first")}</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("contact.form_last")}</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.form_email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-input border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">{t("contact.form_company")}</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={t("contact.form_company_placeholder")}
                    className="bg-input border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.form_message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("contact.form_placeholder_message")}
                    className="min-h-[120px] bg-input border-border"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all duration-300 glow-effect"
                >
                  {isSubmitting ? t("contact.sending") : t("contact.form_submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
