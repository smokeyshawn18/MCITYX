# MCityX - Manchester City Fan Site

![MCityX](https://mcityx.vercel.app/og-image.png)

Your ultimate Manchester City fan destination with latest news, live results, player stats, transfer rumors, fixtures, and exclusive City content.

## 🚀 Features

- **Live Match Updates**: Real-time Premier League, Champions League, FA Cup, and Carabao Cup fixtures
- **Player Statistics**: Comprehensive player profiles, ratings, and performance data
- **Transfer News**: Latest Manchester City transfer rumors and updates
- **Match Results**: Detailed match statistics and results
- **News Hub**: Breaking news and exclusive content from the Etihad
- **Responsive Design**: Optimized for mobile and desktop
- **Dark Mode**: Beautiful dark theme support
- **PWA Ready**: Installable progressive web app

## �� SEO Optimization

This project is fully optimized for search engines with advanced SEO features:

### Core SEO Features
- ✅ Next.js App Router with optimized metadata
- ✅ Dynamic sitemaps with next-sitemap
- ✅ Structured data (JSON-LD) for rich snippets
- ✅ Open Graph and Twitter Card optimization
- ✅ Comprehensive robots.txt configuration
- ✅ Web App Manifest (PWA)
- ✅ Server-side sitemap generation
- ✅ Breadcrumb navigation with schema markup
- ✅ FAQ structured data
- ✅ Security.txt and humans.txt
- ✅ Performance optimizations

### Search Rankings
Optimized for these search terms:
- "mcityx"
- "man city fan site"
- "man city schedule"
- "man city stats"
- "manchester city news"
- "man city results"
- "premier league fixtures"
- "champions league schedule"

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Icons**: React Icons, Lucide React
- **Authentication**: Clerk
- **Database**: Supabase
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4
- **SEO**: Next-sitemap, structured data

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mcityx.git
cd mcityx
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your environment variables in `.env.local`

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console
NEXT_PUBLIC_GSC_VERIFICATION_CODE=your-verification-code

# API Keys
FOOTBALL_DATA_API_KEY=your-api-key
NEWS_API_KEY=your-news-api-key

# Social Media
NEXT_PUBLIC_TWITTER_HANDLE=@MCityX
NEXT_PUBLIC_FACEBOOK_PAGE=https://facebook.com/MCityX
```

### SEO Configuration

The site is pre-configured with advanced SEO:

- **Sitemap**: Automatically generated at `/sitemap.xml`
- **Robots.txt**: Comprehensive crawler instructions
- **Meta Tags**: Optimized for all pages
- **Structured Data**: Rich snippets for search results
- **Performance**: Optimized images and fonts

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Manual Build

```bash
# Build for production
npm run build

# Generate sitemap
npm run postbuild

# Start production server
npm start
```

## 📊 Analytics & Monitoring

### Google Analytics
- Page views and user behavior tracking
- Conversion tracking
- Custom events for football-related actions

### Google Search Console
- Search performance monitoring
- Index coverage reports
- Rich results testing

### Performance Monitoring
- Core Web Vitals tracking
- Lighthouse score monitoring
- User experience metrics

## 🔒 Security

- Content Security Policy (CSP)
- HTTPS enforcement
- Secure headers configuration
- Regular security audits

## 📱 Progressive Web App (PWA)

- Installable on mobile devices
- Offline functionality
- Push notifications (planned)
- Native app-like experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: hello@mcityx.com
- **Twitter**: [@MCityX](https://twitter.com/MCityX)
- **Facebook**: [MCityX](https://facebook.com/MCityX)

## 🙏 Acknowledgments

- Manchester City FC for the inspiration
- Pep Guardiola for the magic
- The fans for the passion
- Open source community for the tools

---

**Made with ❤️ for Manchester City fans worldwide**
