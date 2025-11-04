// Sample sponsor data for development
// This can be imported to Firebase later
export const mockSponsors = [
  {
    id: '1',
    name: 'Padel Pro Equipment',
    logo: 'https://via.placeholder.com/150',
    category: 'Sports Equipment',
    description: 'Leading supplier of professional padel equipment and gear. We provide rackets, balls, and accessories for events.',
    minBudget: 5000000,
    maxBudget: 20000000,
    location: 'Jakarta',
    province: 'DKI Jakarta',
    contactEmail: 'sponsor@padelpro.com',
    contactPhone: '+62 21 1234567',
    benefits: ['Equipment provision', 'Brand visibility', 'Social media promotion'],
    website: 'https://padelpro.com'
  },
  {
    id: '2',
    name: 'Aqua Minerals',
    logo: 'https://via.placeholder.com/150',
    category: 'Beverages',
    description: 'Premium mineral water brand. We support healthy lifestyle events with hydration solutions.',
    minBudget: 10000000,
    maxBudget: 50000000,
    location: 'Bandung',
    province: 'Jawa Barat',
    contactEmail: 'events@aquaminerals.com',
    contactPhone: '+62 22 9876543',
    benefits: ['Beverage supply', 'Banner placement', 'Prize contributions'],
    website: 'https://aquaminerals.com'
  },
  {
    id: '3',
    name: 'TechBank Indonesia',
    logo: 'https://via.placeholder.com/150',
    category: 'Financial Services',
    description: 'Digital banking solutions for modern Indonesia. Supporting sports and community events nationwide.',
    minBudget: 20000000,
    maxBudget: 100000000,
    location: 'Jakarta',
    province: 'DKI Jakarta',
    contactEmail: 'sponsorship@techbank.id',
    contactPhone: '+62 21 5555000',
    benefits: ['Cash prizes', 'Digital payment integration', 'Marketing support', 'Branded merchandise'],
    website: 'https://techbank.id'
  },
  {
    id: '4',
    name: 'SportWear Plus',
    logo: 'https://via.placeholder.com/150',
    category: 'Apparel',
    description: 'Premium sports apparel manufacturer. Specializing in tennis and padel clothing.',
    minBudget: 8000000,
    maxBudget: 30000000,
    location: 'Surabaya',
    province: 'Jawa Timur',
    contactEmail: 'partnerships@sportwearplus.com',
    contactPhone: '+62 31 7777888',
    benefits: ['Apparel for participants', 'Branded uniforms', 'Discount vouchers'],
    website: 'https://sportwearplus.com'
  },
  {
    id: '5',
    name: 'Energy Plus Drink',
    logo: 'https://via.placeholder.com/150',
    category: 'Beverages',
    description: 'Leading energy drink brand for athletes. Fueling sports events across Indonesia.',
    minBudget: 15000000,
    maxBudget: 60000000,
    location: 'Jakarta',
    province: 'DKI Jakarta',
    contactEmail: 'sports@energyplus.co.id',
    contactPhone: '+62 21 8888999',
    benefits: ['Product sampling', 'Event branding', 'Athlete endorsements'],
    website: 'https://energyplus.co.id'
  },
  {
    id: '6',
    name: 'Health First Insurance',
    logo: 'https://via.placeholder.com/150',
    category: 'Insurance',
    description: 'Comprehensive health and sports insurance coverage. Protecting athletes and event organizers.',
    minBudget: 12000000,
    maxBudget: 40000000,
    location: 'Bali',
    province: 'Bali',
    contactEmail: 'events@healthfirst.id',
    contactPhone: '+62 361 222333',
    benefits: ['Insurance coverage', 'Medical support', 'Safety equipment'],
    website: 'https://healthfirst.id'
  },
  {
    id: '7',
    name: 'GoPadel Academy',
    logo: 'https://via.placeholder.com/150',
    category: 'Sports Training',
    description: 'Professional padel training academy. Providing coaching and tournament organization support.',
    minBudget: 5000000,
    maxBudget: 25000000,
    location: 'Yogyakarta',
    province: 'DI Yogyakarta',
    contactEmail: 'info@gopadel.com',
    contactPhone: '+62 274 555666',
    benefits: ['Professional coaching', 'Tournament expertise', 'Training programs'],
    website: 'https://gopadel.com'
  },
  {
    id: '8',
    name: 'Local Property Group',
    logo: 'https://via.placeholder.com/150',
    category: 'Real Estate',
    description: 'Premium property developer with focus on sports facilities. Building communities through sports.',
    minBudget: 30000000,
    maxBudget: 150000000,
    location: 'Tangerang',
    province: 'Banten',
    contactEmail: 'marketing@localpropertygroup.com',
    contactPhone: '+62 21 4444555',
    benefits: ['Venue support', 'Large-scale branding', 'Long-term partnerships', 'Facility upgrades'],
    website: 'https://localpropertygroup.com'
  }
]

// Helper function to format currency in IDR
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Get unique locations
export const getUniqueLocations = () => {
  return [...new Set(mockSponsors.map(s => s.location))].sort()
}

// Get unique provinces
export const getUniqueProvinces = () => {
  return [...new Set(mockSponsors.map(s => s.province))].sort()
}

// Get unique categories
export const getUniqueCategories = () => {
  return [...new Set(mockSponsors.map(s => s.category))].sort()
}
