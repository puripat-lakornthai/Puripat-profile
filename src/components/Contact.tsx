import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Loader2,
  User,
  UserCircle,
  Building2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

// อ่านคีย์จาก .env (ต้องขึ้นต้นด้วย VITE_)
const W3F_ACCESS_KEY = import.meta.env.VITE_W3F_ACCESS_KEY as string | undefined;

const MAX_MESSAGE = 1000;

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

  const remaining = useMemo(
    () => Math.max(0, MAX_MESSAGE - formData.message.length),
    [formData.message]
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ===== ส่งจริงผ่าน Web3Forms (จัด format อีเมลให้อ่านง่าย + replyto) =====
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
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      toast({
        title: "กรอกไม่ครบ",
        description: "ใส่ชื่อ อีเมล และข้อความให้ครบก่อนนะ",
        variant: "destructive",
      });
      return;
    }

    // ตรวจ email แบบเบา ๆ
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailOk) {
      toast({ title: "รูปแบบอีเมลไม่ถูกต้อง", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("access_key", W3F_ACCESS_KEY);

      // หัวข้ออ่านง่าย + แสกนเร็ว
      payload.append(
        "subject",
        `📨 New Contact – ${formData.firstName} ${formData.lastName}`
      );

      // ให้กด Reply ตอบกลับไปหาผู้ส่งได้ตรง ๆ
      payload.append("replyto", formData.email);

      // ชื่อผู้ส่ง
      payload.append("from_name", `${formData.firstName} ${formData.lastName}`);

      // เนื้อหาอีเมลแบบสวย อ่านง่าย
      const prettyMessage = [
        "━━━ Contact Submission ━━━",
        `Name     : ${formData.firstName} ${formData.lastName}`,
        `Email    : ${formData.email}`,
        `Company  : ${formData.company || "-"}`,
        "──────────────────────────",
        "Message:",
        formData.message.trim(),
        "──────────────────────────",
        `Submitted at: ${new Date().toLocaleString()}`,
      ].join("\n");

      payload.append("message", prettyMessage);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await res.json();

      if (data.success) {
        toast({
          title: "ส่งแล้ว ✅",
          description: "ข้อความถูกส่งเข้าอีเมลเรียบร้อย",
        });
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
        variant: "destructive",
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
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=puripat.lakornthai@gmail.com&su=Contact%20from%20Portfolio&body=Hi%20Puripat%2C%0A%0A",
    },
    {
      icon: Phone,
      label: t("contact.phone_label"),
      value: "+66 92 551 9692",
      href: "tel:+66925519692",
    },
    {
      icon: MapPin,
      label: t("contact.location_label"),
      value: t("contact.location_val"),
      href: null,
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
            {t("contact.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Side - Contact Info */}
          <Card className="card-effect bg-card/60 backdrop-blur border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-primary">
                {t("contact.left_title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{t("contact.left_p")}</p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={
                            info.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            info.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
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

              {/* Social */}
              <div className="pt-2">
                <h4 className="font-semibold text-foreground mb-3">
                  {t("contact.social_title")}
                </h4>
                <div className="flex gap-3">
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
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
                    className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
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

          {/* Right Side - Contact Form */}
          <Card className="card-effect bg-card/60 backdrop-blur border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{t("contact.form_title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-live="polite"
              >
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

                {/* Name Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="pl-1">
                      {t("contact.form_first")}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        name="firstName"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="bg-input border-border pl-9 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/60"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="pl-1">
                      {t("contact.form_last")}
                    </Label>
                    <div className="relative">
                      <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        name="lastName"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="bg-input border-border pl-9 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/60"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="pl-1">
                    {t("contact.form_email")}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@example.com"
                      className="bg-input border-border pl-9 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/60"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground pl-1">
                    เราจะใช้เป็นอีเมลตอบกลับเมื่อคุณกด Reply ในกล่องเมล
                  </p>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="pl-1">
                    {t("contact.form_company")}
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={t("contact.form_company_placeholder")}
                      className="bg-input border-border pl-9 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/60"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <div className="flex items-end justify-between">
                    <Label htmlFor="message" className="pl-1">
                      {t("contact.form_message")}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {remaining} / {MAX_MESSAGE}
                    </span>
                  </div>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={MAX_MESSAGE}
                    placeholder={t("contact.form_placeholder_message")}
                    className="min-h-[140px] bg-input border-border rounded-xl focus-visible:ring-2 focus-visible:ring-primary/60"
                    required
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-primary text-primary-foreground hover:opacity-95 transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="animate-spin size-4" />{" "}
                      {t("contact.sending")}
                    </span>
                  ) : (
                    t("contact.form_submit")
                  )}
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
