import rss from "@astrojs/rss";
import { getSiteSetting } from "emdash";
import { getAllPostCards } from "../utils/blog";

export const prerender = false;

export async function GET(context) {
  const [posts, siteTitle, siteDescription] = await Promise.all([
    getAllPostCards(),
    getSiteSetting("title"),
    getSiteSetting("tagline"),
  ]);

  return rss({
    title: siteTitle,
    description: siteDescription,
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
      link: post.url,
    })),
  });
}
