# ⚓ Celebrity Edge-Class Room Picker

An interactive one-page website to help cruise travelers compare and choose the perfect Celebrity Edge-Class stateroom or suite.

## 🌊 Features

### 📋 Interactive Quiz
- **7-question quiz** that analyzes your preferences
- Smart recommendation algorithm based on your answers
- Special personalized recommendation for Andy!
- Questions cover:
  - Travel priorities (wellness vs. luxury)
  - Group size
  - Service preferences
  - Amenity preferences
  - Budget considerations
  - Dining preferences
  - Personalization

### 📊 Comprehensive Comparison Table
Compare all 25 Celebrity Edge-Class accommodation types side-by-side:

**Inside Staterooms (Most Affordable - No Windows)**
- **Inside Stateroom** - Most affordable option (181 sq ft, no windows)
- **Deluxe Inside Stateroom** - Larger inside stateroom (202-231 sq ft, 20% more space)

**Ocean View Staterooms (Budget-Friendly with Windows - No Balcony)**
- **Ocean View** - Budget-friendly with large window (200 sq ft, Deck 3)
- **Prime Ocean View Stateroom** - Better midship/higher deck location (200 sq ft)
- **Deluxe Ocean View** - Up to 70% more space with forward window (238-348 sq ft)
- **Panoramic Ocean View** - Floor-to-ceiling glass for dramatic views (212 sq ft)

**Basic Staterooms (Entry-Level with Balcony)**
- **Deluxe Porthole View with Veranda** - Entry-level with balcony, central location
- **Edge Stateroom with Infinite Veranda (Partial View)** - Budget Infinite Veranda
- **Edge Stateroom with Infinite Veranda** - Standard Infinite Veranda
- **Prime Edge Stateroom with Infinite Veranda** - Best standard location (midship/high-deck)
- **Sunset Veranda Stateroom** - Most spacious standard (317 sq ft, sunset views)

**Wellness & Specialty**
- **AquaClass Stateroom** - Budget-friendly wellness focus
- **Prime AquaClass Stateroom** - Premium location with wellness benefits
- **Aqua Sky Suite** - Hybrid wellness + luxury suite experience

**Concierge Class (Mid-Tier Service)**
- **Concierge Class (Partial View)** - Budget-friendly with concierge perks
- **Concierge Class Stateroom** - Mid-range with personalized service
- **Prime Concierge Class** - Best location with concierge service

**Sky Suites (The Retreat)**
- **Magic Carpet Sky Suite** - Unique Magic Carpet views with Retreat
- **Sky Suite** - High-deck panoramic views with Retreat
- **Sunset Sky Suite** - Romantic aft-facing sunset views

**Premium Suites (The Retreat)**
- **Celebrity Suite** - Spacious luxury with Retreat privileges
- **Edge Villa** - TWO-STORY with private plunge pool (unique!)
- **Penthouse Suite** - 2-bedroom family suite with hot tub
- **Royal Suite** - Ultimate VIP experience
- **Iconic Suite** - Largest suite in Celebrity fleet (2,581 sq ft - special recommendation for Andy!)

### 🎯 Quick Decision Guide
Visual cards highlighting each room type with:
- Key features and highlights
- Price tier indicators
- Best-suited traveler types
- Amenity lists

### 🧭 Hierarchy Overview
Understand the Celebrity Cruise class system:
- Wellness-Class (No Retreat)
- Bridge Tier (Wellness + Luxury)
- Suite-Class (The Retreat)
- Top Suite-Class (The Retreat Premium)

## 🚀 Getting Started

### View the Website

Simply open `index.html` in any modern web browser:

```bash
open index.html
```

Or use a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select the `main` branch as source
4. Your site will be available at `https://yourusername.github.io/RoomPicker/`

### Deploy to Other Platforms

**Netlify:**
- Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
- Or connect your GitHub repository

**Vercel:**
- Import your GitHub repository at [Vercel](https://vercel.com)
- Deploy with one click

**Cloudflare Pages:**
- Connect your GitHub repository
- Deploy automatically

## 📁 Project Structure

```
RoomPicker/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # Quiz logic and interactivity
└── README.md           # Project documentation
```

## 🎨 Design Features

- **Ocean-themed color palette** with navy, blues, and gold accents
- **Fully responsive** design for mobile, tablet, and desktop
- **Smooth animations** and transitions
- **Accessible** with proper focus states and semantic HTML
- **Print-friendly** CSS for comparison table printing

## 🛠 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **Vanilla JavaScript** - No dependencies required
- **Mobile-first responsive design**

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Quiz Algorithm

The quiz uses a weighted scoring system across multiple categories:
- **Wellness** - Spa and health-focused amenities
- **Luxury** - Premium services and space
- **Value** - Budget-conscious options
- **Space** - Square footage priorities
- **Couple/Family** - Group size considerations

Each room type receives points based on user preferences, and the highest-scoring room is recommended.

## 📊 Room Comparison Data

All data is based on Celebrity Edge-Class ships including:
- Celebrity Edge
- Celebrity Apex
- Celebrity Beyond
- Celebrity Ascent

Room features and pricing are accurate as of 2024. Always verify current details with Celebrity Cruises before booking.

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

Ideas for improvements:
- Add pricing calculator
- Include seasonal availability
- Add photo galleries for each room type
- Multi-language support
- Accessibility enhancements
- Dark mode toggle

## ⚠️ Disclaimer

This website is an **unofficial informational tool** and is not affiliated with Celebrity Cruises or Royal Caribbean Group.

All information is provided for educational and planning purposes. Please verify all details, pricing, and availability directly with Celebrity Cruises before making any booking decisions.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Acknowledgments

- Room data and specifications from Celebrity Cruises Edge-Class documentation
- Design inspiration from modern cruise line websites
- Built with love for cruise enthusiasts

## 📞 Support

For questions or issues:
1. Check the [Issues](../../issues) page
2. Open a new issue with details
3. Contribute improvements via Pull Requests

---

**Happy Cruising!** ⚓🌊

*Find your perfect Celebrity Edge-Class stateroom and set sail in style.*
