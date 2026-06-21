import { buildPageMetadata, getToolSeo, type Lang } from "../../../lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const [title, description] = getToolSeo(lang, "macro");

  return buildPageMetadata({
    lang,
    pathname: "/tools/macro",
    title,
    description,
  });
}

export default function MacroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
