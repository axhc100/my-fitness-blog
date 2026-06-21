import { buildPageMetadata, getToolSeo, type Lang } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const [title, description] = getToolSeo(lang, "ibw");

  return buildPageMetadata({
    lang,
    pathname: "/tools/ibw",
    title,
    description,
  });
}

export default function IbwLayout({ children }: { children: React.ReactNode }) {
  return children;
}
