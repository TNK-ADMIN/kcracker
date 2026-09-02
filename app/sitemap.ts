import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kcracker.asia";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}?lang=en`,
          vi: `${baseUrl}?lang=vi`,
          zh: `${baseUrl}?lang=zh`,
          ru: `${baseUrl}?lang=ru`,
        },
      },
    },
    {
      url: `${baseUrl}#capabilities`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}#compliance`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
