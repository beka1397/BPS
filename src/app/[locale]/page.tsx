import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyDigitalize } from "@/components/WhyDigitalize";
import { ClinicComparison } from "@/components/ClinicComparison";
import { Demos } from "@/components/Demos";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { LanguageBanner } from "@/components/LanguageBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Header />
      <LanguageBanner />
      <Hero />
      <About />
      <WhyDigitalize />
      <ClinicComparison />
      <Services />
      <Demos />
      <Contact />
    </main>
  );
}
