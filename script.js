// Quiz Logic and Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Quiz State
    let currentQuestion = 1;
    const totalQuestions = 7;
    let scores = {
        wellness: 0,
        luxury: 0,
        value: 0,
        space: 0,
        couple: 0,
        family: 0,
        andy: 0,
        notandy: 0
    };
    let answerHistory = []; // Track answers for back functionality

    // Room Definitions
    const rooms = {
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
            bestFor: 'those seeking the absolute ultimate luxury experience - the crown jewel of Celebrity Cruises (Hi Andy! 👋)'
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

    // Quiz Elements
    const questions = document.querySelectorAll('.question');
    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');
    const resultContent = document.getElementById('result-content');
    const restartBtn = document.getElementById('restart-quiz');
    const backBtn = document.getElementById('back-btn');

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

        // Hide back button on first question
        updateBackButton();
    }

    function handleAnswer(e) {
        const button = e.currentTarget;
        const points = JSON.parse(button.getAttribute('data-points'));

        // Save answer to history
        answerHistory.push({
            questionNumber: currentQuestion,
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
            if (currentQuestion < totalQuestions) {
                nextQuestion();
            } else {
                showResults();
            }
        }, 300);
    }

    function nextQuestion() {
        // Hide current question
        questions[currentQuestion - 1].classList.remove('active');

        // Show next question
        currentQuestion++;
        questions[currentQuestion - 1].classList.add('active');

        // Update back button visibility
        updateBackButton();
    }

    function previousQuestion() {
        if (currentQuestion <= 1) return;

        // Get the last answer from history
        const lastAnswer = answerHistory.pop();

        // Subtract those points from scores
        if (lastAnswer) {
            for (const [key, value] of Object.entries(lastAnswer.points)) {
                scores[key] -= value;
            }
        }

        // Reset button styles for current question
        const currentButtons = questions[currentQuestion - 1].querySelectorAll('.option');
        currentButtons.forEach(btn => {
            btn.style.background = '';
            btn.style.color = '';
            btn.style.transform = '';
        });

        // Hide current question
        questions[currentQuestion - 1].classList.remove('active');

        // Show previous question
        currentQuestion--;
        questions[currentQuestion - 1].classList.add('active');

        // Reset button styles for previous question
        const prevButtons = questions[currentQuestion - 1].querySelectorAll('.option');
        prevButtons.forEach(btn => {
            btn.style.background = '';
            btn.style.color = '';
            btn.style.transform = '';
        });

        // Update back button visibility
        updateBackButton();
    }

    function updateBackButton() {
        if (currentQuestion === 1) {
            backBtn.classList.add('hidden');
        } else {
            backBtn.classList.remove('hidden');
        }
    }

    function calculateBestRoom() {
        // Special case: If the user is Andy, they get the Iconic Suite!
        if (scores.andy > 0) {
            return 'iconic';
        }

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
            penthouse: 0
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
        const bestRoom = rooms[bestRoomKey];

        // Build result HTML
        let resultHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${bestRoom.icon}</div>
                <h4>${bestRoom.name}</h4>
                <p style="font-size: 1.1rem; opacity: 0.95; margin-top: 1rem;">
                    ${bestRoom.description}
                </p>
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
        quizResult.classList.remove('hidden');

        // Special fireworks animation for Iconic Suite!
        if (bestRoomKey === 'iconic') {
            quizResult.classList.add('iconic-result');
            launchFireworks();
        } else {
            quizResult.classList.remove('iconic-result');
        }
    }

    function launchFireworks() {
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
        // Reset scores
        scores = {
            wellness: 0,
            luxury: 0,
            value: 0,
            space: 0,
            couple: 0,
            family: 0,
            andy: 0,
            notandy: 0
        };

        // Reset answer history
        answerHistory = [];

        // Reset question counter
        currentQuestion = 1;

        // Reset button styles
        const optionButtons = document.querySelectorAll('.option');
        optionButtons.forEach(button => {
            button.style.background = '';
            button.style.color = '';
            button.style.transform = '';
        });

        // Hide results
        quizResult.classList.add('hidden');
        quizResult.classList.remove('iconic-result');

        // Clean up fireworks if they exist
        const fireworksContainer = document.querySelector('.fireworks-container');
        if (fireworksContainer) {
            fireworksContainer.remove();
        }

        // Show quiz container
        quizContainer.style.display = 'block';

        // Show first question
        questions.forEach((q, index) => {
            if (index === 0) {
                q.classList.add('active');
            } else {
                q.classList.remove('active');
            }
        });

        // Update back button (hide on first question)
        updateBackButton();

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

    // Progress indicator
    const totalQuestionCount = document.querySelectorAll('.question').length;

    // Console welcome message
    console.log('%c⚓ Celebrity Edge-Class Room Picker', 'color: #1d4e89; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome! Find your perfect stateroom.', 'color: #4fc3c8; font-size: 14px;');
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
