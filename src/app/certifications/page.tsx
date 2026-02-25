import { Section } from "@/components/layouts/page";
import {
  TypographyH1,
  TypographyLead,
  TypographyH3,
  TypographyMuted,
} from "@/components/ui/typography";
import { DecorIcon } from "@/components/ui/border";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CertificationsPage() {
  return (
    <>
      <Section variant="hero">
        <TypographyH1>Certifications</TypographyH1>
        <TypographyLead>
          Industry-recognized credentials validating expertise in AI,
          Data Science, and Analytics.
        </TypographyLead>
      </Section>

      <Section innerPadding="pt-12">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* 1️⃣ Boston Institute (2 Certificates) */}
          <div className="relative p-0 border-0 lg:p-8 lg:border">
            <div className="hidden lg:block">
              <DecorIcon position="top-left" />
              <DecorIcon position="top-right" />
              <DecorIcon position="bottom-left" />
              <DecorIcon position="bottom-right" />
            </div>

            <div className="relative z-10 space-y-4">
              <TypographyH3>
                Data Science & Artificial Intelligence
              </TypographyH3>
              <TypographyMuted>
                Boston Institute of Analytics
              </TypographyMuted>

              <div className="flex gap-4 flex-wrap">
                <Button asChild variant="outline">
                  <Link
                    href="https://drive.google.com/file/d/1PL0K6pknLPDpSpGxaF-ZPxV34FNe0Q6Y/view"
                    target="_blank"
                  >
                    View Certificate 1
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link
                    href="https://drive.google.com/file/d/1Qfl8wFvGyJZT6HvJ6xWr-ROsKrd_tpd3/preview"
                    target="_blank"
                  >
                    View Certificate 2
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* 2️⃣ Oracle */}
          <div className="relative p-0 border-0 lg:p-8 lg:border">
            <div className="relative z-10 space-y-4">
              <TypographyH3>
                Oracle AI Foundations
              </TypographyH3>
              <TypographyMuted>
                Oracle Corporation
              </TypographyMuted>

              <Button asChild variant="outline">
                <Link
                  href="https://drive.google.com/file/d/12ekpEN4N10TB8hYXrZztBVvhUZXN7mqq/preview"
                  target="_blank"
                >
                  View Certificate
                </Link>
              </Button>
            </div>
          </div>

          {/* 3️⃣ Deloitte – Forage */}
          <div className="relative p-0 border-0 lg:p-8 lg:border">
            <div className="relative z-10 space-y-4">
              <TypographyH3>
                Deloitte Data Analytics (Forage)
              </TypographyH3>
              <TypographyMuted>
                Deloitte Virtual Experience Program
              </TypographyMuted>

              <Button asChild variant="outline">
                <Link
                  href="https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_hR6Dj7wR7yLCpvcvZ_1749707712837_completion_certificate.pdf"
                  target="_blank"
                >
                  View Certificate
                </Link>
              </Button>
            </div>
          </div>

          {/* 4️⃣ British Airways – Forage */}
          <div className="relative p-0 border-0 lg:p-8 lg:border">
            <div className="relative z-10 space-y-4">
              <TypographyH3>
                British Airways Data Science (Forage)
              </TypographyH3>
              <TypographyMuted>
                British Airways Virtual Experience Program
              </TypographyMuted>
              <Button asChild variant="outline">
                <Link
                  href="https://www.theforage.com/completion-certificates/tMjbs76F526fF5v3G/NjynCWzGSaWXQCxSX_tMjbs76F526fF5v3G_hR6Dj7wR7yLCpvcvZ_1763449609688_completion_certificate.pdf"
                  target="_blank"
                >
                  View Certificate
                </Link>
              </Button>
            </div>
          </div>

          {/* 5️⃣ Qualcomm */}
          <div className="relative p-0 border-0 lg:p-8 lg:border">
            <div className="relative z-10 space-y-4">
              <TypographyH3>
                Qualcomm Artificial Intelligence Foundations
              </TypographyH3>
              <TypographyMuted>
                Qualcomm Technologies
              </TypographyMuted>

              <Button asChild variant="outline">
                <Link
                  href="https://drive.google.com/file/d/1iixI9BOdt7YzhFsWSeSqPBzPgfAX5Oov/preview"
                  target="_blank"
                >
                  View Certificate
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}