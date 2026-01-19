# Lukas Chachich - Personal Portfolio Website

A modern, responsive portfolio website showcasing projects, experience, and skills. Built with vanilla HTML, CSS, and JavaScript. Created entirely with prompts.

## Project Overview

This is a professional portfolio website featuring:
- **Interactive Hero Section** - Landing page with animated background and call-to-action buttons
- **About Section** - Professional biography and introduction
- **Experience Section** - Detailed work experience and roles at Spectrum Consulting Group, AI Club, and eCommerce business
- **Projects Section** - Featured projects with modal popups for detailed information
- **Contact Section** - Email and LinkedIn links
- **Responsive Design** - Mobile-friendly layout with hamburger menu
- **Modern UI** - Dark theme with accent colors, smooth animations, and parallax effects

## Project Structure

```
personal_webpage/
├── index.html           # Main HTML structure
├── style.css            # All CSS styling and animations
├── script.js            # JavaScript functionality and interactions
├── prof_pic.png         # Profile picture
├── Chachich_Lukas_01-17-26.pdf  # Resume (downloadable)
├── .git/                # Git repository
└── README.md            # This file
```

## File Descriptions

### index.html
The main HTML entry point containing:
- Navigation bar with logo and menu links
- Hero section with animated background
- About section with profile image and biography
- Experience section showcasing consulting, AI club, and eCommerce work
- Projects section with featured projects (Project 1: CG Text Checker, Project 2: Stock Direction Predictor ML Lab, Project 3: Mobile App Suite)
- Contact section with email and LinkedIn
- Modal popup for project details
- Links to external resources (resume PDF, MSU logo)

### style.css
Comprehensive styling including:
- **CSS Variables** - Theming system with customizable colors and spacing
- **Layout** - Flexbox and CSS Grid for responsive design
- **Components** - Styled navigation, buttons, cards, modals, and sections
- **Animations** - Smooth transitions, scroll-triggered animations, parallax effects
- **Responsive Design** - Mobile-first approach with media queries
- **Dark Theme** - Professional dark color scheme with green accents (MSU colors)

### script.js
JavaScript functionality:
- **Parallax Effect** - Background moves slower than scroll for depth
- **Scroll Animations** - Cards animate in when scrolled into view
- **Mobile Menu** - Hamburger toggle for responsive navigation
- **Modal Functionality** - Click projects to see detailed information with GitHub links
- **Navigation Tracking** - Active link highlighting
- **Event Listeners** - Click handlers for buttons and interactive elements

## Key Features

✓ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile  
✓ **Modern Animations** - Parallax scrolling, fade-in effects, smooth transitions  
✓ **Project Showcase** - Interactive modals displaying project details, technologies, and GitHub links  
✓ **Professional Styling** - Clean dark theme with MSU green accent colors  
✓ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation support  
✓ **Performance** - Optimized CSS animations using GPU acceleration  
✓ **Easy to Update** - Well-organized code with clear sections and comments  

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and animations
- **Vanilla JavaScript** - No frameworks, lightweight and fast
- **Responsive Design** - Mobile-first approach

## How to Use

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd personal_webpage
   ```

2. Open in a browser:
   - Simply double-click `index.html` to open locally
   - Or use a local server (recommended):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Or Node.js
     npx http-server
     ```
   - Navigate to `http://localhost:8000`

3. Edit content:
   - Update text in `index.html`
   - Modify colors in `style.css` using CSS variables
   - Add functionality in `script.js`

### Customization

#### Adding GitHub Links to Projects
Edit the GitHub links in `script.js` in the `openModal()` function:
```javascript
github.innerHTML = '<strong>GitHub:</strong> <a href="YOUR_GITHUB_URL" target="_blank">View Repository</a>';
```

#### Changing Colors
Edit CSS variables at the top of `style.css`:
```css
:root {
    --color-accent: #00A651;        /* Main accent color */
    --color-bg-primary: #0a0a0a;    /* Background */
    --color-text-primary: #ffffff;  /* Text */
}
```

#### Adding New Projects
1. Add a new project card in `index.html` with unique `id`
2. Create corresponding modal data in `script.js` in the `openModal()` function
3. Style as needed using existing CSS classes

## Browser Compatibility

- Chrome/Chromium (v90+)
- Firefox (v88+)
- Edge (v90+)
- Safari (v14+)

## Performance Notes

- **First Load**: Smooth and fast (no external dependencies, only hosted images)
- **Animations**: Optimized with GPU acceleration using `transform` and `will-change`
- **Responsive**: Mobile menu only appears on screens ≤ 768px
- **Accessibility**: Keyboard navigation and screen reader support

## Future Enhancements

- [ ] Add blog section for technical articles
- [ ] Integrate contact form with email backend
- [ ] Add dark/light mode toggle
- [ ] Implement project filtering by technology
- [ ] Add testimonials section
- [ ] Connect to live GitHub API for project statistics
- [ ] Add analytics tracking

## License

This project is provided as-is for personal and educational purposes.

## Contact

- **Email**: [Chachich@msu.edu](mailto:Chachich@msu.edu)
- **LinkedIn**: [Lukas Chachich](https://www.linkedin.com/in/lukaschachich/)

---

**Last Updated**: January 19, 2026  
**Portfolio Owner**: Lukas Chachich  
**University**: Michigan State University
