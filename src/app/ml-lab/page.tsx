"use client";

import { Section } from "@/components/layouts/page";
import {
  TypographyH1,
  TypographyLead,
  TypographyMark,
  TypographyH3,
  TypographyMuted,
} from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

export default function MLLabPage() {
  return (
    <>
      <Section variant="hero">
        <TypographyH1>ML Concepts Lab</TypographyH1>
        <TypographyLead>
          Interactive visualizations of{" "}
          <TypographyMark>core machine learning concepts</TypographyMark>
        </TypographyLead>
      </Section>

      <Section innerPadding="pt-12">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Linear Regression */}
          <div className="space-y-4">
            <TypographyH3>1. Linear Regression</TypographyH3>
            <Badge variant="outline">Coming Next</Badge>
            <TypographyMuted>
              Visualizing best-fit line, slope, intercept, and mean squared error.
            </TypographyMuted>
          </div>

          {/* Gradient Descent */}
          <div className="space-y-4">
            <TypographyH3>2. Gradient Descent</TypographyH3>
            <Badge variant="outline">Coming Soon</Badge>
            <TypographyMuted>
              Understanding loss minimization and optimization visually.
            </TypographyMuted>
          </div>

          {/* Logistic Regression */}
          <div className="space-y-4">
            <TypographyH3>3. Logistic Regression</TypographyH3>
            <Badge variant="outline">Planned</Badge>
            <TypographyMuted>
              Exploring sigmoid function, probabilities, and classification threshold.
            </TypographyMuted>
          </div>

          {/* Decision Boundary */}
          <div className="space-y-4">
            <TypographyH3>4. Decision Boundary</TypographyH3>
            <Badge variant="outline">Planned</Badge>
            <TypographyMuted>
              Visualizing how classifiers separate different classes.
            </TypographyMuted>
          </div>

          {/* Bias vs Variance */}
          <div className="space-y-4">
            <TypographyH3>5. Bias vs Variance</TypographyH3>
            <Badge variant="outline">Planned</Badge>
            <TypographyMuted>
              Demonstrating underfitting vs overfitting with model complexity.
            </TypographyMuted>
          </div>

          {/* Neural Networks */}
          <div className="space-y-4">
            <TypographyH3>6. Neural Network Flow</TypographyH3>
            <Badge variant="outline">Planned</Badge>
            <TypographyMuted>
              Explaining forward propagation and activation visually.
            </TypographyMuted>
          </div>

          {/* ML Pipeline */}
          <div className="space-y-4">
            <TypographyH3>7. ML Pipeline</TypographyH3>
            <Badge variant="outline">Planned</Badge>
            <TypographyMuted>
              From raw data to deployed model — full lifecycle overview.
            </TypographyMuted>
          </div>

          {/* ECE to AI */}
          <div className="space-y-4">
            <TypographyH3>8. From ECE to AI</TypographyH3>
            <Badge variant="outline">Personal Journey</Badge>
            <TypographyMuted>
              Connecting signal processing, mathematics, and AI systems.
            </TypographyMuted>
          </div>

        </div>
      </Section>
    </>
  );
}