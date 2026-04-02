import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MessageSquare, Play, ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeroSection from "./HeroSection";

// Personal email domains to block
const PERSONAL_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
  'aol.com', 'icloud.com', 'mail.com', 'protonmail.com',
  'live.com', 'msn.com', 'googlemail.com'
];

const isValidWorkEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain && !PERSONAL_EMAIL_DOMAINS.includes(domain);
};

type ContactPath = 'demo' | 'sales' | 'try';

interface PathCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  cta: string;
  isActive: boolean;
  onClick: () => void;
}

const PathCard = ({ icon: Icon, title, description, cta, isActive, onClick }: PathCardProps) => (
  <button
    onClick={onClick}
    className={cn(
      "group flex flex-col items-start rounded-lg border p-6 text-left transition-all duration-300",
      isActive 
        ? "border-primary/50 bg-primary/5" 
        : "border-border bg-background hover:border-border/80 hover:bg-secondary/20"
    )}
  >
    <div className={cn(
      "flex h-12 w-12 items-center justify-center rounded-lg border transition-colors",
      isActive ? "border-primary/30 bg-primary/10" : "border-border bg-secondary/30"
    )}>
      <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
    </div>
    <h3 className="mt-4 font-mono text-sm font-medium tracking-wide text-foreground">
      {title}
    </h3>
    <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
      {description}
    </p>
    <span className={cn(
      "mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
    )}>
      {cta}
      <ArrowRight className="h-3 w-3" />
    </span>
  </button>
);

// Demo booking form
const DemoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    aum: '',
    goals: ''
  });
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidWorkEmail(formData.email)) {
      setEmailError('Please use your work email address');
      return;
    }
    setEmailError('');

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // In production, you would:
    // 1. Send to your API/CRM
    // 2. Trigger Calendly popup or redirect
    // 3. Send confirmation email
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-6 font-mono text-xl font-light text-foreground">
          Request Received
        </h3>
        <p className="mt-3 max-w-sm font-mono text-sm leading-relaxed text-muted-foreground">
          We'll be in touch within 24 hours to schedule your demo. Check your inbox for a confirmation.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Name <span className="text-primary">*</span>
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            required
            className="h-11 bg-secondary/20 font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Work Email <span className="text-primary">*</span>
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setEmailError('');
            }}
            placeholder="you@company.com"
            required
            className={cn("h-11 bg-secondary/20 font-mono text-sm", emailError && "border-destructive")}
          />
          {emailError && (
            <p className="font-mono text-[10px] text-destructive">{emailError}</p>
          )}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Company <span className="text-primary">*</span>
          </label>
          <Input
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Company name"
            required
            className="h-11 bg-secondary/20 font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Role <span className="text-primary">*</span>
          </label>
          <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger className="h-11 bg-secondary/20 font-mono text-sm">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portfolio-manager">Portfolio Manager</SelectItem>
              <SelectItem value="trader">Trader</SelectItem>
              <SelectItem value="quant">Quantitative Researcher</SelectItem>
              <SelectItem value="researcher">Research Analyst</SelectItem>
              <SelectItem value="developer">Developer / Engineer</SelectItem>
              <SelectItem value="cto">CTO / Head of Technology</SelectItem>
              <SelectItem value="cfo">CFO / Finance Leader</SelectItem>
              <SelectItem value="coo">COO / Operations</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          AUM / Assets Managed
        </label>
        <Select value={formData.aum} onValueChange={(value) => setFormData({ ...formData, aum: value })}>
          <SelectTrigger className="h-11 bg-secondary/20 font-mono text-sm">
            <SelectValue placeholder="Select range (optional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-1b">Under $1B</SelectItem>
            <SelectItem value="1-10b">$1B - $10B</SelectItem>
            <SelectItem value="10-50b">$10B - $50B</SelectItem>
            <SelectItem value="50-100b">$50B - $100B</SelectItem>
            <SelectItem value="over-100b">$100B+</SelectItem>
            <SelectItem value="prefer-not">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          What are you hoping to solve?
        </label>
        <Textarea
          value={formData.goals}
          onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
          placeholder="Tell us about your challenges and goals..."
          className="min-h-[100px] bg-secondary/20 font-mono text-sm"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full border border-primary/30 bg-primary/5 font-mono text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Request Demo
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center font-mono text-[10px] text-muted-foreground/60">
        By submitting, you agree to our privacy policy. We'll never share your data.
      </p>
    </form>
  );
};

// Sales contact form
const SalesForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: ''
  });
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidWorkEmail(formData.email)) {
      setEmailError('Please use your work email address');
      return;
    }
    setEmailError('');

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-6 font-mono text-xl font-light text-foreground">
          Message Sent
        </h3>
        <p className="mt-3 max-w-sm font-mono text-sm leading-relaxed text-muted-foreground">
          Thank you for reaching out. Our team will review your message and respond within 1-2 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          I'm interested in <span className="text-primary">*</span>
        </label>
        <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })} required>
          <SelectTrigger className="h-11 bg-secondary/20 font-mono text-sm">
            <SelectValue placeholder="Select your interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alice-pm">ALICE for Portfolio Management</SelectItem>
            <SelectItem value="alice-trading">ALICE for Trading</SelectItem>
            <SelectItem value="alice-quant">ALICE for Quant Research</SelectItem>
            <SelectItem value="bespoke">Bespoke / Custom Workflows</SelectItem>
            <SelectItem value="infrastructure">Infrastructure / Enterprise Deployment</SelectItem>
            <SelectItem value="apis">APIs & Data Layer</SelectItem>
            <SelectItem value="partnership">Partnership Opportunities</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Name <span className="text-primary">*</span>
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            required
            className="h-11 bg-secondary/20 font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Work Email <span className="text-primary">*</span>
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setEmailError('');
            }}
            placeholder="you@company.com"
            required
            className={cn("h-11 bg-secondary/20 font-mono text-sm", emailError && "border-destructive")}
          />
          {emailError && (
            <p className="font-mono text-[10px] text-destructive">{emailError}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Company <span className="text-primary">*</span>
        </label>
        <Input
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          placeholder="Company name"
          required
          className="h-11 bg-secondary/20 font-mono text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Message <span className="text-primary">*</span>
        </label>
        <Textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us how we can help..."
          required
          className="min-h-[120px] bg-secondary/20 font-mono text-sm"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full border border-primary/30 bg-primary/5 font-mono text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};

// Try ALICE section (demo widget placeholder)
const TryAliceSection = () => {
  const sampleQueries = [
    "Analyze earnings call sentiment for NVDA",
    "Compare sector momentum over last 30 days",
    "Generate a factor exposure report for my watchlist",
    "Summarize key risks in my portfolio"
  ];

  return (
    <div className="space-y-6">
      {/* Demo widget placeholder */}
      <div className="rounded-lg border border-border bg-secondary/10 p-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">ALICE Interactive Demo</span>
        </div>
        
        <div className="mt-6 space-y-4">
          <p className="font-mono text-sm text-muted-foreground">
            Try sample queries:
          </p>
          <div className="space-y-2">
            {sampleQueries.map((query, i) => (
              <button
                key={i}
                className="block w-full rounded-md border border-border/50 bg-background/50 px-4 py-3 text-left font-mono text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <Play className="mr-2 inline h-3 w-3 text-primary" />
                {query}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <p className="font-mono text-xs text-muted-foreground">
            Want to try with your own data?
          </p>
          <Button
            variant="outline"
            className="mt-3 rounded-full border-primary/30 font-mono text-xs uppercase tracking-[0.12em] text-primary"
          >
            Request Sandbox Access
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </div>

      <p className="text-center font-mono text-[10px] text-muted-foreground/60">
        No signup required for sample queries. Sandbox access requires verification.
      </p>
    </div>
  );
};

const ContactTab = () => {
  const [activePath, setActivePath] = useState<ContactPath>('demo');

  return (
    <div>
      <HeroSection
        accentLine="Contact"
        headline="Let's Build Something Together"
        subtitle="Whether you're exploring ALICE or ready to deploy, we're here to help."
      />

      {/* Path Selection */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              How Can We Help?
            </p>
            <h3 className="mt-4 font-mono text-2xl font-light tracking-tightest text-foreground md:text-3xl">
              Choose Your Path
            </h3>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <PathCard
              icon={Calendar}
              title="Book a Demo"
              description="Schedule a 30-minute call with our team to see ALICE in action."
              cta="Schedule Now"
              isActive={activePath === 'demo'}
              onClick={() => setActivePath('demo')}
            />
            <PathCard
              icon={MessageSquare}
              title="Contact Sales"
              description="Get a quote, ask questions, or explore partnership opportunities."
              cta="Send Message"
              isActive={activePath === 'sales'}
              onClick={() => setActivePath('sales')}
            />
            <PathCard
              icon={Play}
              title="Try ALICE"
              description="Explore interactive demos with sample queries. No signup required."
              cta="Launch Demo"
              isActive={activePath === 'try'}
              onClick={() => setActivePath('try')}
            />
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[800px] px-6 py-16 lg:px-10">
          <motion.div
            key={activePath}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activePath === 'demo' && (
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  Book a Demo
                </p>
                <h3 className="mt-4 font-mono text-xl font-light tracking-tightest text-foreground md:text-2xl">
                  See ALICE in Action
                </h3>
                <p className="mt-3 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
                  Tell us about yourself and we'll set up a personalized demo tailored to your needs.
                </p>
                <div className="mt-8">
                  <DemoForm />
                </div>
              </div>
            )}

            {activePath === 'sales' && (
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  Contact Sales
                </p>
                <h3 className="mt-4 font-mono text-xl font-light tracking-tightest text-foreground md:text-2xl">
                  Get in Touch
                </h3>
                <p className="mt-3 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
                  Have questions? We're here to help. Fill out the form and we'll be in touch.
                </p>
                <div className="mt-8">
                  <SalesForm />
                </div>
              </div>
            )}

            {activePath === 'try' && (
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  Try ALICE
                </p>
                <h3 className="mt-4 font-mono text-xl font-light tracking-tightest text-foreground md:text-2xl">
                  Interactive Demo
                </h3>
                <p className="mt-3 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
                  Explore ALICE's capabilities with sample queries. No signup required.
                </p>
                <div className="mt-8">
                  <TryAliceSection />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Trusted By
            </p>
            <h3 className="mt-4 font-mono text-xl font-light tracking-tightest text-foreground md:text-2xl">
              Institutions Managing $10T+ in Combined AUM
            </h3>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              {['Oxford University', 'DWS', 'Vanguard', 'NVIDIA Inception', 'Deus X Capital', 'Solstice'].map((partner) => (
                <div
                  key={partner}
                  className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground/40"
                >
                  {partner}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="font-mono text-sm text-muted-foreground">
                Prefer email? Reach out directly:
              </p>
              <a 
                href="mailto:contact@apexe3.com"
                className="mt-1 inline-block font-mono text-sm text-primary hover:underline"
              >
                contact@apexe3.com
              </a>
            </div>
            <div className="flex gap-6">
              <a 
                href="https://linkedin.com/company/apexe3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <a 
                href="https://twitter.com/apexe3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactTab;
