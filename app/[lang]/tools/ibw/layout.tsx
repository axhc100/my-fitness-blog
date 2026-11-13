import { buildPageMetadata, getToolSeo, type Lang } from "../../../lib/seo";
import ToolFaqSection from "@/components/ToolFaqSection";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const resolved = await params;
  const lang: Lang = resolved.lang === "zh" ? "zh" : "en";
  const [title, description] = getToolSeo(lang, "ibw");

  return buildPageMetadata({
    lang,
    pathname: "/tools/ibw",
    title,
    description,
  });
}

export default async function IbwLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolved = await params;
  const lang: Lang = resolved.lang === "zh" ? "zh" : "en";
  return (
    <>
      {children}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <ToolFaqSection slug="ibw" lang={lang} />
      </div>
    </>
  );
}
