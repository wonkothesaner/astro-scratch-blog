import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getEmDashCollection } from "emdash";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { postCardFromFile, postCardFromEmdash } from "../utils/blog";

export const prerender = false;

export async function GET(context) {
  const filePosts = await getCollection("blog");
  const { entries: emdashPosts } = await getEmDashCollection("posts", { status: "published" });

  const posts = [...filePosts.map(postCardFromFile), ...emdashPosts.map(postCardFromEmdash)].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
      link: post.url,
    })),
  });
}
