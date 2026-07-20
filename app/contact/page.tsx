"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import {
  CheckCircle,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setIsSubmitted(true);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error(error);

      alert("Unable to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@inukabyolie.co.za"],
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+27 (79) 754 1315"],
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "Shop 232 Oriental Plaza Mall",
        "169 Bram Fischer Drive",
        "Ferndale, Randburg 2194",
      ],
      description: "Come visit our showroom",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Monday - Friday: 8am - 6pm",
        "Saturday: 9am - 5pm",
      ],
      description: "Sunday: Closed",
    },
  ];

  const features = [
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help whenever you need it",
    },
    {
      icon: MessageSquare,
      title: "Quick Response",
      description: "We reply within 2 hours",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your information is safe with us",
    },
  ];

  return (
    <div className="bg-background">
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-primary text-primary-foreground">
              Get in Touch
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              We'd love to
              <span className="text-primary block lg:inline lg:ml-4">
                hear from you
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion or need help with our products?
              Fill in the form below and we'll respond as quickly as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            <div className="lg:col-span-2">

              <Card>

                <CardHeader>

                  <CardTitle className="text-2xl font-bold">
                    Send us a message
                  </CardTitle>

                  <p className="text-muted-foreground">
                    Complete the form below and our team will contact you shortly.
                  </p>

                </CardHeader>

                <CardContent>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                                        <div className="grid sm:grid-cols-2 gap-4">

                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="text-sm font-medium text-foreground"
                        >
                          First Name
                        </label>

                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="Nthabiseng"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="text-sm font-medium text-foreground"
                        >
                          Last Name
                        </label>

                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Molife"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-border"
                        />
                      </div>

                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground"
                        >
                          Email Address
                        </label>

                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-foreground"
                        >
                          Phone Number
                        </label>

                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+27 79 754 1315"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-background border-border"
                        />
                      </div>

                    </div>

                    <div className="space-y-2">

                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-foreground"
                      >
                        Subject
                      </label>

                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-background border-border"
                      />

                    </div>

                    <div className="space-y-2">

                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Message
                      </label>

                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="bg-background border-border resize-none"
                      />

                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || isSubmitted}
                      className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : isSubmitted ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Message Sent!
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </div>
                      )}
                    </Button>

                  </form>

                </CardContent>

              </Card>

            </div>

            <div className="space-y-8">

              <Card>

                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Contact Information
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1">

                        <h3 className="font-semibold mb-1">
                          {info.title}
                        </h3>

                        {info.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-muted-foreground"
                          >
                            {detail}
                          </p>
                        ))}

                        <p className="text-xs text-muted-foreground mt-1">
                          {info.description}
                        </p>

                      </div>

                    </div>
                  ))}

                </CardContent>

              </Card>
                            <Card>

                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Why Contact Us?
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">

                  {features.map((feature, index) => (
                    <div key={index}>

                      <div className="flex items-start gap-3">

                        <div className="p-1 bg-accent/10 rounded">
                          <feature.icon className="h-4 w-4 text-accent-foreground" />
                        </div>

                        <div>
                          <h4 className="font-medium text-sm">
                            {feature.title}
                          </h4>

                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>

                      </div>

                      {index < features.length - 1 && (
                        <Separator className="mt-4" />
                      )}

                    </div>
                  ))}

                </CardContent>

              </Card>

            </div>

          </div>

        </div>

      </section>

      <section className="py-16 lg:py-24 bg-muted/30">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">

            <Badge variant="outline" className="mb-6">
              FAQ
            </Badge>

            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to our most common customer questions.
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {[
              {
                question: "What are your shipping policies?",
                answer:
                  "We offer free shipping on qualifying orders. Standard delivery takes approximately 3–5 business days.",
              },
              {
                question: "How do I track my order?",
                answer:
                  "Once your order has shipped, we'll email your tracking number so you can monitor your parcel.",
              },
              {
                question: "Can I return products?",
                answer:
                  "Yes. Returns are accepted within 3 days provided products are unopened and in their original condition.",
              },
              {
                question: "Do you ship internationally?",
                answer:
                  "Yes. We ship worldwide. Shipping costs vary depending on your destination.",
              },
            ].map((faq, index) => (

              <Card
                key={index}
                className="hover:shadow-md transition-shadow"
              >

                <CardContent className="p-6">

                  <h3 className="font-semibold mb-3">
                    {faq.question}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {faq.answer}
                  </p>

                </CardContent>

              </Card>

            ))}

          </div>

        </div>

      </section>

      <section className="py-16 lg:py-24">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">

            <CardContent className="p-12 text-center">

              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Still have questions?
              </h2>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our friendly customer support team is ready to assist you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">

                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us
                </Button>

              </div>

            </CardContent>

          </Card>

        </div>

      </section>
          </div>
  );
}