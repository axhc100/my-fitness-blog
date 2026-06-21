import { buildPageMetadata, getToolSeo, type Lang } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const [title, description] = getToolSeo(lang, "bfp");

  return buildPageMetadata({
    lang,
    pathname: "/tools/bfp",
    title,
    description,
  });
}

export default function BfpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
