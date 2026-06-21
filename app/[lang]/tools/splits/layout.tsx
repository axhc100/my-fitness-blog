import { buildPageMetadata, getToolSeo, type Lang } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const [title, description] = getToolSeo(lang, "splits");

  return buildPageMetadata({
    lang,
    pathname: "/tools/splits",
    title,
    description,
  });
}

export default function SplitsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
