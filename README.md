A digital corkboard for you to put your notes on. 

<img width="1170" height="723" alt="Screenshot 2025-08-05 at 8 52 08 PM" src="https://github.com/user-attachments/assets/0ef75438-a23a-455e-b13c-d7ecbd31f8d3" />

Project Structure

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
Installation

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
- **

Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
