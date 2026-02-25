import { Section } from "@/components/layouts/page";
import {
  TypographyH3,
  TypographyMuted,
  SectionLabel,
} from "@/components/ui/typography";
import { DecorIcon } from "@/components/ui/border";
import { Badge } from "@/components/ui/badge";

export function CurrentlyLearning() {
  return (
    <Section aria-label="Currently Learning">
      <div className="flex items-center gap-3 mb-10" aria-hidden="true">
        <SectionLabel>Currently Learning</SectionLabel>
        <div className="flex-1 h-px bg-border/40" />
      </div>

      <div className="relative p-0 border-0 lg:p-8 lg:border max-w-4xl">
        <div className="hidden lg:block" aria-hidden="true">
          <DecorIcon position="top-left" />
          <DecorIcon position="top-right" />
          <DecorIcon position="bottom-left" />
          <DecorIcon position="bottom-right" />
        </div>

        <div className="relative z-10 space-y-6">
          <TypographyH3 className="border-none pb-0">
            Building production-ready AI systems
          </TypographyH3>

          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="px-4 py-2">
              Advanced ML Model Deployment
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              MLOps & Model Monitoring
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              Azure AI Services
            </Badge>
          </div>

          <TypographyMuted className="max-w-2xl">
            Currently focusing on deploying machine learning models in
            production environments, understanding MLOps workflows,
            and building scalable AI systems using Azure cloud services.
          </TypographyMuted>
        </div>
      </div>
    </Section>
  );
}