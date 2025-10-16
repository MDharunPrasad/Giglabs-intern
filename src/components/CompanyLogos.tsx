import React, { type SVGProps } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Brain, Code, Palette, Server, Database, Sparkles, Layout, Zap, Target, TrendingUp, Award, BookOpen } from "lucide-react";

// Company/Partner Logo Components using Lucide icons styled to look like brands
function TechUniversityIcon(props: SVGProps<SVGSVGElement>) {
  return <BookOpen {...props} className="text-foreground" />;
}

function AILabIcon(props: SVGProps<SVGSVGElement>) {
  return <Brain {...props} className="text-foreground" />;
}

function CodeAcademyIcon(props: SVGProps<SVGSVGElement>) {
  return <Code {...props} className="text-foreground" />;
}

function DesignHubIcon(props: SVGProps<SVGSVGElement>) {
  return <Palette {...props} className="text-foreground" />;
}

function DevOpsInstituteIcon(props: SVGProps<SVGSVGElement>) {
  return <Server {...props} className="text-foreground" />;
}

function DataScienceIcon(props: SVGProps<SVGSVGElement>) {
  return <Database {...props} className="text-foreground" />;
}

function InnovationLabIcon(props: SVGProps<SVGSVGElement>) {
  return <Sparkles {...props} className="text-foreground" />;
}

function FullStackAcademyIcon(props: SVGProps<SVGSVGElement>) {
  return <Layout {...props} className="text-foreground" />;
}

function TechStartupIcon(props: SVGProps<SVGSVGElement>) {
  return <Zap {...props} className="text-foreground" />;
}

function StrategyInstituteIcon(props: SVGProps<SVGSVGElement>) {
  return <Target {...props} className="text-foreground" />;
}

function GrowthAcademyIcon(props: SVGProps<SVGSVGElement>) {
  return <TrendingUp {...props} className="text-foreground" />;
}

function CertificationBoardIcon(props: SVGProps<SVGSVGElement>) {
  return <Award {...props} className="text-foreground" />;
}

const allLogos = [
  { name: "Tech University", id: 1, img: TechUniversityIcon },
  { name: "AI Lab", id: 2, img: AILabIcon },
  { name: "Code Academy", id: 3, img: CodeAcademyIcon },
  { name: "Design Hub", id: 4, img: DesignHubIcon },
  { name: "DevOps Institute", id: 5, img: DevOpsInstituteIcon },
  { name: "Data Science Pro", id: 6, img: DataScienceIcon },
  { name: "Innovation Lab", id: 7, img: InnovationLabIcon },
  { name: "FullStack Academy", id: 8, img: FullStackAcademyIcon },
  { name: "Tech Startup", id: 9, img: TechStartupIcon },
  { name: "Strategy Institute", id: 10, img: StrategyInstituteIcon },
  { name: "Growth Academy", id: 11, img: GrowthAcademyIcon },
  { name: "Certification Board", id: 12, img: CertificationBoardIcon },
];

export function CompanyLogos() {
  return (
    <div className="space-y-8 py-16">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
        <div className="text-center">
          <GradientHeading variant="secondary" size="sm">
            Trusted by Leading Institutions
          </GradientHeading>
          <GradientHeading size="xl">
            Join Thousands of Successful Students
          </GradientHeading>
        </div>

        <LogoCarousel columnCount={4} logos={allLogos} /> 
      </div>
    </div>
  );
}
