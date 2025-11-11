// Quiz Logic and Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Quiz State
    let currentQuestion = 1;
    const totalQuestions = 6;
    let scores = {
        wellness: 0,
        luxury: 0,
        value: 0,
        space: 0,
        couple: 0,
        family: 0
    };

    // Room Definitions
    const rooms = {
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
            price: '$$',
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
            price: '$$$',
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
            price: '$$$$',
            bestFor: 'wellness lovers who want the complete luxury suite experience'
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
            price: '$$$$',
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
            price: '$$$$$',
            bestFor: 'travelers seeking the ultimate VIP experience with maximum space and luxury'
        }
    };

    // Quiz Elements
    const questions = document.querySelectorAll('.question');
    const quizContainer = document.getElementById('quiz-container');
    const quizResult = document.getElementById('quiz-result');
    const resultContent = document.getElementById('result-content');
    const restartBtn = document.getElementById('restart-quiz');

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
    }

    function handleAnswer(e) {
        const button = e.currentTarget;
        const points = JSON.parse(button.getAttribute('data-points'));

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
    }

    function calculateBestRoom() {
        // Scoring algorithm to determine best room match
        const roomScores = {
            aquaclass: 0,
            primeAquaclass: 0,
            aquaSky: 0,
            celebrity: 0,
            royal: 0
        };

        // AquaClass scoring
        roomScores.aquaclass += scores.wellness * 2;
        roomScores.aquaclass += scores.value * 3;
        roomScores.aquaclass += scores.couple * 2;

        // Prime AquaClass scoring
        roomScores.primeAquaclass += scores.wellness * 2;
        roomScores.primeAquaclass += scores.value * 2;
        roomScores.primeAquaclass += scores.couple * 2;

        // Aqua Sky Suite scoring
        roomScores.aquaSky += scores.wellness * 3;
        roomScores.aquaSky += scores.luxury * 2;
        roomScores.aquaSky += Math.min(scores.couple, scores.family) * 1.5;

        // Celebrity Suite scoring
        roomScores.celebrity += scores.luxury * 2;
        roomScores.celebrity += scores.space * 3;
        roomScores.celebrity += scores.family * 2;

        // Royal Suite scoring
        roomScores.royal += scores.luxury * 3;
        roomScores.royal += scores.space * 2;
        roomScores.royal += scores.family * 1.5;

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

        // Smooth scroll to results
        setTimeout(() => {
            quizResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    function restartQuiz() {
        // Reset scores
        scores = {
            wellness: 0,
            luxury: 0,
            value: 0,
            space: 0,
            couple: 0,
            family: 0
        };

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
