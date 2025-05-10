
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Building, Package, CreditCard, Mail, CheckCircle2, 
  ArrowRight, Settings, Users, Globe, Database, Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SuperWebsite = () => {
  const features = [
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Multi-Organization Management",
      description: "Create and manage multiple organizations with separate data and user roles."
    },
    {
      icon: <Package className="h-10 w-10 text-primary" />,
      title: "Flexible Subscription Plans",
      description: "Configure custom subscription plans with different features and pricing tiers."
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Multiple Payment Gateways",
      description: "Support for various payment gateways including Razorpay, with more coming soon."
    },
    {
      icon: <Mail className="h-10 w-10 text-primary" />,
      title: "SMTP & WhatsApp Integration",
      description: "Set up custom email notifications and WhatsApp business messaging."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Advanced User Management",
      description: "Role-based access controls and customizable permissions system."
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Centralized Administration",
      description: "Single dashboard to manage all aspects of your SaaS platform."
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "₹999",
      description: "Essential features for small businesses",
      features: [
        "10 Users",
        "Basic Inventory Management",
        "Simple POS System",
        "Standard Support",
        "5GB Storage"
      ],
      isPopular: false
    },
    {
      name: "Standard",
      price: "₹1,999",
      description: "Perfect for growing businesses",
      features: [
        "25 Users",
        "Advanced Inventory Management",
        "Complete POS System",
        "Priority Support",
        "15GB Storage",
        "CRM Integration",
        "Basic Reports"
      ],
      isPopular: true
    },
    {
      name: "Premium",
      price: "₹3,999",
      description: "Advanced features for larger operations",
      features: [
        "Unlimited Users",
        "Complete Inventory Management",
        "Advanced POS System",
        "24/7 Priority Support",
        "50GB Storage",
        "Full CRM Integration",
        "Advanced Reports",
        "WhatsApp Integration",
        "Multi-branch Support"
      ],
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BizApp</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary">Pricing</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary">Testimonials</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/superadmin">Super Admin</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center gap-4 md:gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Complete Business Management Solution
            </h1>
            <p className="text-xl text-muted-foreground md:w-3/4 mx-auto">
              An all-in-one SaaS platform that helps businesses manage their inventory, 
              sales, accounting, and customer relationships.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" asChild>
              <Link to="/login">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section id="features" className="container py-12 md:py-24 lg:py-32 border-t">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Powerful Admin Features
            </h2>
            <p className="text-muted-foreground md:w-3/4 mx-auto">
              Complete control over your multi-tenant SaaS application with our
              comprehensive super admin dashboard.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="border border-muted">
              <CardHeader>
                <div className="p-2 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container py-12 md:py-24 lg:py-32 border-t">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground md:w-3/4 mx-auto">
              Choose the plan that best fits your business needs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`overflow-hidden flex flex-col ${plan.isPopular ? 'border-primary' : 'border-muted'}`}>
              {plan.isPopular && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                  {plan.isPopular ? "Start Free Trial" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container py-12 md:py-24 lg:py-32 border-t">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Trusted by Businesses Everywhere
            </h2>
            <p className="text-muted-foreground md:w-3/4 mx-auto">
              See what our customers have to say about their experience.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[
            {
              quote: "This SaaS solution has completely transformed how we manage our inventory and sales. The super admin features are exactly what we needed for our multi-branch operation.",
              author: "Priya Sharma",
              position: "CEO, Retail Enterprises"
            },
            {
              quote: "The flexibility of the subscription plans allowed us to start small and scale as our business grew. The WhatsApp integration has been a game-changer for our customer service.",
              author: "Rahul Mehta",
              position: "Operations Manager, TechSolutions"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <p className="italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container py-12 md:py-24 lg:py-32 border-t">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground md:w-3/4 mx-auto">
              Find answers to common questions about our platform.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {[
            {
              question: "How does the multi-organization feature work?",
              answer: "Each organization gets its own isolated data environment with separate users, roles, and permissions. The super admin can manage all organizations from a central dashboard."
            },
            {
              question: "Can I customize the subscription plans?",
              answer: "Yes, as a super admin you can create custom subscription plans with different features, user limits, and pricing tiers."
            },
            {
              question: "Do you support international payment methods?",
              answer: "We currently support Razorpay with plans to add more international payment gateways soon."
            },
            {
              question: "How secure is my business data?",
              answer: "We implement industry-standard security measures including data encryption, regular backups, and strict access controls."
            }
          ].map((faq, index) => (
            <Card key={index} className="border border-muted">
              <CardHeader>
                <CardTitle className="text-xl">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12 md:py-24 lg:py-32 border-t">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Ready to supercharge your business?
            </h2>
            <p className="text-xl text-muted-foreground md:w-3/4 mx-auto">
              Get started with a 14-day free trial. No credit card required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" asChild>
              <Link to="/login">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4 md:w-1/3">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">BizApp</span>
              </div>
              <p className="text-muted-foreground">
                A complete business management solution for modern enterprises.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h3 className="font-medium">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-muted-foreground hover:text-foreground">Features</a></li>
                  <li><a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Integrations</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Updates</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Tutorials</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Support</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Legal</a></li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BizApp. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuperWebsite;
