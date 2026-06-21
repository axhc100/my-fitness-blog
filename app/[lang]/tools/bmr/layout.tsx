import { buildPageMetadata, getToolSeo, type Lang } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const [title, description] = getToolSeo(lang, "bmr");

  return buildPageMetadata({
    lang,
    pathname: "/tools/bmr",
    title,
    description,
  });
}

export default function BmrLayout({ children }: { children: React.ReactNode }) {
  return children;
}
