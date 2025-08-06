# 🖼️ Digital Corkboard

A beautiful, interactive digital corkboard application built with Next.js and TypeScript. Create, organize, and share your memories through digital postcards on a realistic corkboard interface.

![Digital Corkboard](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Beautiful Design
- **Realistic Corkboard Texture**: Authentic cork material appearance with natural variations
- **Elegant Wooden Frame**: Rich amber wooden frame with realistic grain patterns
- **Centered Layout**: Clean, balanced design with perfectly centered elements
- **Responsive Design**: Works seamlessly across different screen sizes

### 📝 Postcard Management
- **Create Custom Postcards**: Write personal messages with customizable colors and fonts
- **Visual Color Selection**: Choose from 6 beautiful color schemes (no text labels)
- **Font Styles**: Three font options - Handwritten, Elegant, and Casual
- **Ambient Effects**: Add Gentle Glow, Warm Shimmer, or Soft Float effects
- **Library Organization**: Browse and manage all your postcards in a sidebar

### 🎯 Interactive Features
- **Download Functionality**: Save your corkboard as a high-quality PNG image
- **Static Layout**: Postcards stay in fixed positions for consistent organization
- **Hover Effects**: Beautiful animations when interacting with postcards
- **Modal Expansion**: Click postcards to view them in full detail

### 🚀 User Experience
- **Clean Start**: Begin with an empty corkboard for a personalized experience
- **Intuitive Navigation**: Easy-to-use interface with clear button placement
- **Smooth Animations**: Fluid transitions and hover effects
- **Professional Polish**: High-quality UI components and styling

## 🛠️ Technology Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Image Capture**: html2canvas
- **Package Manager**: npm/pnpm

## 🎨 Design Philosophy

The Digital Corkboard combines the nostalgic charm of traditional corkboards with modern web technology. The design emphasizes:

- **Authenticity**: Realistic cork texture and wooden frame
- **Simplicity**: Clean interface that doesn't overwhelm
- **Personalization**: Customizable postcards for individual expression
- **Quality**: Professional-grade animations and interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anh220305/Memory-Corkboard.git
   cd Memory-Corkboard
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install --legacy-peer-deps
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📱 Usage

### Creating Postcards
1. Click the **"+"** button in the bottom-right corner
2. Write your message (up to 280 characters)
3. Sign your postcard with a name or pseudonym
4. Choose a color scheme from the visual color palette
5. Select a font style (Handwritten, Elegant, or Casual)
6. Add an ambient effect (Glow, Shimmer, or Float)
7. Click **"Create Postcard"** to add it to your corkboard

### Managing Your Corkboard
- **Library**: Click the Library button to view all your postcards
- **Download**: Save your entire corkboard as an image
- **Fullscreen**: Toggle fullscreen mode for immersive experience
- **View Details**: Click any postcard to see it in expanded view

## 🎯 Key Features Explained

### Color Selection
The color palette includes 6 beautiful gradients:
- Rose (pink tones)
- Blue (ocean tones) 
- Purple (lavender tones)
- Green (sage tones)
- Yellow (sunshine tones)
- Orange (sunset tones)

### Font Styles
- **Handwritten**: Monospace font for a personal touch
- **Elegant**: Serif font for sophisticated messages
- **Casual**: Sans-serif font for everyday notes

### Ambient Effects
- **Gentle Glow**: Subtle pulsing animation
- **Warm Shimmer**: Bounce effect on hover
- **Soft Float**: Gentle pulse animation

## 🔧 Project Structure

```
Memory-Corkboard/
├── app/
│   ├── components/
│   │   ├── postcard-creator.tsx    # Postcard creation modal
│   │   ├── postcard-library.tsx    # Library sidebar
│   │   └── postcard.tsx            # Individual postcard component
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Main corkboard page
├── components/
│   ├── ui/                         # Reusable UI components
│   └── theme-provider.tsx          # Theme configuration
├── hooks/                          # Custom React hooks
├── lib/                            # Utility functions
├── public/                         # Static assets
└── styles/                         # Additional stylesheets
```

## 🎨 Customization

### Adding New Colors
Edit the `colors` array in `app/components/postcard-creator.tsx`:
```typescript
const colors = [
  { name: "new-color", class: "bg-gradient-to-br from-color-200 to-color-300", label: "New Color" },
  // ... existing colors
]
```

### Modifying Corkboard Size
Update the dimensions in `app/page.tsx`:
```typescript
className="w-[800px] h-[600px] relative overflow-hidden rounded-lg"
```

### Changing Frame Design
Modify the frame styles in the main page component to adjust the wooden frame appearance.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js** for the amazing React framework
- **Tailwind CSS** for the utility-first styling
- **Radix UI** for accessible component primitives
- **Lucide** for beautiful icons
- **html2canvas** for image capture functionality

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub.

---

**Made with ❤️ for digital memory keeping** 