import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { ventures } from "@/data/ventures";

const BASE = "https://www.anam.info";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/ventures", "/about", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}` })),
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug}` })),
    ...ventures.map((v) => ({ url: `${BASE}/ventures/${v.slug}` })),
  ];
}
