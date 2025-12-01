export const metadata = {
  title: 'Our Artists - Tattoo Studio',
  description: 'Browse our talented tattoo artists and their portfolios',
};

export default function ArtistsPage() {
  // This would fetch from API in real implementation
  const artists = [
    {
      id: '1',
      name: 'John Doe',
      specialty: 'Realism',
      rating: 4.9,
      price: 150,
      portfolio: [],
    },
    {
      id: '2',
      name: 'Jane Smith',
      specialty: 'Traditional',
      rating: 4.8,
      price: 120,
      portfolio: [],
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Artists</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist) => (
          <div key={artist.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{artist.name}</h2>
            <p className="text-gray-600 mb-2">Specialty: {artist.specialty}</p>
            <p className="text-gray-600 mb-2">Rating: {artist.rating}/5.0</p>
            <p className="text-gray-600 mb-4">Starting at: €{artist.price}/hour</p>
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
              View Portfolio
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

