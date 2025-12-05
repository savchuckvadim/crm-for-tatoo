export const metadata = {
  title: 'Blog - Tattoo Studio',
  description: 'Read our latest articles about tattoos, aftercare, and more',
};

export default function BlogPage() {
  // This would fetch from API in real implementation
  const articles = [
    {
      id: '1',
      title: 'Tattoo Aftercare Guide',
      excerpt: 'Learn how to properly care for your new tattoo...',
      slug: 'tattoo-aftercare',
      publishedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Choosing the Right Tattoo Style',
      excerpt: 'A comprehensive guide to different tattoo styles...',
      slug: 'tattoo-styles',
      publishedAt: '2024-01-10',
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12 pt-32">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article key={article.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <p className="text-sm text-gray-500 mb-4">{article.publishedAt}</p>
            <a
              href={`/blog/${article.slug}`}
              className="text-blue-600 hover:underline"
            >
              Read more →
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}

