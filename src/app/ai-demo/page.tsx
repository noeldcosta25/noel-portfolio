"use client";

import { useState } from "react";
import { Section } from "@/components/layouts/page";
import {
  TypographyH1,
  TypographyLead,
  TypographyMark,
  TypographyMuted,
  TypographyH3,
} from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ================= SENTIMENT ================= */

function analyzeSentiment(text: string) {
  const positiveWords = [
    "good","great","excellent","amazing","love","awesome","happy","fantastic",
  ];
  const negativeWords = [
    "bad","terrible","awful","hate","worst","sad","horrible","angry",
  ];

  let score = 0;
  const words = text.toLowerCase().split(/\s+/);

  words.forEach((word) => {
    if (positiveWords.includes(word)) score++;
    if (negativeWords.includes(word)) score--;
  });

  if (score > 0) return "Positive";
  if (score < 0) return "Negative";
  return "Neutral";
}

/* ================= SPAM ================= */

function analyzeSpam(text: string) {
  const spamWords = [
    "free","win","winner","offer","money","urgent","click","lottery","prize",
  ];

  const words = text.toLowerCase().split(/\s+/);
  const isSpam = words.some((word) => spamWords.includes(word));
  return isSpam ? "Spam" : "Not Spam";
}

/* ================= RESUME ================= */

const requiredSkills = [
  "python","machine learning","deep learning","sql","pandas","numpy",
  "tensorflow","pytorch","azure","aws","data analysis",
];

function analyzeResume(text: string) {
  const lower = text.toLowerCase();

  const found = requiredSkills.filter((skill) =>
    lower.includes(skill)
  );

  const missing = requiredSkills.filter(
    (skill) => !lower.includes(skill)
  );

  const score = Math.round((found.length / requiredSkills.length) * 100);

  return { found, missing, score };
}

/* ================= SUMMARIZER ================= */

function summarizeText(text: string) {
  const sentences = text.split(". ");
  if (sentences.length <= 2) return text;

  const wordFreq: Record<string, number> = {};

  text.toLowerCase().split(/\s+/).forEach((word) => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });

  const scored = sentences.map((sentence) => {
    const score = sentence
      .toLowerCase()
      .split(/\s+/)
      .reduce((acc, word) => acc + (wordFreq[word] || 0), 0);

    return { sentence, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 2).map((s) => s.sentence).join(". ") + ".";
}

/* ================= PAGE ================= */

export default function AIDemoPage() {

  const [sentimentInput, setSentimentInput] = useState("");
  const [spamInput, setSpamInput] = useState("");
  const [resumeInput, setResumeInput] = useState("");
  const [summaryInput, setSummaryInput] = useState("");

  const [sentimentResult, setSentimentResult] = useState<string | null>(null);
  const [spamResult, setSpamResult] = useState<string | null>(null);
  const [resumeResult, setResumeResult] = useState<any>(null);
  const [summaryResult, setSummaryResult] = useState<string | null>(null);

  return (
    <>
      <Section variant="hero">
        <TypographyH1>AI Playground</TypographyH1>
        <TypographyLead>
          Interactive <TypographyMark>NLP Mini Models</TypographyMark>
        </TypographyLead>
      </Section>

      <Section innerPadding="pt-12">
        <div className="max-w-3xl mx-auto space-y-16">

          {/* ================= SENTIMENT ================= */}
          <div className="space-y-4">
            <TypographyH3>Sentiment Analyzer</TypographyH3>

            <textarea
              value={sentimentInput}
              onChange={(e) => setSentimentInput(e.target.value)}
              placeholder="Type a sentence... e.g., I love this project!"
              className="w-full min-h-[120px] p-4 border rounded-md bg-background"
            />
            <div className="flex flex-col items-start gap-3">
              <Button
                onClick={() => {
                  if (!sentimentInput.trim()) {
                    setSentimentResult("Please type something to analyze.");
                    return;
                  }
                  setSentimentResult(analyzeSentiment(sentimentInput));
                }}
              >
                Analyze Sentiment
              </Button>

              {sentimentResult && (
                <Badge variant="outline" className="px-4 py-2">
                  {sentimentResult}
                </Badge>
              )}
            </div>

            <TypographyMuted>
              Simple rule-based scoring logic.
            </TypographyMuted>
          </div>

          {/* ================= SPAM ================= */}
          <div className="space-y-4">
            <TypographyH3>Spam Classifier</TypographyH3>

            <textarea
              value={spamInput}
              onChange={(e) => setSpamInput(e.target.value)}
              placeholder="Type a message... e.g., You won a free lottery prize!"
              className="w-full min-h-[120px] p-4 border rounded-md bg-background"
            />

            <div className="flex flex-col items-start gap-3">
              <Button
                onClick={() => {
                  if (!spamInput.trim()) {
                    setSpamResult("Please enter a message to check.");
                    return;
                  }
                  setSpamResult(analyzeSpam(spamInput));
                }}
              >
                Check Spam
              </Button>

              {spamResult && (
                <Badge variant="outline" className="px-4 py-2">
                  {spamResult}
                </Badge>
              )}
            </div>

            <TypographyMuted>
              Keyword-based spam detection logic.
            </TypographyMuted>
          </div>

          {/* ================= RESUME ================= */}
          <div className="space-y-4">
            <TypographyH3>Resume Skill Analyzer</TypographyH3>

            <textarea
              value={resumeInput}
              onChange={(e) => setResumeInput(e.target.value)}
              placeholder="Paste resume text here..."
              className="w-full min-h-[150px] p-4 border rounded-md"
            />

            <div className="flex flex-col items-start gap-3">
              <Button
                onClick={() => {
                  if (!resumeInput.trim()) {
                    setResumeResult({ error: "Please paste resume text first." });
                    return;
                  }
                  setResumeResult(analyzeResume(resumeInput));
                }}
              >
                Analyze Resume
              </Button>

              {resumeResult?.error ? (
                <Badge variant="outline">{resumeResult.error}</Badge>
              ) : resumeResult && (
                <div className="space-y-2">
                  <Badge variant="outline">
                    AI Readiness Score: {resumeResult.score}%
                  </Badge>
                  <TypographyMuted>
                    Skills Found: {resumeResult.found.join(", ") || "None"}
                  </TypographyMuted>
                  <TypographyMuted>
                    Missing Skills: {resumeResult.missing.join(", ") || "None"}
                  </TypographyMuted>
                </div>
              )}
            </div>
          </div>

          {/* ================= SUMMARIZER ================= */}
          <div className="space-y-4">
            <TypographyH3>Text Summarizer</TypographyH3>

            <textarea
              value={summaryInput}
              onChange={(e) => setSummaryInput(e.target.value)}
              placeholder="Paste long paragraph here to summarize..."
              className="w-full min-h-[150px] p-4 border rounded-md"
            />
            <div className="flex flex-col items-start gap-3">
              <Button
                onClick={() => {
                  if (!summaryInput.trim()) {
                    setSummaryResult("Please paste text to summarize.");
                    return;
                  }
                  setSummaryResult(summarizeText(summaryInput));
                }}
              >
                Summarize
              </Button>

              {summaryResult && (
                <Badge variant="outline" className="px-4 py-2">
                  {summaryResult}
                </Badge>
              )}
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}