import { buildPageMetadata, getToolSeo, type Lang } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const [title, description] = getToolSeo(lang, "hr");

  return buildPageMetadata({
    lang,
    pathname: "/tools/hr",
    title,
    description,
  });
}

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return children;
}
