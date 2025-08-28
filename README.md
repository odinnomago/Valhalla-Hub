# 🎵 Valhalla Studio - Music Platform

A comprehensive Next.js platform for musicians, producers, and music enthusiasts. Built with **Supabase**, **Stripe**, and **AI integration**.

## 🚀 Features

- **🎧 Artist Marketplace** - Buy/sell beats, merch, courses, and sound kits
- **🎓 Academy** - Learn from industry experts
- **🎤 Artist Profiles** - Showcase your music and connect with fans
- **💳 Payments** - Secure transactions with Stripe
- **🤖 AI Tools** - Generate marketing copy and cover art
- **📱 Responsive Design** - Works on all devices

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Styling**: Tailwind CSS + Radix UI
- **AI**: Google Genkit
- **Deployment**: Firebase App Hosting

## 📦 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account (for payments)

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo>
   cd studio-1
   npm install
   ```

2. **Set up Supabase** (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed guide):
   - Create a new Supabase project
   - Copy your project URL and API key
   - Run the SQL schema from `supabase-schema.sql`

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your credentials:
   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   
   # Stripe (optional)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**: http://localhost:9002

## 🎯 Demo Mode

The app runs in demo mode with mock data when Supabase isn't configured. Perfect for:
- Testing the UI and functionality
- Development without external dependencies
- Understanding the app structure

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── academy/         # Course platform
│   ├── artists/         # Artist profiles
│   ├── auth/           # Authentication pages
│   ├── marketplace/     # Product marketplace
│   └── dashboard/       # User dashboard
├── components/          # Reusable UI components
│   ├── ui/             # Base UI primitives
│   └── layout/         # Layout components
├── lib/                # Utilities and configurations
│   ├── supabase.ts     # Supabase client
│   ├── auth.ts         # Authentication helpers
│   └── actions.ts      # Server actions
└── hooks/              # Custom React hooks
```

## 🔧 Development Scripts

```bash
npm run dev          # Start development server (port 9002)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Type checking with TypeScript

# AI Features
npm run genkit:dev   # Start AI development server
npm run genkit:watch # Watch AI files for changes
```

## 🚀 Deployment

### Firebase App Hosting

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   ```bash
   firebase deploy
   ```

### Other Platforms

The app can be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: Connect your Git repository
- **Railway**: `railway deploy`

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | 💰 |
| `STRIPE_SECRET_KEY` | Stripe secret key | 💰 |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | 💰 |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | 🔗 |

*💰 = Required for payments, 🔗 = Required for OAuth*

## 📚 Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Complete Supabase configuration
- [Database Schema](./supabase-schema.sql) - SQL schema for all tables
- [Component Documentation](./src/components/) - UI component guides

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Ready to build the future of music?** 🎵

Start by setting up your Supabase project following the [setup guide](./SUPABASE_SETUP.md)!
