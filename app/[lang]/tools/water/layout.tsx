import { buildPageMetadata, getToolSeo, type Lang } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const [title, description] = getToolSeo(lang, "water");

  return buildPageMetadata({
    lang,
    pathname: "/tools/water",
    title,
    description,
  });
}

export default function WaterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
