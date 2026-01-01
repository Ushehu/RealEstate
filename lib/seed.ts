import { ID, Query } from "react-native-appwrite";
import { databases, config } from "./appwrite";
import {
  agentImages,
  galleryImages,
  propertiesImages,
  reviewImages,
} from "./data";

const COLLECTIONS = {
  AGENT: config.agentsTableId,
  REVIEWS: config.reviewsTableId,
  GALLERY: config.galleriesTableId,
  PROPERTY: config.propertiesTableId,
};

// Enhanced property types with realistic pricing ranges
const propertyTypes = [
  { type: "House", priceRange: [250000, 850000] },
  { type: "Townhouse", priceRange: [180000, 450000] },
  { type: "Condo", priceRange: [150000, 600000] },
  { type: "Duplex", priceRange: [200000, 500000] },
  { type: "Studio", priceRange: [80000, 250000] },
  { type: "Apartment", priceRange: [120000, 400000] },
  { type: "Villa", priceRange: [500000, 2000000] },
  { type: "Others", priceRange: [100000, 700000] },
];

const facilities = [
  "Laundry",
  "Car-Parking",
  "Sports-Center",
  "Cutlery",
  "Gym",
  "Swimming-Pool",
  "Wifi",
  "Pet-Center",
];

// Realistic agent data
const agentData = [
  { name: "Sarah Johnson", email: "sarah.johnson@realestate.com" },
  { name: "Michael Chen", email: "michael.chen@realestate.com" },
  { name: "Emily Rodriguez", email: "emily.rodriguez@realestate.com" },
  { name: "David Thompson", email: "david.thompson@realestate.com" },
  { name: "Jessica Martinez", email: "jessica.martinez@realestate.com" },
];

// Realistic reviewer names
const reviewerNames = [
  "John Anderson",
  "Maria Garcia",
  "Robert Wilson",
  "Linda Brown",
  "James Taylor",
  "Patricia Davis",
  "Michael Miller",
  "Jennifer Moore",
  "William Jackson",
  "Elizabeth White",
  "David Harris",
  "Susan Martin",
  "Richard Thompson",
  "Jessica Lee",
  "Charles Walker",
  "Nancy Hall",
  "Daniel Allen",
  "Karen Young",
  "Matthew King",
  "Lisa Wright",
];

// Realistic review templates
const reviewTemplates = [
  "Amazing property! The {feature} exceeded our expectations. Highly recommend working with this agent.",
  "Great location and well-maintained. The {feature} is exactly what we were looking for.",
  "Beautiful {propertyType} with modern amenities. The agent was very professional and helpful.",
  "Loved the spacious layout and {feature}. Perfect for our family needs.",
  "Excellent investment opportunity. The {feature} adds great value to the property.",
  "Clean, modern, and in a prime location. The {feature} is a standout feature.",
  "Wonderful experience from start to finish. The {feature} is top-notch.",
  "Perfect for first-time buyers. The {feature} makes daily living so convenient.",
  "Stunning property with attention to detail. The {feature} is impressive.",
  "Great value for money. The {feature} and location are unbeatable.",
  "Highly satisfied with our purchase. The {feature} was a major selling point.",
  "Beautiful neighborhood and well-designed space. The {feature} is fantastic.",
  "The agent made the process smooth and easy. Love the {feature}.",
  "Couldn't be happier! The {feature} is everything we hoped for.",
  "Modern design with practical features. The {feature} is very convenient.",
  "Excellent condition and move-in ready. The {feature} is a great addition.",
  "Perfect for our lifestyle. The {feature} makes this home special.",
  "Great investment in a growing area. The {feature} adds significant value.",
  "Impressed by the quality and attention to detail. The {feature} is outstanding.",
  "Fantastic property with lots of potential. The {feature} is a real highlight.",
];

// Realistic property names and descriptions
const propertyDescriptions = {
  House: {
    names: [
      "Modern Family Retreat",
      "Suburban Paradise",
      "Classic Colonial Estate",
      "Contemporary Dream Home",
      "Charming Bungalow",
    ],
    desc: "This stunning house features an open floor plan, updated kitchen with granite countertops, and a beautifully landscaped backyard perfect for entertaining. Recently renovated with high-end finishes throughout.",
  },
  Townhouse: {
    names: [
      "Urban Living Townhouse",
      "Contemporary Townhome",
      "City Center Residence",
      "Modern Row House",
      "Downtown Duplex",
    ],
    desc: "Beautifully designed townhome in a prime location. Features modern finishes, spacious rooms, and private patio. Walking distance to shops, restaurants, and public transportation.",
  },
  Condo: {
    names: [
      "Sky View Condo",
      "Luxury High-Rise Unit",
      "Downtown Loft",
      "Waterfront Apartment",
      "Penthouse Paradise",
    ],
    desc: "Sophisticated condo with floor-to-ceiling windows offering breathtaking views. Updated kitchen, spa-like bathroom, and access to world-class building amenities.",
  },
  Duplex: {
    names: [
      "Income Property Duplex",
      "Two-Family Home",
      "Investment Opportunity",
      "Side-by-Side Duplex",
      "Multi-Unit Residence",
    ],
    desc: "Excellent investment opportunity or perfect for multi-generational living. Both units feature updated kitchens, spacious bedrooms, and private entrances.",
  },
  Studio: {
    names: [
      "Cozy Studio Apartment",
      "Efficient City Living",
      "Modern Bachelor Pad",
      "Urban Studio Retreat",
      "Minimalist Haven",
    ],
    desc: "Perfectly designed studio maximizing every square foot. Modern finishes, efficient layout, and great natural light. Ideal for young professionals or students.",
  },
  Apartment: {
    names: [
      "Garden View Apartment",
      "Renovated City Unit",
      "Spacious 2-Bedroom",
      "Corner Unit Apartment",
      "Premium Living Space",
    ],
    desc: "Beautifully maintained apartment with updated fixtures and finishes. Open concept living area, modern kitchen, and in-unit laundry. Great building amenities.",
  },
  Villa: {
    names: [
      "Mediterranean Villa",
      "Luxury Estate",
      "Private Oasis",
      "Executive Mansion",
      "Elegant Villa Resort",
    ],
    desc: "Exceptional luxury villa featuring high ceilings, designer finishes, and resort-style amenities. Private pool, outdoor kitchen, and stunning architectural details throughout.",
  },
  Others: {
    names: [
      "Unique Living Space",
      "Converted Loft",
      "Custom Residence",
      "Architectural Gem",
      "One-of-a-Kind Property",
    ],
    desc: "Distinctive property offering a unique living experience. Creative use of space with custom features and thoughtful design elements.",
  },
};

// Real city addresses
const addresses = [
  { street: "742 Evergreen Terrace", city: "Springfield", coords: { lat: 42.1015, lng: -72.5898 } },
  { street: "1600 Pennsylvania Avenue", city: "Washington", coords: { lat: 38.8977, lng: -77.0365 } },
  { street: "221B Baker Street", city: "London", coords: { lat: 51.5237, lng: -0.1585 } },
  { street: "350 5th Avenue", city: "New York", coords: { lat: 40.7484, lng: -73.9857 } },
  { street: "1060 West Addison", city: "Chicago", coords: { lat: 41.9484, lng: -87.6553 } },
  { street: "1000 Sunset Boulevard", city: "Los Angeles", coords: { lat: 34.0928, lng: -118.3287 } },
  { street: "123 Main Street", city: "San Francisco", coords: { lat: 37.7749, lng: -122.4194 } },
  { street: "456 Oak Avenue", city: "Seattle", coords: { lat: 47.6062, lng: -122.3321 } },
  { street: "789 Pine Street", city: "Portland", coords: { lat: 45.5152, lng: -122.6784 } },
  { street: "321 Maple Drive", city: "Austin", coords: { lat: 30.2672, lng: -97.7431 } },
  { street: "654 Elm Court", city: "Denver", coords: { lat: 39.7392, lng: -104.9903 } },
  { street: "987 Cedar Lane", city: "Boston", coords: { lat: 42.3601, lng: -71.0589 } },
  { street: "159 Birch Road", city: "Miami", coords: { lat: 25.7617, lng: -80.1918 } },
  { street: "753 Willow Way", city: "Atlanta", coords: { lat: 33.7490, lng: -84.3880 } },
  { street: "852 Aspen Street", city: "Phoenix", coords: { lat: 33.4484, lng: -112.0740 } },
  { street: "147 Cherry Boulevard", city: "Dallas", coords: { lat: 32.7767, lng: -96.7970 } },
  { street: "369 Magnolia Place", city: "Houston", coords: { lat: 29.7604, lng: -95.3698 } },
  { street: "258 Sycamore Circle", city: "Philadelphia", coords: { lat: 39.9526, lng: -75.1652 } },
  { street: "741 Hickory Drive", city: "San Diego", coords: { lat: 32.7157, lng: -117.1611 } },
  { street: "963 Poplar Avenue", city: "Nashville", coords: { lat: 36.1627, lng: -86.7816 } },
];

function getRandomSubset<T>(
  array: T[],
  minItems: number,
  maxItems: number
): T[] {
  if (minItems > maxItems) {
    throw new Error("minItems cannot be greater than maxItems");
  }
  if (minItems < 0 || maxItems > array.length) {
    throw new Error(
      "minItems or maxItems are out of valid range for the array"
    );
  }

  const subsetSize =
    Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
  const arrayCopy = [...array];

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }

  return arrayCopy.slice(0, subsetSize);
}

function generateReview(propertyType: string): string {
  const features = [
    "kitchen",
    "location",
    "layout",
    "neighborhood",
    "backyard",
    "bathroom",
    "master bedroom",
    "views",
    "parking",
    "amenities",
  ];
  
  const template = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
  const feature = features[Math.floor(Math.random() * features.length)];
  
  return template
    .replace("{feature}", feature)
    .replace("{propertyType}", propertyType.toLowerCase());
}

async function seed() {
  try {
    console.log("Starting database seeding...");
    
    // Check if user is authenticated
    try {
      const { account } = require("./appwrite");
      const user = await account.get();
      console.log("✓ User authenticated:", user.email);
    } catch (authError) {
      throw new Error("You must be logged in to seed the database. Please sign in first.");
    }

    // Clear existing data from all collections
    console.log("⏳ Clearing existing data...");
    for (const key in COLLECTIONS) {
      const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
      console.log(`  Checking collection: ${key} (${collectionId})`);
      
      try {
        const documents = await databases.listDocuments(
          config.databaseId!,
          collectionId!,
          [Query.limit(100)] // Get more documents per page
        );
        console.log(`  Found ${documents.documents.length} documents in ${key}`);
        
        // Delete all documents in parallel for speed
        if (documents.documents.length > 0) {
          const deletePromises = documents.documents.map((doc) =>
            databases.deleteDocument(
              config.databaseId!,
              collectionId!,
              doc.$id
            ).catch((error) => {
              console.log(`  Warning: Could not delete ${doc.$id}:`, error.message);
            })
          );
          await Promise.all(deletePromises);
        }
        console.log(`  ✓ Cleared ${key}`);
      } catch (error) {
        console.error(`  ✗ Error with ${key}:`, error);
        throw new Error(`Failed to access collection "${key}" (${collectionId}). Make sure it exists in Appwrite.`);
      }
    }

    console.log("✓ Cleared all existing data.");

    // Seed Agents
    const agents: any[] = [];
    for (let i = 0; i < agentData.length; i++) {
      const agent = await databases.createDocument(
        config.databaseId!,
        COLLECTIONS.AGENT!,
        ID.unique(),
        {
          name: agentData[i].name,
          email: agentData[i].email,
          avatar: agentImages[i % agentImages.length],
        }
      );
      agents.push(agent);
    }
    console.log(`✓ Seeded ${agents.length} agents.`);

    // Seed Reviews (in parallel for speed)
    console.log("⏳ Seeding reviews...");
    const reviewPromises = reviewerNames.map((name, i) => {
      const rating = Math.floor(Math.random() * 2) + 4; // Rating between 4 and 5
      return databases.createDocument(
        config.databaseId!,
        COLLECTIONS.REVIEWS!,
        ID.unique(),
        {
          name: name,
          avatar: reviewImages[i % reviewImages.length],
          review: generateReview("property"),
          rating: rating,
        }
      );
    });
    const reviews: any[] = await Promise.all(reviewPromises);
    console.log(`✓ Seeded ${reviews.length} reviews.`);

    // Seed Galleries (in parallel for speed)
    console.log("⏳ Seeding galleries...");
    const galleryPromises = galleryImages.map((image) =>
      databases.createDocument(
        config.databaseId!,
        COLLECTIONS.GALLERY!,
        ID.unique(),
        { image }
      )
    );
    const galleries: any[] = await Promise.all(galleryPromises);

    console.log(`✓ Seeded ${galleries.length} galleries.`);

    // Seed Properties (in parallel batches for speed)
    console.log("⏳ Seeding properties...");
    const propertyPromises = Array.from({ length: 20 }, (_, i) => {
      const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
      const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
      const assignedReviews = getRandomSubset(reviews, 3, 7);
      const assignedGalleries = getRandomSubset(galleries, 3, 8);
      const selectedFacilities = getRandomSubset(facilities, 2, 6);
      const address = addresses[i % addresses.length];
      
      const propertyInfo = propertyDescriptions[propertyType.type as keyof typeof propertyDescriptions];
      const propertyName = propertyInfo.names[Math.floor(Math.random() * propertyInfo.names.length)];
      
      const [minPrice, maxPrice] = propertyType.priceRange;
      const basePrice = Math.floor(Math.random() * (maxPrice - minPrice)) + minPrice;
      
      const bedrooms = Math.floor(Math.random() * 4) + 1;
      const baseArea = bedrooms * 350 + Math.floor(Math.random() * 500) + 500;
      
      const image = propertiesImages[i % propertiesImages.length];

      return databases.createDocument(
        config.databaseId!,
        COLLECTIONS.PROPERTY!,
        ID.unique(),
        {
          name: propertyName,
          type: propertyType.type,
          description: propertyInfo.desc,
          address: `${address.street}, ${address.city}`,
          geolocation: `${address.coords.lat}, ${address.coords.lng}`,
          price: basePrice,
          area: baseArea,
          bedrooms: bedrooms,
          bathrooms: Math.min(bedrooms, Math.floor(Math.random() * 3) + 1),
          rating: Math.floor(Math.random() * 2) + 4,
          facilities: selectedFacilities,
          image: image,
          agent: assignedAgent.$id,
          reviews: assignedReviews.map((review) => review.$id),
          gallery: assignedGalleries.map((gallery) => gallery.$id),
        }
      ).then((property) => {
        console.log(`✓ Created: ${property.name}`);
        return property;
      }).catch((error) => {
        console.error(`✗ Failed to create property ${i + 1}:`, error.message);
        throw error; // Re-throw to catch in main try-catch
      });
    });

    await Promise.all(propertyPromises);
    console.log("✓ Seeded 20 properties.");

    console.log("\n✅ Data seeding completed successfully!");
    console.log("-----------------------------------");
    console.log(`📊 Total Summary:`);
    console.log(`   • Agents: ${agents.length}`);
    console.log(`   • Reviews: ${reviews.length}`);
    console.log(`   • Galleries: ${galleries.length}`);
    console.log(`   • Properties: 20`);
    console.log("-----------------------------------");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    throw error;
  }
}

export default seed;