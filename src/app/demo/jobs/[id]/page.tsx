import { analysisResult } from "@/lib/mock-data";
import { AnalysisResult } from "@/components/analysis-result";

export default function DemoAnalysisPage() {
  return <AnalysisResult result={analysisResult} basePath="/demo" />;
}
