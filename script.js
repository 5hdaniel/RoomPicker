// Quiz Logic and Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Quiz State
    let currentQuestionIndex = 0;
    let totalQuestions = 0;
    let bookingStatus = null;
    let scores = {
        wellness: 0,
        luxury: 0,
        value: 0,
        space: 0,
        couple: 0,
        family: 0
    };
    const userTripDetails = {
        bookingStatus: null,
        bookedCruiseLine: '',
        bookedDestination: '',
        bookedStartDate: '',
        bookedEndDate: '',
        detectedShip: '',
        intendedDestination: '',
        intendedMonth: '',
        cruiseHistoryCount: '',
        priorCruiseLines: [],
        planningBudget: ''
    };
    let answerHistory = []; // Track answers for back functionality

    // Room Definitions
    const edgeRooms = {
        deluxePorthole: {
            name: 'Deluxe Porthole View with Veranda',
            icon: '🔵',
            description: 'Central ship location with floor-to-ceiling view and balcony. Great entry-level option with veranda access.',
            highlights: [
                '~241 sq ft with balcony',
                'Central ship location',
                'Floor-to-ceiling view',
                'King sized Cashmere Mattress',
                'Plush bathrobes and towels',
                'Premium bathroom products',
                'Plentiful storage space',
                'In-room Automation'
            ],
            price: 'Starting from $2,268/person',
            bestFor: 'budget travelers wanting veranda access in central location'
        },
        edgeInfinitePartial: {
            name: 'Edge Stateroom with Infinite Veranda (Partial View)',
            icon: '🪟',
            description: 'Aft/forward location with Infinite Veranda. View partially obstructed but one of the largest veranda staterooms at sea!',
            highlights: [
                '~243 sq ft with Infinite Veranda',
                'One of the largest veranda staterooms at sea',
                'Floor-to-ceiling windows transform to balcony',
                'Innovative inside/outside design',
                'Aft or forward ship areas',
                'King sized Cashmere Mattress',
                'Plush bathrobes and towels',
                'Budget-friendly option'
            ],
            price: 'Starting from $2,408/person',
            bestFor: 'value seekers wanting Infinite Veranda without paying premium for location'
        },
        edgeInfinite: {
            name: 'Edge Stateroom with Infinite Veranda',
            icon: '🌊',
            description: 'Standard Infinite Veranda stateroom in aft/forward areas. Innovative design merges inside and outside space.',
            highlights: [
                '~243 sq ft with Infinite Veranda',
                'One of the largest veranda staterooms at sea',
                'Floor-to-ceiling windows transform to balcony',
                'Touch of button veranda access',
                'Closer connection to the ocean',
                'King sized Cashmere Mattress',
                'Plush bathrobes and towels',
                'Great standard option'
            ],
            price: 'Starting from $2,428/person',
            bestFor: 'travelers wanting Infinite Veranda experience at standard pricing'
        },
        primeEdgeInfinite: {
            name: 'Prime Edge Stateroom with Infinite Veranda',
            icon: '⭐',
            description: 'Premium midship to forward location on higher decks with Infinite Veranda. Best standard stateroom location!',
            highlights: [
                '~243-369 sq ft (accessible options available)',
                'Midship to forward on HIGHER DECKS',
                'Best location for stability',
                'One of the largest veranda staterooms',
                'Floor-to-ceiling Infinite Veranda',
                'Veranda with seating area',
                'King sized Cashmere Mattress',
                'Premium location at great value'
            ],
            price: 'Starting from $2,478/person',
            bestFor: 'travelers wanting best location without concierge or suite upgrade'
        },
        sunsetVeranda: {
            name: 'Sunset Veranda Stateroom',
            icon: '🌅',
            description: 'Spacious aft-facing stateroom with extra-large balcony. Most spacious Edge veranda - watch the horizon drift away!',
            highlights: [
                '~317 sq ft - MOST SPACIOUS Edge veranda',
                'Aft-facing balcony at stern',
                'Extra-large balcony',
                'Mesmerizing sunset views',
                'Floor-to-ceiling window',
                'King sized Cashmere Mattress',
                'Plush bathrobes and towels',
                'Extra space without suite pricing'
            ],
            price: 'Starting from $3,068/person',
            bestFor: 'travelers wanting extra space and sunset views at standard pricing'
        },
        aquaclass: {
            name: 'AquaClass Stateroom',
            icon: '🧘',
            description: 'Perfect for wellness-focused cruisers on a budget who want spa access and exclusive Blu dining.',
            highlights: [
                '~243 sq ft with Infinite Veranda',
                'Exclusive Blu restaurant access',
                'SEA Thermal Suite & Spa Concierge',
                'Yoga mats and wellness amenities',
                '2 bottled waters daily',
                'Eco-friendly products',
                'Great value for spa lovers'
            ],
            price: 'Starting from $3,080/person',
            bestFor: 'couples who prioritize wellness and spa experiences without suite pricing'
        },
        primeAquaclass: {
            name: 'Prime AquaClass Stateroom',
            icon: '🧘‍♂️',
            description: 'All the AquaClass benefits with superior midship location and better views from higher decks.',
            highlights: [
                '~243-369 sq ft (includes accessible options)',
                'Premium midship location',
                'Higher deck with better views',
                'All AquaClass wellness benefits',
                'Blu restaurant access',
                'SEA Thermal Suite access',
                'Best location for less motion'
            ],
            price: 'Starting from $3,380/person',
            bestFor: 'wellness enthusiasts who want the best location and views'
        },
        aquaSky: {
            name: 'Aqua Sky Suite',
            icon: '🌟',
            description: 'The ultimate hybrid - combines AquaClass wellness benefits with full Retreat suite service and butler.',
            highlights: [
                '~397 sq ft open studio suite',
                'Both Blu AND Luminae dining',
                'Full Retreat access (Lounge, Sundeck)',
                'Butler service included',
                'In-suite fitness equipment',
                'Premium drink & Wi-Fi packages',
                'Traditional veranda with lounge seating',
                'SEA Thermal Suite with in-room fitness'
            ],
            price: 'Starting from $5,968/person',
            bestFor: 'wellness lovers who want the complete luxury suite experience'
        },
        magicCarpet: {
            name: 'Magic Carpet Sky Suite',
            icon: '🎪',
            description: 'Unique studio suite with stunning views of the innovative Magic Carpet platform and spacious balcony.',
            highlights: [
                '~400 sq ft studio suite',
                'Unique view of the Magic Carpet',
                'Large bathroom',
                'Spacious veranda with lounge seating',
                'Floor-to-ceiling sliding glass doors',
                'The Retreat full access',
                'Luminae at The Retreat',
                'Butler service with Butler Chat',
                'Unlimited Premium Drink Package',
                'Premium Wi-Fi package',
                'Full in-suite dining service',
                'Priority check-in and embarkation',
                'Reserved theater seating'
            ],
            price: 'Starting from $4,668/person',
            bestFor: 'couples wanting a unique Retreat experience with spectacular Magic Carpet views'
        },
        skySuite: {
            name: 'Sky Suite',
            icon: '☁️',
            description: 'Elevated studio suite on high-deck with spacious balcony, offering stunning ocean views and full Retreat privileges.',
            highlights: [
                '~398-517 sq ft studio suite (accessible options available)',
                'High-deck location for panoramic views',
                'Spacious veranda with lounge seating',
                'Floor-to-ceiling sliding glass doors',
                'The Retreat full access',
                'Luminae at The Retreat',
                'Butler service with Butler Chat',
                'Unlimited Premium Drink Package',
                'Premium Wi-Fi package',
                'Full in-suite dining service',
                'Priority check-in and embarkation',
                'Up to 4 guests',
                'Afternoon tea events'
            ],
            price: 'Starting from $5,018/person',
            bestFor: 'families or couples wanting high-deck views with Retreat privileges'
        },
        sunsetSky: {
            name: 'Sunset Sky Suite',
            icon: '🌅',
            description: 'Large aft-facing studio suite perfect for watching stunning sunsets from your private spacious balcony.',
            highlights: [
                '~462 sq ft studio suite',
                'Aft-facing for spectacular sunset views',
                'Large bathroom',
                'Spacious veranda with lounge seating',
                'Floor-to-ceiling sliding glass doors',
                'The Retreat full access',
                'Luminae at The Retreat',
                'Butler service with Butler Chat',
                'Unlimited Premium Drink Package',
                'Premium Wi-Fi package',
                'Full in-suite dining service',
                'Priority check-in and embarkation',
                'Reserved theater seating',
                'Afternoon tea events'
            ],
            price: 'Starting from $5,568/person',
            bestFor: 'sunset lovers and couples seeking romantic aft-facing views with luxury'
        },
        celebrity: {
            name: 'Celebrity Suite',
            icon: '👑',
            description: 'Spacious luxury suite with The Retreat privileges, perfect for those who value extra space and comfort.',
            highlights: [
                '~501 sq ft with split bathroom',
                'The Retreat full access',
                'Luminae exclusive restaurant',
                'Butler service',
                'Premium drink & Wi-Fi packages',
                'Larger veranda with dining area',
                'Minibar included',
                'Up to 4 guests'
            ],
            price: 'Starting from $8,568/person',
            bestFor: 'couples or families wanting spacious luxury without wellness focus'
        },
        royal: {
            name: 'Royal Suite',
            icon: '💎',
            description: 'The pinnacle of luxury cruising with separate bedroom, unlimited specialty dining, and premium amenities.',
            highlights: [
                '~759 sq ft - separate bedroom, living & dining',
                'Unlimited specialty dining package',
                'Premium drinks & spirits included',
                'Whirlpool tub',
                'Espresso machine',
                'Included laundry & unlimited pressing',
                'SEA Thermal Suite access',
                'Extra-large balcony',
                'Daily bar refresh',
                'Full Retreat VIP treatment'
            ],
            price: 'Starting from $13,768/person',
            bestFor: 'travelers seeking the ultimate VIP experience with maximum space and luxury'
        },
        iconic: {
            name: 'Iconic Suite',
            icon: '🏰',
            description: 'The absolute pinnacle of Celebrity Cruises - the largest suite in the entire fleet with unparalleled luxury and amenities!',
            highlights: [
                '2,581 sq ft - 2 bedrooms, 2 bathrooms',
                'Sleeps up to 6 guests',
                'Private sundeck with 270° ocean views',
                'Private hot tub and double daybed on terrace',
                'Panoramic views from above the bridge',
                'Floor-to-ceiling windows throughout',
                'Private butler\'s pantry',
                'In-room Peloton available',
                'Dual sinks, full shower, and whirlpool tub',
                'Unlimited Specialty Dining Package',
                'Unlimited Premium Drink Package',
                'Two complimentary bottles of premium spirits or wine',
                'Personalized minibar stocked daily',
                'Full in-suite breakfast, lunch, dinner service',
                'Premium in-suite coffee set-up',
                'Dedicated butler service with Butler Chat',
                'Destination Experience Specialist',
                'Priority check-in and boarding',
                'Complimentary laundry and unlimited pressing',
                'Priority departure and embarkation',
                'Reserved theater seating on Evening Chic nights',
                'The Retreat Lounge with gourmet bites',
                'The Retreat Sundeck with exclusive pool',
                'Luminae at The Retreat by Daniel Boulud',
                'Afternoon tea events in The Retreat Lounge',
                'Premium Wi-Fi package',
                'SEA Thermal Suite access',
                'Premium Celebrity Cashmere Mattress with Retreat bedding',
                'Exclusive complimentary sleepwear',
                'Complimentary beach towel, shoeshine, umbrella services',
                'Welcome bottle of bubbles'
            ],
            price: 'Starting from $28,768/person',
            bestFor: 'those seeking the absolute ultimate luxury experience - the crown jewel of Celebrity Cruises'
        },
        conciergePartial: {
            name: 'Concierge Class (Partial View)',
            icon: '🪟',
            description: 'High-deck Infinite Veranda stateroom with personalized concierge service. View partially blocked by Magic Carpet hardware, but great value.',
            highlights: [
                '~243 sq ft with Infinite Veranda',
                'High-deck location',
                'Innovative design merges inside and outside',
                'Personalized Concierge service',
                'Embarkation Day Concierge Class Lunch',
                'Welcome bottle of sparkling wine',
                'Exclusive Destination Seminar',
                'King sized Cashmere mattress',
                'Premium bathroom products',
                'Plush bathrobes, slippers',
                'Daily delivery of delectable delights'
            ],
            price: 'Starting from $2,670/person',
            bestFor: 'budget-conscious travelers wanting concierge perks without paying full concierge price'
        },
        concierge: {
            name: 'Concierge Class Stateroom',
            icon: '🎩',
            description: 'High-deck Infinite Veranda stateroom with personalized concierge service and premium amenities.',
            highlights: [
                '~243-369 sq ft (accessible options available)',
                'High-deck location with clear views',
                'Infinite Veranda transforms with touch of button',
                'Floor-to-ceiling windows',
                'Personalized Concierge service',
                'Embarkation Day Concierge Class Lunch',
                'Welcome bottle of sparkling wine',
                'Exclusive Destination Seminar',
                'King sized Cashmere mattress',
                'Premium bathroom products',
                'Daily delivery of delectable delights',
                'Plush bathrobes and slippers'
            ],
            price: 'Starting from $2,690/person',
            bestFor: 'travelers wanting premium service and amenities at a mid-range price'
        },
        primeConcierge: {
            name: 'Prime Concierge Class',
            icon: '🎖️',
            description: 'Premium midship location on higher decks with Infinite Veranda and full concierge service.',
            highlights: [
                '~243 sq ft with Infinite Veranda',
                'Midship to forward on higher decks',
                'Best location for less motion',
                'Floor-to-ceiling windows',
                'Personalized Concierge service',
                'Embarkation Day Concierge Class Lunch',
                'Welcome bottle of sparkling wine',
                'Exclusive Destination Seminar',
                'King sized Cashmere mattress',
                'Premium bathroom products',
                'Daily delivery of delectable delights'
            ],
            price: 'Starting from $2,740/person',
            bestFor: 'travelers wanting concierge service with the best midship location'
        },
        edgeVilla: {
            name: 'Edge Villa',
            icon: '🏡',
            description: 'Stunning two-story luxury residence - the only two-story staterooms in the fleet! Direct access to Retreat Sundeck with private plunge pool.',
            highlights: [
                '~950 sq ft - 1 bedroom, 2 bathrooms',
                'TWO-STORY luxury residence (only in fleet!)',
                'Private terrace with 3-foot-deep plunge pool',
                'Direct access to The Retreat Sundeck',
                'Floor-to-ceiling windows',
                'Marble primary bathroom with whirlpool tub',
                'Unlimited Specialty Dining Package',
                'Unlimited Premium Drink Package',
                'Two bottles of premium spirits or wine',
                'Butler service with Butler Chat',
                'Complimentary laundry and unlimited pressing',
                'Priority check-in and embarkation',
                'SEA Thermal Suite access',
                'Full Retreat privileges',
                'Up to 4 guests'
            ],
            price: 'Starting from $15,268/person',
            bestFor: 'travelers seeking unique two-story living with private plunge pool and direct sundeck access'
        },
        penthouse: {
            name: 'Penthouse Suite',
            icon: '🌆',
            description: 'Spacious two-bedroom suite with hot tub, extra-large balcony, and dining space for 8. Perfect for families or groups.',
            highlights: [
                '~1,575 sq ft - 2 bedrooms, 2 bathrooms',
                'Sleeps up to 6 guests',
                'Dining table seats 8',
                'Private whirlpool hot tub with views',
                'Extra-large balcony with seating',
                'Walk-in closet with generous storage',
                'Marble primary bathroom with dual sinks',
                'Unlimited Specialty Dining Package',
                'Unlimited Premium Drink Package',
                'Two bottles of premium spirits or wine',
                'Butler service with Butler Chat',
                'Complimentary laundry and unlimited pressing',
                'Priority check-in and embarkation',
                'SEA Thermal Suite access',
                'Full Retreat privileges'
            ],
            price: 'Starting from $18,768/person',
            bestFor: 'families or groups wanting spacious two-bedroom luxury with hot tub and full Retreat'
        },
        inside: {
            name: 'Inside Stateroom',
            icon: '🚪',
            description: 'Most affordable option - cozy stateroom with no windows. Perfect for budget travelers who spend most time exploring the ship.',
            highlights: [
                '~181 sq ft - no windows',
                'Sleeps up to 2 guests',
                'Most budget-friendly option',
                'King sized Cashmere Mattress',
                'Premium bathroom products',
                'Plentiful storage space',
                'In-room Automation',
                'Perfect for those prioritizing savings'
            ],
            price: 'Starting from $1,388/person',
            bestFor: 'extreme budget travelers who plan to spend minimal time in their room'
        },
        deluxeInside: {
            name: 'Deluxe Inside Stateroom',
            icon: '🛏️',
            description: 'Larger inside stateroom with more space but no windows. Better value for budget travelers wanting extra room.',
            highlights: [
                '~202-231 sq ft - no windows',
                'Sleeps up to 2 guests',
                '20% more space than standard inside',
                'King sized Cashmere Mattress',
                'Premium bathroom products',
                'Extra storage and living space',
                'In-room Automation',
                'Great budget option with more comfort'
            ],
            price: 'Starting from $1,438/person',
            bestFor: 'budget travelers wanting more space without paying for ocean views'
        },
        oceanView: {
            name: 'Ocean View',
            icon: '🪟',
            description: 'Budget-friendly stateroom on Deck 3 with large picture window. No balcony but great value for ocean views.',
            highlights: [
                '~200 sq ft with large window',
                'Deck 3 location',
                'No balcony but natural light and views',
                'King sized Cashmere Mattress',
                'Premium bathroom products',
                'Plentiful storage space',
                'In-room Automation',
                'Affordable ocean view option'
            ],
            price: 'Starting from $1,668/person',
            bestFor: 'budget travelers wanting natural light and ocean views without balcony cost'
        },
        primeOceanView: {
            name: 'Prime Ocean View Stateroom',
            icon: '🌊',
            description: 'Ocean view stateroom with better midship or higher deck location. No balcony but improved positioning for less motion.',
            highlights: [
                '~200 sq ft with large window',
                'Midship or higher deck location',
                'Better location for stability',
                'Natural light and ocean views',
                'King sized Cashmere Mattress',
                'Premium bathroom products',
                'Plentiful storage space',
                'In-room Automation'
            ],
            price: 'Starting from $1,768/person',
            bestFor: 'budget travelers wanting better location with ocean views but no balcony'
        },
        deluxeOceanView: {
            name: 'Deluxe Ocean View',
            icon: '🌅',
            description: 'Spacious ocean view with large forward-facing window and central location. No balcony but much more space than standard.',
            highlights: [
                '~238-348 sq ft with large forward window',
                'Central ship location',
                'Up to 70% more space than standard',
                'Forward-facing panoramic views',
                'King sized Cashmere Mattress',
                'Premium bathroom products',
                'Extra living and storage space',
                'In-room Automation'
            ],
            price: 'Starting from $1,968/person',
            bestFor: 'travelers wanting spacious room with views but willing to skip balcony for value'
        },
        panoramicOceanView: {
            name: 'Panoramic Ocean View',
            icon: '🖼️',
            description: 'Floor-to-ceiling glass window offering dramatic ocean views. No balcony but stunning panoramic vistas from inside.',
            highlights: [
                '~212 sq ft with floor-to-ceiling glass',
                'Panoramic ocean views',
                'Natural light floods the room',
                'Modern design with expansive windows',
                'King sized Cashmere Mattress',
                'Premium bathroom products',
                'Plentiful storage space',
                'In-room Automation'
            ],
            price: 'Starting from $2,168/person',
            bestFor: 'travelers wanting dramatic floor-to-ceiling views without paying for balcony access'
        }
    };

    const royalIconRooms = {
        iconInteriorPlus: {
            name: 'Interior Plus (Icon Class)',
            icon: '🧭',
            description: 'Stylish interior hideaway tucked near Surfside with clever storage and soothing lighting cues.',
            highlights: [
                '~187 sq ft interior layout',
                'Illuminated art wall mimics daylight',
                'USB-C and wireless charging stations',
                'Surfside neighborhood access in minutes',
                'Royal Caribbean signature bedding',
                'Perfect recharge zone between adventures'
            ],
            price: 'Starting from $1,199/person',
            bestFor: 'value-focused duos that just need a comfy crash pad between thrills'
        },
        iconSpaciousInterior: {
            name: 'Spacious Interior',
            icon: '🛋️',
            description: 'Interior room with extra lounge seating and split bathroom design for easy mornings.',
            highlights: [
                '~260 sq ft interior footprint',
                'Split bathroom with separate shower zone',
                'Sleeps up to 4 with Pullman or sofa bed',
                'Walk-in closet-inspired storage wall',
                'Streaming-ready smart TV',
                'Closest to Chill Island elevators'
            ],
            price: 'Starting from $1,349/person',
            bestFor: 'small crews that want space without paying for windows'
        },
        iconOceanView: {
            name: 'Ocean View Stateroom',
            icon: '🌊',
            description: 'Oversized picture window keeps the Caribbean blues in view while you relax indoors.',
            highlights: [
                '~258 sq ft with oversized window',
                'Forward & midship vantage points',
                'Plush sofa converts for 3rd guest',
                'Smart storage over the bed',
                'Spa-inspired shower with glass door',
                'In-room automation via Royal app'
            ],
            price: 'Starting from $1,499/person',
            bestFor: 'guests who crave natural light but still want sharp value'
        },
        iconPanoramicOceanView: {
            name: 'Panoramic Ocean View',
            icon: '🪟',
            description: 'Wrapped-in-glass views from the AquaDome perch, perfect for sunrise coffee sessions.',
            highlights: [
                '~260 sq ft with curved floor-to-ceiling glass',
                'AquaDome neighborhood vantage',
                'Chaise lounge positioned by the window',
                'Motorized blackout shades',
                'Easy access to Overlook pods',
                'Cinematic wake and bow perspectives'
            ],
            price: 'Starting from $1,699/person',
            bestFor: 'view seekers who prefer climate-controlled comfort over balconies'
        },
        iconFamilyOceanView: {
            name: 'Family Ocean View',
            icon: '👨‍👩‍👧',
            description: 'Extra-wide window alcove and Surfside adjacency keep little cruisers happy.',
            highlights: [
                '~280 sq ft with family alcove',
                'Bunk beds kids can call their own',
                'Split bathroom for smoother routines',
                'Surfside splash pad right outside',
                'Royal Caribbean plush bedding',
                'Sleeps up to 5 guests'
            ],
            price: 'Starting from $1,799/person',
            bestFor: 'families needing daylight plus Surfside convenience'
        },
        iconAquadomePanoramic: {
            name: 'AquaDome Panoramic Suite',
            icon: '🌅',
            description: 'Glass-wrapped living room perched inside the AquaDome with 180° ocean drama.',
            highlights: [
                '~280 sq ft open concept',
                'Floor-to-ceiling windows wrapping the bow',
                'Cozy daybed under the glass',
                'Preferred seating for AquaDome shows',
                'Upgraded bathroom amenities',
                'Perfect sunrise + sunset vantage'
            ],
            price: 'Starting from $2,099/person',
            bestFor: 'travelers who want the wow-factor window wall without stepping outside'
        },
        iconSurfsideBalcony: {
            name: 'Surfside Neighborhood Balcony',
            icon: '🎠',
            description: 'Balcony overlooking the playful Surfside carousel and splash zone.',
            highlights: [
                '~260 sq ft incl. 55 sq ft balcony',
                'Direct view of Surfside carousel',
                'Sliding doors with acoustic glass',
                'Family-friendly storage',
                'Perfect for keeping tabs on little adventurers',
                'Royal Caribbean signature service'
            ],
            price: 'Starting from $1,999/person',
            bestFor: 'families who want balcony time plus Surfside energy'
        },
        iconInfiniteCentralParkView: {
            name: 'Infinite Central Park View Balcony',
            icon: '🌿',
            description: 'Innovative drop-down window opens Central Park sights and live music to your space.',
            highlights: [
                '~250 sq ft with Infinite balcony tech',
                'View the lush Central Park neighborhood',
                'Control fresh air with the touch of a button',
                'Indoor/outdoor lounge convertible',
                'Hear live musicians from your retreat',
                'Closest cabins to specialty dining walkways'
            ],
            price: 'Starting from $2,099/person',
            bestFor: 'travelers intrigued by Icon’s techy Infinite balcony vibe'
        },
        iconOceanViewBalcony: {
            name: 'Ocean View Balcony',
            icon: '⚓',
            description: 'Classic balcony facing the open sea with flexible seating and high-deck breeze.',
            highlights: [
                '~270 sq ft incl. balcony',
                'Seating for two outside',
                'Upgraded sound insulation',
                'Royal Caribbean app automation',
                'Choice of Surfside or Chill Island proximity',
                'King bed converts to twins'
            ],
            price: 'Starting from $2,199/person',
            bestFor: 'guests who want that quintessential balcony breakfast moment'
        },
        iconInfiniteOceanViewBalcony: {
            name: 'Infinite Ocean View Balcony',
            icon: '🪟',
            description: 'Edge-like Infinite veranda pointed straight toward the sea for seamless indoor/outdoor living.',
            highlights: [
                '~280 sq ft with climate-friendly Infinite design',
                'Push-button window transforms room into balcony',
                'Lounge chairs tucked into the frame',
                'Brilliant for sail-away parties',
                'Higher deck locations for better vistas',
                'Split closet keeps things organized'
            ],
            price: 'Starting from $2,349/person',
            bestFor: 'tech-curious cruisers wanting the newest balcony style at sea'
        },
        iconSunsetCornerBalcony: {
            name: 'Sunset Corner Balcony',
            icon: '🌇',
            description: 'Aft-corner wrap balcony where the wake view never ends.',
            highlights: [
                '~320 sq ft incl. wrap balcony',
                'Wake-view loungers plus dining set',
                'Sought-after end-of-hallway privacy',
                'Perfect for golden-hour photo shoots',
                'Priority for sunset lovers',
                'Can connect to adjacent balcony for groups'
            ],
            price: 'Starting from $2,749/person',
            bestFor: 'wake-view fanatics that refuse to miss a sunset'
        },
        iconThermalSuiteBalcony: {
            name: 'Thermal Suite Balcony',
            icon: '🧖',
            description: 'Balcony cabin bundled with Vitality Spa thermal suite passes for two.',
            highlights: [
                '~280 sq ft with balcony',
                'Includes weeklong Vitality Spa thermal access',
                'Proximity to AquaDome serenity zones',
                'Upgraded bedding and bathrobes',
                'Spa concierge check-in perks',
                'Fresh juice delivery each morning'
            ],
            price: 'Starting from $2,549/person',
            bestFor: 'wellness-focused couples who want spa perks without suite pricing'
        },
        iconPrimeThermalSuite: {
            name: 'Prime Thermal Suite Balcony',
            icon: '💆',
            description: 'All the Vitality perks plus a calmer midship perch and sweeping views.',
            highlights: [
                '~300 sq ft midship balcony',
                'Thermal suite access + priority treatment booking',
                'Higher deck + calmer ride',
                'Expanded sitting area for morning yoga',
                'Wellness minibar with infused waters',
                'Dedicated spa concierge text line'
            ],
            price: 'Starting from $2,799/person',
            bestFor: 'yoga mats + ocean breeze kind of guests'
        },
        iconSkyJuniorSuite: {
            name: 'Sky Junior Suite',
            icon: '☁️',
            description: 'Junior suite perched near the AquaDome with Retreat-level Coastal Kitchen access.',
            highlights: [
                '~322 sq ft + 80 sq ft balcony',
                'Access to Coastal Kitchen dining',
                'Larger bathroom with double vanity',
                'Suite lounge concierge assistance',
                'Luxury pillow menu + robes',
                'Sleeps up to 4 guests'
            ],
            price: 'Starting from $3,599/person',
            bestFor: 'wellness-minded cruisers wanting suite perks in a studio footprint'
        },
        iconSurfsideFamilySuite: {
            name: 'Surfside Family Suite',
            icon: '🏄',
            description: 'Two sleeping zones plus Surfside balcony let families spread out with endless splash access.',
            highlights: [
                '~425 sq ft split layout',
                'Kids alcove with bunk beds + privacy curtain',
                'Surfside balcony for people watching',
                'Royal Suite Class host service',
                'Access to Surfside Eatery & Pier 7 breakfast',
                'Sleeps up to 5 comfortably'
            ],
            price: 'Starting from $4,099/person',
            bestFor: 'families that live at Surfside but want suite-level pampering'
        },
        iconSunsetJuniorSuite: {
            name: 'Sunset Junior Suite',
            icon: '🌠',
            description: 'Aft-facing junior suite framed by huge windows and panoramic balcony.',
            highlights: [
                '~322 sq ft interior + 108 sq ft balcony',
                'Wraparound glass for endless wake views',
                'Dedicated seating + dining nook',
                'Coastal Kitchen access',
                'Suite-only sun deck privileges',
                'Perfect romantic hideaway'
            ],
            price: 'Starting from $4,499/person',
            bestFor: 'couples chasing Icon-class wake views with suite perks'
        },
        iconPanoramicCornerSuite: {
            name: 'Panoramic Corner Suite',
            icon: '🌀',
            description: 'Corner layout stretches from bow to wake with glass everywhere.',
            highlights: [
                '~440 sq ft interior + oversized balcony',
                'Floor-to-ceiling windows on two sides',
                'Freestanding soaking tub with a view',
                'Royal Suite Class host service',
                'Coastal Kitchen + suite sun deck access',
                'Priority show and thrill ride reservations'
            ],
            price: 'Starting from $5,199/person',
            bestFor: 'design lovers who want Icon’s sweeping glass corners'
        },
        iconGrandSuite: {
            name: 'Grand Suite',
            icon: '🏆',
            description: 'One-bedroom suite with dining table and massive balcony for entertaining.',
            highlights: [
                '~431 sq ft + 108 sq ft balcony',
                'Separate bedroom with privacy door',
                'Lavish bath with rain shower',
                'Royal Suite Class host + concierge',
                'Unlimited VOOM Surf + Stream',
                'Coastal Kitchen + Suite Sun Deck access'
            ],
            price: 'Starting from $6,299/person',
            bestFor: 'couples or small families wanting dedicated living + dining space'
        },
        iconIconLoftSuite: {
            name: 'Icon Loft Suite',
            icon: '🪜',
            description: 'Two-story loft with towering windows overlooking the ocean.',
            highlights: [
                '~838 sq ft on two levels',
                'Double-height glass wall facing the sea',
                'Upstairs master + downstairs living area',
                'Royal Genie service',
                'Unlimited specialty dining + premium drinks',
                'Sleeps up to 4 guests'
            ],
            price: 'Starting from $10,999/person',
            bestFor: 'suite connoisseurs craving Icon’s lofted wow-factor'
        },
        iconNeighborhoodBalconyPartial: {
            name: 'Central Park Balcony (Partial)',
            icon: '🌺',
            description: 'Balcony overlooking Central Park foliage with structural peek-a-boo views.',
            highlights: [
                '~270 sq ft incl. balcony',
                'Living plant walls right outside',
                'Partial structural view keeps rate low',
                'Evening live music soundtrack',
                'Priority for specialty dining reservations',
                'Perfect compromise between price and perks'
            ],
            price: 'Starting from $1,949/person',
            bestFor: 'value hunters wanting concierge touches with a living-garden backdrop'
        },
        iconNeighborhoodBalcony: {
            name: 'Central Park Balcony',
            icon: '🎻',
            description: 'Leafy views, concierge help, and private Central Park ambiance.',
            highlights: [
                '~270 sq ft with balcony seating',
                'Complimentary dining consultation',
                'Welcome sparkling wine',
                'Daily tapas delivery',
                'Priority entertainment reservations',
                'Closer to Trellis Bar + Chops Grille'
            ],
            price: 'Starting from $2,149/person',
            bestFor: 'travelers who want personal touches without suite rates'
        },
        iconNeighborhoodBalconyPrime: {
            name: 'Central Park Balcony Prime',
            icon: '🏅',
            description: 'Best-of-the-best Central Park perch with elevated concierge focus.',
            highlights: [
                '~270 sq ft prime midship location',
                'Personalized pre-cruise planning call',
                'Higher deck vantage over the park',
                'Daily petit fours delivery',
                'Early access to dining + thrill reservations',
                'Nightly turndown surprises'
            ],
            price: 'Starting from $2,299/person',
            bestFor: 'guests craving concierge access plus lush views and quiet nights'
        },
        iconSurfsideTownhouse: {
            name: 'Surfside Family Townhouse',
            icon: '🏘️',
            description: 'Multi-level hideaway with slide to Surfside and private whirlpool.',
            highlights: [
                '~700 sq ft over two stories',
                'Private patio with whirlpool + daybed',
                'Slide right into Surfside fun',
                'Royal Genie orchestrates every detail',
                'Dedicated family media room',
                'Sleeps up to 6 guests'
            ],
            price: 'Starting from $12,499/person',
            bestFor: 'families wanting the splashiest digs in Surfside'
        },
        iconUltimateFamilyTownhouse: {
            name: 'Ultimate Family Townhouse',
            icon: '🎢',
            description: 'Three-level palace with slide, cinema, and backyard dedicated to play.',
            highlights: [
                '~1,772 sq ft across three decks',
                'In-suite cinema + karaoke stage',
                'Private outdoor space with ping pong + jacuzzi',
                'Direct Surfside access via white-picket gate',
                'Royal Genie crafts once-in-a-lifetime moments',
                'Sleeps up to 8 guests'
            ],
            price: 'Starting from $24,999/person',
            bestFor: 'multi-gen families wanting the most talked-about suite at sea'
        },
        iconRoyalLoftSuite: {
            name: 'Royal Loft Suite',
            icon: '👑',
            description: 'Icon’s crown jewel with piano, two levels of glass, and a sprawling terrace.',
            highlights: [
                '~2,090 sq ft of indoor/outdoor living',
                'Two stories with sweeping staircase',
                'Baby grand piano + bar',
                'Private whirlpool overlooking the wake',
                'Royal Genie + Royal Suite Class perks',
                'Unlimited specialty dining + premium drinks'
            ],
            price: 'Starting from $32,999/person',
            bestFor: 'travelers writing the ultimate Icon-class bucket list story'
        }
    };

    const roomCatalogs = {
        celebrityEdge: {
            label: 'Celebrity Edge-Class',
            badgeEmoji: '✨',
            heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
            experienceCopy: 'Edge-class ships deliver resort-chic calm, Infinite Veranda innovation, and The Retreat pampering.',
            rooms: edgeRooms
        },
        royalIcon: {
            label: 'Royal Caribbean Icon-Class',
            badgeEmoji: '🌊',
            heroImage: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
            experienceCopy: 'Icon-class introduces high-energy neighborhoods, Surfside family hangouts, and next-gen thrills.',
            rooms: royalIconRooms
        }
    };

    const defaultCatalogKey = 'celebrityEdge';
    const cruiseLineCatalogMap = {
        'Celebrity Cruises': 'celebrityEdge',
        'Royal Caribbean': 'royalIcon'
    };

    const roomKeyMapping = {
        celebrityEdge: Object.keys(edgeRooms).reduce((map, key) => {
            map[key] = key;
            return map;
        }, {}),
        royalIcon: {
            inside: 'iconInteriorPlus',
            deluxeInside: 'iconSpaciousInterior',
            oceanView: 'iconOceanView',
            primeOceanView: 'iconPanoramicOceanView',
            deluxeOceanView: 'iconFamilyOceanView',
            panoramicOceanView: 'iconAquadomePanoramic',
            deluxePorthole: 'iconSurfsideBalcony',
            edgeInfinitePartial: 'iconInfiniteCentralParkView',
            edgeInfinite: 'iconOceanViewBalcony',
            primeEdgeInfinite: 'iconInfiniteOceanViewBalcony',
            sunsetVeranda: 'iconSunsetCornerBalcony',
            aquaclass: 'iconThermalSuiteBalcony',
            primeAquaclass: 'iconPrimeThermalSuite',
            aquaSky: 'iconSkyJuniorSuite',
            magicCarpet: 'iconSurfsideFamilySuite',
            skySuite: 'iconSunsetJuniorSuite',
            sunsetSky: 'iconPanoramicCornerSuite',
            celebrity: 'iconGrandSuite',
            royal: 'iconIconLoftSuite',
            conciergePartial: 'iconNeighborhoodBalconyPartial',
            concierge: 'iconNeighborhoodBalcony',
            primeConcierge: 'iconNeighborhoodBalconyPrime',
            edgeVilla: 'iconSurfsideTownhouse',
            penthouse: 'iconUltimateFamilyTownhouse',
            iconic: 'iconRoyalLoftSuite'
        }
    };

    // Quiz Elements
    const allQuestions = Array.from(document.querySelectorAll('.question'));
    let visibleQuestions = [];
    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');
    const resultContent = document.getElementById('result-content');
    const restartBtn = document.getElementById('restart-quiz');
    const backBtn = document.getElementById('back-btn');
    const shipDetectionResult = document.getElementById('ship-detection-result');
    const shareTools = document.getElementById('share-tools');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const shareLinkInput = document.getElementById('share-link');
    const copyShareLinkBtn = document.getElementById('copy-share-link');
    const inviteForm = document.getElementById('invite-form');
    const inviteEmailInput = document.getElementById('invite-email');
    const inviteFeedback = document.getElementById('invite-feedback');
    const authStatus = document.getElementById('auth-status');
    const authModal = document.getElementById('auth-modal');
    const authModalTitle = document.getElementById('auth-modal-title');
    const authModalMessage = document.getElementById('auth-modal-message');
    const authModalConfirm = document.getElementById('auth-modal-confirm');
    const authModalClose = document.getElementById('auth-modal-close');
    const authModalLoginLink = document.getElementById('auth-modal-login-link');
    const viewRoomDetailsBtn = document.getElementById('view-room-details');
    const comparisonSection = document.getElementById('compare');
    const comparisonTabs = document.querySelectorAll('.comparison-tab');
    const comparisonPanelsWrapper = document.querySelector('.comparison-panels');
    const comparisonPanels = document.querySelectorAll('.comparison-panel');
    const comparisonModeToggle = document.querySelector('.comparison-mode-toggle');
    const comparisonModeButtons = comparisonModeToggle ? comparisonModeToggle.querySelectorAll('[data-mode]') : [];
    const comparisonDigest = document.getElementById('comparison-digest');
    const roomDirectoryContainers = document.querySelectorAll('[data-room-directory]');
    const digestCtas = document.querySelectorAll('.digest-cta');
    const celebrityHierarchySection = document.getElementById('celebrity-hierarchy');

    let isAuthenticated = false;
    let pendingAuthMode = 'login';
    let activeComparisonCatalog = 'celebrityEdge';
    let lastRecommendationMeta = null;
    let roomRowHighlightTimeout = null;
    let comparisonViewMode = 'matrix';

    function getActiveCatalogKey() {
        const bookedLine = userTripDetails.bookedCruiseLine;
        if (bookedLine && cruiseLineCatalogMap[bookedLine]) {
            return cruiseLineCatalogMap[bookedLine];
        }

        const detectedShip = (userTripDetails.detectedShip || '').toLowerCase();
        if (detectedShip.includes('icon')) {
            return 'royalIcon';
        }

        if (Array.isArray(userTripDetails.priorCruiseLines) && userTripDetails.priorCruiseLines.includes('Royal Caribbean')) {
            return 'royalIcon';
        }

        return defaultCatalogKey;
    }

    function resolveRoomKeyForCatalog(baseKey, catalogKey) {
        const mapping = roomKeyMapping[catalogKey] || {};
        return mapping[baseKey] || baseKey;
    }

    function toggleCelebrityHierarchy(shouldShow = false) {
        if (!celebrityHierarchySection) return;
        celebrityHierarchySection.classList.toggle('hidden', !shouldShow);
        celebrityHierarchySection.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    }

    function getRoomRecommendation(baseKey) {
        const catalogKey = getActiveCatalogKey();
        const resolvedKey = resolveRoomKeyForCatalog(baseKey, catalogKey);
        const catalog = roomCatalogs[catalogKey] || roomCatalogs[defaultCatalogKey];
        const room = catalog.rooms[resolvedKey];

        if (room) {
            return { room, catalogKey, resolvedKey };
        }

        const fallbackCatalog = roomCatalogs[defaultCatalogKey];
        return {
            room: fallbackCatalog.rooms[baseKey] || Object.values(fallbackCatalog.rooms)[0],
            catalogKey: defaultCatalogKey,
            resolvedKey: baseKey
        };
    }

    function setupComparisonTabs() {
        if (!comparisonTabs.length) return;

        comparisonTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetCatalog = tab.dataset.catalog;
                activateComparisonTab(targetCatalog);
            });
        });

        activateComparisonTab(activeComparisonCatalog);
    }

    function setupComparisonViewControls() {
        if (comparisonModeButtons.length) {
            comparisonModeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetMode = button.dataset.mode || 'digest';
                    setComparisonViewMode(targetMode);
                });
            });
        }

        if (digestCtas.length) {
            digestCtas.forEach(cta => {
                cta.addEventListener('click', () => {
                    setComparisonViewMode('matrix', { skipScroll: true });
                    const targetCatalog = cta.dataset.targetCatalog;
                    if (targetCatalog) {
                        activateComparisonTab(targetCatalog);
                    }
                    if (comparisonSection) {
                        comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
        }

        setComparisonViewMode('digest', { skipScroll: true });
    }

    function activateComparisonTab(catalogKey = defaultCatalogKey) {
        if (!catalogKey) return;
        activeComparisonCatalog = catalogKey;

        comparisonTabs.forEach(tab => {
            const isActive = tab.dataset.catalog === catalogKey;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        comparisonPanels.forEach(panel => {
            const isActive = panel.dataset.catalog === catalogKey;
            panel.classList.toggle('active', isActive);
            panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        });
    }

    function setComparisonViewMode(mode = 'digest', options = {}) {
        if (!comparisonPanelsWrapper || !comparisonDigest) return;
        const safeMode = mode === 'matrix' ? 'matrix' : 'digest';
        const { skipScroll = true } = options;
        comparisonViewMode = safeMode;

        const showDigest = safeMode === 'digest';
        comparisonDigest.classList.toggle('hidden', !showDigest);
        comparisonPanelsWrapper.classList.toggle('hidden', showDigest);

        if (comparisonModeButtons.length) {
            comparisonModeButtons.forEach(button => {
                const isActive = button.dataset.mode === safeMode;
                button.classList.toggle('active', isActive);
                button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
        }

        if (!skipScroll && comparisonSection) {
            comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function populateRoomDirectories() {
        if (!roomDirectoryContainers.length) return;

        roomDirectoryContainers.forEach(container => {
            const catalogKey = container.dataset.catalog;
            const catalog = roomCatalogs[catalogKey];
            if (!catalog) {
                container.innerHTML = '<p class="room-directory-loading">Room data unavailable.</p>';
                return;
            }

            const fragment = document.createDocumentFragment();
            Object.entries(catalog.rooms).forEach(([roomKey, room]) => {
                const row = document.createElement('article');
                row.className = 'room-row';
                row.dataset.roomKey = roomKey;

                const primaryHighlight = Array.isArray(room.highlights) ? room.highlights[0] : '';
                row.innerHTML = `
                    <div class="room-row__title">
                        <span class="room-row__icon">${room.icon || '🛏️'}</span>
                        <div>
                            <h4>${room.name}</h4>
                            <p>${room.bestFor || ''}</p>
                        </div>
                    </div>
                    <div class="room-row__meta">
                        ${room.price ? `<span class="room-row__price">${room.price}</span>` : ''}
                        ${primaryHighlight ? `<span class="room-row__detail">${primaryHighlight}</span>` : ''}
                    </div>
                `;

                fragment.appendChild(row);
            });

            container.innerHTML = '';
            container.appendChild(fragment);
        });
    }

    function handleViewRoomDetails() {
        if (!lastRecommendationMeta) {
            if (comparisonSection) {
                setComparisonViewMode('matrix', { skipScroll: true });
                comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }

        const { catalogKey, resolvedKey } = lastRecommendationMeta;
        setComparisonViewMode('matrix', { skipScroll: true });
        activateComparisonTab(catalogKey);
        if (comparisonSection) {
            comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        requestAnimationFrame(() => {
            highlightRoomRow(catalogKey, resolvedKey);
        });
    }

    function highlightRoomRow(catalogKey, roomKey) {
        if (!catalogKey || !roomKey) return;
        const activePanel = Array.from(comparisonPanels).find(panel => panel.dataset.catalog === catalogKey);
        if (!activePanel) return;

        const rows = activePanel.querySelectorAll('.room-row');
        rows.forEach(row => row.classList.remove('room-row--highlight'));

        const targetRow = activePanel.querySelector(`.room-row[data-room-key="${roomKey}"]`);
        if (!targetRow) return;

        targetRow.classList.add('room-row--highlight');
        targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (roomRowHighlightTimeout) {
            clearTimeout(roomRowHighlightTimeout);
        }
        roomRowHighlightTimeout = setTimeout(() => {
            targetRow.classList.remove('room-row--highlight');
        }, 4000);
    }

    function setupCollaborationCtas() {
        if (loginBtn) {
            loginBtn.addEventListener('click', () => handleAuthRequest('login'));
        }
        if (signupBtn) {
            signupBtn.addEventListener('click', () => handleAuthRequest('signup'));
        }
        if (copyShareLinkBtn) {
            copyShareLinkBtn.addEventListener('click', copyShareLink);
        }
        if (inviteForm) {
            inviteForm.addEventListener('submit', handleInviteSubmit);
        }
        if (authModalConfirm) {
            authModalConfirm.addEventListener('click', completeAuthFlow);
        }
        if (authModalClose) {
            authModalClose.addEventListener('click', closeAuthModal);
        }
        if (authModal) {
            authModal.addEventListener('click', (event) => {
                if (event.target === authModal) {
                    closeAuthModal();
                }
            });
        }
    }

    function handleAuthRequest(mode = 'login') {
        pendingAuthMode = mode;
        if (authModal) {
            openAuthModal(mode);
            return;
        }

        window.location.href = '/login';
    }

    function openAuthModal(mode) {
        const isLogin = mode === 'login';
        if (authModalTitle) {
            authModalTitle.textContent = isLogin
                ? 'Log in to share your match'
                : 'Sign up to share your match';
        }
        if (authModalMessage) {
            authModalMessage.textContent = isLogin
                ? 'Sign in to unlock shareable links and invite your travel companions.'
                : 'Create a free profile to send invites and compare results with your crew.';
        }
        if (authModalLoginLink) {
            authModalLoginLink.textContent = isLogin ? 'Use classic login page' : 'Prefer the signup page?';
            authModalLoginLink.href = isLogin ? '/login' : '/signup';
        }

        authModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeAuthModal() {
        if (!authModal) return;
        authModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function completeAuthFlow() {
        isAuthenticated = true;
        updateShareTools();
        if (authStatus) {
            authStatus.textContent = pendingAuthMode === 'signup'
                ? 'Welcome aboard! Sharing tools are now unlocked.'
                : 'Sharing unlocked! Send your link or invite your crew.';
        }
        closeAuthModal();
    }

    function copyShareLink() {
        if (!isAuthenticated) {
            handleAuthRequest('login');
            return;
        }
        if (!shareLinkInput) return;

        const linkValue = shareLinkInput.value;
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(linkValue).then(() => {
                if (inviteFeedback) {
                    inviteFeedback.textContent = 'Copied! Share it with your fellow travelers.';
                }
            }).catch(() => {
                fallbackCopy(linkValue);
            });
        } else {
            fallbackCopy(linkValue);
        }
    }

    function fallbackCopy(text) {
        if (!shareLinkInput) return;
        shareLinkInput.select();
        document.execCommand('copy');
        if (inviteFeedback) {
            inviteFeedback.textContent = 'Copied! Share it with your fellow travelers.';
        }
    }

    function handleInviteSubmit(event) {
        event.preventDefault();
        if (!isAuthenticated) {
            handleAuthRequest('signup');
            return;
        }

        const email = inviteEmailInput ? inviteEmailInput.value.trim() : '';
        if (!email) {
            if (inviteFeedback) {
                inviteFeedback.textContent = 'Please enter an email address to send an invite.';
            }
            return;
        }

        if (inviteFeedback) {
            inviteFeedback.textContent = `Invite sent to ${email}!`;
        }
        inviteEmailInput.value = '';
    }

    function updateShareTools(roomKey) {
        if (!shareLinkInput) return;
        const shareLink = generateShareLink(roomKey);
        shareLinkInput.value = shareLink;

        if (isAuthenticated) {
            shareTools && shareTools.classList.remove('hidden');
        } else {
            shareTools && shareTools.classList.add('hidden');
            if (authStatus) {
                authStatus.textContent = 'Log in or sign up to unlock sharing tools.';
            }
        }
    }

    function generateShareLink(roomKey) {
        const shareUrl = new URL(window.location.href);
        shareUrl.hash = 'quiz-result';
        if (roomKey) {
            shareUrl.searchParams.set('match', roomKey);
        }
        return shareUrl.toString();
    }

    // Initialize Quiz
    initializeQuiz();

    function initializeQuiz() {
        // Add click handlers to all option buttons
        const optionButtons = document.querySelectorAll('.option');
        optionButtons.forEach(button => {
            button.addEventListener('click', handleAnswer);
        });

        // Restart button
        restartBtn.addEventListener('click', restartQuiz);

        // Back button
        backBtn.addEventListener('click', previousQuestion);

        setupCollaborationCtas();

        updateVisibleQuestions();
        showQuestion(0);
        setupShipDetection();
        setupComparisonTabs();
        setupComparisonViewControls();
        populateRoomDirectories();
        if (viewRoomDetailsBtn) {
            viewRoomDetailsBtn.addEventListener('click', handleViewRoomDetails);
        }

        // Hide back button on first question
        updateBackButton();
    }

    function updateVisibleQuestions() {
        visibleQuestions = allQuestions.filter((question, index) => {
            if (question.dataset.question === '1') {
                return true;
            }

            const path = question.dataset.path || 'both';
            if (!bookingStatus) {
                return false;
            }

            if (path === 'booked') {
                return bookingStatus === 'booked';
            }

            if (path === 'not-booked') {
                return bookingStatus === 'not-booked';
            }

            return true;
        });

        if (visibleQuestions.length === 0 && allQuestions.length > 0) {
            visibleQuestions = [allQuestions[0]];
        }

        totalQuestions = visibleQuestions.length;
    }

    function showQuestion(index) {
        allQuestions.forEach(question => question.classList.remove('active'));
        const nextQuestionElement = visibleQuestions[index];
        if (nextQuestionElement) {
            nextQuestionElement.classList.add('active');
        }
        currentQuestionIndex = index;
        updateBackButton();
    }

    function getCurrentQuestionElement() {
        return visibleQuestions[currentQuestionIndex];
    }

    function getFieldValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }

    function setupShipDetection() {
        const bookedInputIds = [
            'booked-cruise-line',
            'booked-destination',
            'booked-start-date',
            'booked-end-date'
        ];

        bookedInputIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', updateShipDetectionDisplay);
            }
        });
    }

    function updateShipDetectionDisplay() {
        if (!shipDetectionResult) return;

        const cruiseLine = getFieldValue('booked-cruise-line');
        const destination = getFieldValue('booked-destination');

        if (!cruiseLine && !destination) {
            shipDetectionResult.textContent = 'Provide details to auto-detect your ship.';
            userTripDetails.detectedShip = '';
            return;
        }

        const shipName = detectShip(cruiseLine, destination);
        userTripDetails.detectedShip = shipName;
        shipDetectionResult.textContent = shipName
            ? `Likely ship: ${shipName}`
            : 'Provide details to auto-detect your ship.';
    }

    function detectShip(cruiseLine, destination) {
        if (!cruiseLine) return '';

        const destinationLower = (destination || '').toLowerCase();

        if (cruiseLine === 'Celebrity Cruises') {
            if (destinationLower.includes('caribbean') || destinationLower.includes('bahamas')) {
                return 'Celebrity Edge';
            }
            if (destinationLower.includes('mediterranean') || destinationLower.includes('europe')) {
                return 'Celebrity Ascent';
            }
            if (destinationLower.includes('alaska')) {
                return 'Celebrity Edge (Alaska season)';
            }
            return 'Celebrity Apex';
        }

        if (cruiseLine === 'Royal Caribbean') {
            if (destinationLower.includes('perfect day') || destinationLower.includes('coco cay') || destinationLower.includes('miami') || destinationLower.includes('icon')) {
                return 'Icon of the Seas';
            }
            return 'Wonder of the Seas';
        }

        if (cruiseLine === 'Norwegian Cruise Line') {
            return 'Norwegian Prima';
        }

        if (cruiseLine === 'Princess Cruises') {
            return 'Discovery Princess';
        }

        if (cruiseLine === 'Virgin Voyages') {
            return 'Scarlet Lady';
        }

        return `${cruiseLine} flagship`;
    }

    function handleAnswer(e) {
        const button = e.currentTarget;
        const pointsAttr = button.getAttribute('data-points') || '{}';
        let points = {};
        try {
            points = JSON.parse(pointsAttr);
        } catch (err) {
            points = {};
        }
        const questionElement = getCurrentQuestionElement();
        const questionNumber = (questionElement && questionElement.dataset && questionElement.dataset.question)
            ? questionElement.dataset.question
            : (currentQuestionIndex + 1);
        const answerText = button.textContent.trim();
        const action = button.dataset.action;
        let shouldAdvance = true;

        switch (action) {
            case 'set-booking-status': {
                const value = button.dataset.value;
                if (!value) {
                    shouldAdvance = false;
                    break;
                }
                bookingStatus = value;
                userTripDetails.bookingStatus = value;
                updateVisibleQuestions();
                showQuestion(currentQuestionIndex);
                break;
            }
            case 'save-booked-info': {
                const cruiseLine = getFieldValue('booked-cruise-line') || '';
                const destination = getFieldValue('booked-destination').trim() || '';
                const startDate = getFieldValue('booked-start-date') || '';
                const endDate = getFieldValue('booked-end-date') || '';

                if (!cruiseLine || !destination || !startDate || !endDate) {
                    alert('Please complete all cruise details before continuing.');
                    shouldAdvance = false;
                    break;
                }

                userTripDetails.bookedCruiseLine = cruiseLine;
                userTripDetails.bookedDestination = destination;
                userTripDetails.bookedStartDate = startDate;
                userTripDetails.bookedEndDate = endDate;
                updateShipDetectionDisplay();
                break;
            }
            case 'save-intended-trip': {
                const destination = getFieldValue('intended-destination').trim() || '';
                const month = getFieldValue('intended-month') || '';
                if (!destination || !month) {
                    alert('Please add a destination and month for your future cruise.');
                    shouldAdvance = false;
                    break;
                }
                userTripDetails.intendedDestination = destination;
                userTripDetails.intendedMonth = month;
                break;
            }
            case 'save-history': {
                const historyCount = getFieldValue('cruise-history-count');
                if (historyCount === '' || historyCount === null || historyCount === undefined) {
                    alert('Let us know how many cruises you have taken.');
                    shouldAdvance = false;
                    break;
                }
                userTripDetails.cruiseHistoryCount = historyCount;
                break;
            }
            case 'save-prior-lines': {
                const selectedLines = Array.from(document.querySelectorAll('input[name="prior-lines"]:checked')).map(cb => cb.value);
                userTripDetails.priorCruiseLines = selectedLines;
                break;
            }
            case 'record-planning-budget': {
                const budget = getFieldValue('planning-budget') || '';
                if (!budget) {
                    alert('Please choose a budget range to continue.');
                    shouldAdvance = false;
                    break;
                }
                userTripDetails.planningBudget = budget;
                break;
            }
            default:
                break;
        }

        if (!shouldAdvance) {
            return;
        }

        // Track quiz answer with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quiz_answer', {
                question_number: Number(questionNumber),
                answer: answerText,
                points_awarded: JSON.stringify(points)
            });
        }

        // Save answer to history
        answerHistory.push({
            points: points
        });

        // Add points to scores
        for (const [key, value] of Object.entries(points)) {
            scores[key] += value;
        }

        // Visual feedback
        button.style.background = '#28a745';
        button.style.color = 'white';
        button.style.transform = 'scale(1.05)';

        // Move to next question or show results
        setTimeout(() => {
            nextQuestion();
        }, 300);
    }

    function nextQuestion() {
        if (currentQuestionIndex >= totalQuestions - 1) {
            showResults();
            return;
        }

        showQuestion(currentQuestionIndex + 1);
    }

    function previousQuestion() {
        if (currentQuestionIndex <= 0) return;

        const currentElement = getCurrentQuestionElement();
        const previousElement = visibleQuestions[currentQuestionIndex - 1];
        const fromQuestion = (currentElement && currentElement.dataset && currentElement.dataset.question)
            ? currentElement.dataset.question
            : (currentQuestionIndex + 1);
        const toQuestion = (previousElement && previousElement.dataset && previousElement.dataset.question)
            ? previousElement.dataset.question
            : currentQuestionIndex;

        // Track back button usage
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quiz_back_button', {
                from_question: Number(fromQuestion),
                to_question: Number(toQuestion)
            });
        }

        // Get the last answer from history
        const lastAnswer = answerHistory.pop();

        // Subtract those points from scores
        if (lastAnswer) {
            for (const [key, value] of Object.entries(lastAnswer.points)) {
                scores[key] -= value;
            }
        }

        // Reset button styles for current question
        const currentButtons = currentElement ? currentElement.querySelectorAll('.option') : [];
        currentButtons.forEach(btn => {
            btn.style.background = '';
            btn.style.color = '';
            btn.style.transform = '';
        });

        // Show previous question
        showQuestion(currentQuestionIndex - 1);

        const newCurrentElement = getCurrentQuestionElement();
        const previousButtons = newCurrentElement ? newCurrentElement.querySelectorAll('.option') : [];
        previousButtons.forEach(btn => {
            btn.style.background = '';
            btn.style.color = '';
            btn.style.transform = '';
        });
    }

    function updateBackButton() {
        if (currentQuestionIndex === 0) {
            backBtn.classList.add('hidden');
        } else {
            backBtn.classList.remove('hidden');
        }
    }

    function calculateBestRoom() {
        // Scoring algorithm to determine best room match
        const roomScores = {
            inside: 0,
            deluxeInside: 0,
            oceanView: 0,
            primeOceanView: 0,
            deluxeOceanView: 0,
            panoramicOceanView: 0,
            deluxePorthole: 0,
            edgeInfinitePartial: 0,
            edgeInfinite: 0,
            primeEdgeInfinite: 0,
            sunsetVeranda: 0,
            aquaclass: 0,
            primeAquaclass: 0,
            aquaSky: 0,
            magicCarpet: 0,
            skySuite: 0,
            sunsetSky: 0,
            celebrity: 0,
            royal: 0,
            conciergePartial: 0,
            concierge: 0,
            primeConcierge: 0,
            edgeVilla: 0,
            penthouse: 0,
            iconic: 0
        };

        // Inside Staterooms scoring (most budget-friendly - no windows)
        roomScores.inside += scores.value * 5; // Highest value score
        roomScores.inside += scores.couple * 1;

        roomScores.deluxeInside += scores.value * 4.5;
        roomScores.deluxeInside += scores.space * 1;
        roomScores.deluxeInside += scores.couple * 1;

        // Ocean View Staterooms scoring (budget-friendly with windows - no balcony)
        roomScores.oceanView += scores.value * 4.5;
        roomScores.oceanView += scores.couple * 1.5;

        roomScores.primeOceanView += scores.value * 4;
        roomScores.primeOceanView += scores.couple * 1.5;

        roomScores.deluxeOceanView += scores.value * 3.5;
        roomScores.deluxeOceanView += scores.space * 1.5;
        roomScores.deluxeOceanView += scores.couple * 1.5;

        roomScores.panoramicOceanView += scores.value * 4;
        roomScores.panoramicOceanView += scores.couple * 2;

        // Basic Staterooms scoring (entry-level with balcony)
        roomScores.deluxePorthole += scores.value * 4;
        roomScores.deluxePorthole += scores.couple * 1;

        roomScores.edgeInfinitePartial += scores.value * 4;
        roomScores.edgeInfinitePartial += scores.couple * 1.5;

        roomScores.edgeInfinite += scores.value * 3;
        roomScores.edgeInfinite += scores.couple * 2;

        roomScores.primeEdgeInfinite += scores.value * 2.5;
        roomScores.primeEdgeInfinite += scores.couple * 2;

        roomScores.sunsetVeranda += scores.value * 2.5;
        roomScores.sunsetVeranda += scores.space * 1.5;
        roomScores.sunsetVeranda += scores.couple * 2.5;

        // AquaClass scoring
        roomScores.aquaclass += scores.wellness * 2;
        roomScores.aquaclass += scores.value * 3;
        roomScores.aquaclass += scores.couple * 2;

        // Prime AquaClass scoring
        roomScores.primeAquaclass += scores.wellness * 2;
        roomScores.primeAquaclass += scores.value * 2;
        roomScores.primeAquaclass += scores.couple * 2;

        // Aqua Sky Suite scoring (wellness + luxury)
        roomScores.aquaSky += scores.wellness * 3;
        roomScores.aquaSky += scores.luxury * 2;
        roomScores.aquaSky += Math.min(scores.couple, scores.family) * 1.5;

        // Magic Carpet Sky Suite scoring (unique views + luxury)
        roomScores.magicCarpet += scores.luxury * 2.5;
        roomScores.magicCarpet += scores.space * 2;
        roomScores.magicCarpet += scores.couple * 2;

        // Sky Suite scoring (high-deck views + retreat)
        roomScores.skySuite += scores.luxury * 2.5;
        roomScores.skySuite += scores.space * 2.5;
        roomScores.skySuite += scores.family * 2;

        // Sunset Sky Suite scoring (romantic sunset views)
        roomScores.sunsetSky += scores.luxury * 2.5;
        roomScores.sunsetSky += scores.space * 2;
        roomScores.sunsetSky += scores.couple * 2.5;

        // Celebrity Suite scoring
        roomScores.celebrity += scores.luxury * 2;
        roomScores.celebrity += scores.space * 3;
        roomScores.celebrity += scores.family * 2;

        // Royal Suite scoring
        roomScores.royal += scores.luxury * 3;
        roomScores.royal += scores.space * 2;
        roomScores.royal += scores.family * 1.5;

        // Concierge Class (Partial View) scoring (budget-friendly with perks)
        roomScores.conciergePartial += scores.value * 3;
        roomScores.conciergePartial += scores.couple * 1.5;

        // Concierge Class scoring (mid-range with service)
        roomScores.concierge += scores.value * 2;
        roomScores.concierge += scores.luxury * 1;
        roomScores.concierge += scores.couple * 2;

        // Prime Concierge Class scoring (mid-range with best location)
        roomScores.primeConcierge += scores.value * 1.5;
        roomScores.primeConcierge += scores.luxury * 1.5;
        roomScores.primeConcierge += scores.couple * 2;

        // Edge Villa scoring (unique two-story with plunge pool)
        roomScores.edgeVilla += scores.luxury * 3;
        roomScores.edgeVilla += scores.space * 2.5;
        roomScores.edgeVilla += scores.couple * 2;
        roomScores.edgeVilla += scores.family * 1.5;

        // Penthouse Suite scoring (large family suite)
        roomScores.penthouse += scores.luxury * 2.5;
        roomScores.penthouse += scores.space * 3;
        roomScores.penthouse += scores.family * 3;

        roomScores.iconic += scores.luxury * 4;
        roomScores.iconic += scores.space * 4;
        roomScores.iconic += scores.family * 2;

        // Find room with highest score
        let bestRoom = 'aquaclass';
        let highestScore = roomScores.aquaclass;

        for (const [room, score] of Object.entries(roomScores)) {
            if (score > highestScore) {
                highestScore = score;
                bestRoom = room;
            }
        }

        return bestRoom;
    }

    function showResults() {
        // Hide quiz questions
        quizContainer.style.display = 'none';

        // Calculate best room
        const bestRoomKey = calculateBestRoom();
        const { room: bestRoom, catalogKey, resolvedKey } = getRoomRecommendation(bestRoomKey);
        const catalogMeta = roomCatalogs[catalogKey] || roomCatalogs[defaultCatalogKey];
        const brandAccent = catalogKey === 'royalIcon' ? 'rgba(0, 174, 239, 0.2)' : 'rgba(255, 255, 255, 0.15)';
        const brandBanner = catalogMeta ? `
            <div style="display: flex; align-items: center; gap: 1.5rem; background: ${brandAccent}; padding: 1.5rem; border-radius: 16px; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 220px;">
                    <p style="margin: 0; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; font-size: 0.85rem; opacity: 0.8;">${catalogMeta.badgeEmoji} ${catalogMeta.label}</p>
                    <p style="margin: 0.4rem 0 0; font-size: 1rem;">${catalogMeta.experienceCopy}</p>
                </div>
                <img src="${catalogMeta.heroImage}" alt="${catalogMeta.label} hero" style="width: 160px; height: 120px; object-fit: cover; border-radius: 12px; flex-shrink: 0;" />
            </div>
        ` : '';

        // Track quiz completion and room recommendation
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quiz_completed', {
                recommended_room: bestRoom.name,
                room_key: bestRoomKey,
                room_price: bestRoom.price,
                cruise_catalog: catalogKey
            });
        }

        // Build result HTML
        let resultHTML = `
            ${brandBanner}
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${bestRoom.icon}</div>
                <h4>${bestRoom.name}</h4>
                <p style="font-size: 1.1rem; opacity: 0.95; margin-top: 1rem;">
                    ${bestRoom.description}
                </p>
                ${catalogMeta ? `<p style="font-size: 0.95rem; margin-top: 0.5rem; opacity: 0.85;">This pick channels the <strong>${catalogMeta.label}</strong> vibe for your sailing.</p>` : ''}
            </div>

            <div style="background: rgba(255,255,255,0.2); padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">
                <h5 style="font-size: 1.3rem; margin-bottom: 1rem; text-align: center;">✨ Key Features</h5>
                <ul style="list-style: none; padding: 0;">
                    ${bestRoom.highlights.map(highlight => `
                        <li style="padding: 0.5rem 0; font-size: 1.05rem;">
                            <span style="color: #ffd700; margin-right: 0.5rem;">✓</span> ${highlight}
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div style="text-align: center; margin-top: 2rem;">
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">
                    <strong>Price Range:</strong> ${bestRoom.price}
                </p>
                <p style="font-size: 1rem; opacity: 0.9; font-style: italic;">
                    Best for: ${bestRoom.bestFor}
                </p>
            </div>

            <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.3);">
                <p style="font-size: 0.95rem; opacity: 0.9;">
                    Want to explore other options? Check out the full comparison table below or take the quiz again!
                </p>
            </div>
        `;

        resultContent.innerHTML = resultHTML;
        updateShareTools(bestRoomKey);
        quizResult.classList.remove('hidden');
        lastRecommendationMeta = { catalogKey, resolvedKey };
        toggleCelebrityHierarchy(catalogKey === 'celebrityEdge');
        if (viewRoomDetailsBtn) {
            viewRoomDetailsBtn.textContent = `See ${bestRoom.name} in the comparison table`;
            viewRoomDetailsBtn.classList.remove('hidden');
        }

        // Special fireworks animation for Iconic Suite!
        if (bestRoomKey === 'iconic') {
            quizResult.classList.add('iconic-result');
            launchFireworks();
        } else {
            quizResult.classList.remove('iconic-result');
        }
    }

    function launchFireworks() {
        // Track Iconic Suite fireworks!
        if (typeof gtag !== 'undefined') {
            gtag('event', 'iconic_suite_fireworks', {
                event_category: 'quiz',
                event_label: 'Iconic Suite Achieved'
            });
        }

        // Create fireworks container
        let fireworksContainer = document.querySelector('.fireworks-container');
        if (!fireworksContainer) {
            fireworksContainer = document.createElement('div');
            fireworksContainer.className = 'fireworks-container';
            document.body.appendChild(fireworksContainer);
        }

        const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#00CED1', '#7B68EE', '#32CD32'];

        // Launch multiple fireworks over 5 seconds
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createFirework(fireworksContainer, colors);
            }, i * 300);
        }

        // Clean up after 8 seconds
        setTimeout(() => {
            if (fireworksContainer) {
                fireworksContainer.remove();
            }
        }, 8000);
    }

    function createFirework(container, colors) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.5) + 50; // Upper half of screen
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Create explosion particles
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = color;

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');

            container.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }

    function restartQuiz() {
        // Track quiz restart
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quiz_restart', {
                event_category: 'quiz',
                event_label: 'User Restarted Quiz'
            });
        }

        // Reset scores
        scores = {
            wellness: 0,
            luxury: 0,
            value: 0,
            space: 0,
            couple: 0,
            family: 0
        };

        Object.assign(userTripDetails, {
            bookingStatus: null,
            bookedCruiseLine: '',
            bookedDestination: '',
            bookedStartDate: '',
            bookedEndDate: '',
            detectedShip: '',
            intendedDestination: '',
            intendedMonth: '',
            cruiseHistoryCount: '',
            priorCruiseLines: [],
            planningBudget: ''
        });

        // Reset answer history
        answerHistory = [];

        // Reset question counter and flow
        bookingStatus = null;
        currentQuestionIndex = 0;
        updateVisibleQuestions();

        // Reset button styles
        const optionButtons = document.querySelectorAll('.option');
        optionButtons.forEach(button => {
            button.style.background = '';
            button.style.color = '';
            button.style.transform = '';
        });

        // Reset form fields
        const formFields = [
            'booked-cruise-line',
            'booked-destination',
            'booked-start-date',
            'booked-end-date',
            'intended-destination',
            'intended-month',
            'cruise-history-count',
            'planning-budget'
        ];
        formFields.forEach(id => {
            const field = document.getElementById(id);
            if (field) {
                field.value = '';
            }
        });
        document.querySelectorAll('input[name="prior-lines"]').forEach(input => {
            input.checked = false;
        });
        if (shipDetectionResult) {
            shipDetectionResult.textContent = 'Provide details to auto-detect your ship.';
        }

        // Hide results
        quizResult.classList.add('hidden');
        quizResult.classList.remove('iconic-result');
        lastRecommendationMeta = null;
        toggleCelebrityHierarchy(false);
        if (viewRoomDetailsBtn) {
            viewRoomDetailsBtn.classList.add('hidden');
        }

        // Clean up fireworks if they exist
        const fireworksContainer = document.querySelector('.fireworks-container');
        if (fireworksContainer) {
            fireworksContainer.remove();
        }

        // Show quiz container
        quizContainer.style.display = 'block';

        // Show first question
        showQuestion(0);

        // Smooth scroll to quiz
        setTimeout(() => {
            document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe guide cards and tier cards for animation
    document.querySelectorAll('.guide-card, .tier-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add table row hover highlight
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.2s ease';
        });
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Console welcome message
    console.log('%c⚓ Edge + Icon Room Picker', 'color: #1d4e89; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome! Find your perfect Celebrity Edge or Royal Caribbean Icon match.', 'color: #4fc3c8; font-size: 14px;');
});

// Utility function to format price ranges
function formatPrice(price) {
    const prices = {
        '$$': '$2,000 - $3,500 per person',
        '$$$': '$3,500 - $5,000 per person',
        '$$$$': '$5,000 - $8,000 per person',
        '$$$$$': '$8,000+ per person'
    };
    return prices[price] || 'Contact Celebrity Cruises for pricing';
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
