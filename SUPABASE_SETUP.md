# 🚀 Supabase Integration Guide

This project has been migrated from Firebase to **Supabase** for improved developer experience and better PostgreSQL integration.

## 📋 Quick Setup

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization and fill in:
   - **Project Name**: `studio-app` (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click "Create new project"

### 2. Get Your Project Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **Project API Key** (anon/public key)

### 3. Update Environment Variables

Update your `.env.local` file with your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For Google OAuth
NEXT_PUBLIC_SITE_URL=http://localhost:9002
```

### 4. Set Up Database Schema

1. Go to your Supabase Dashboard
2. Click on **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql`
4. Click **Run** to create all tables and policies

### 5. Configure Authentication

1. In your Supabase Dashboard, go to **Authentication** → **Settings**
2. Configure your **Site URL**: `http://localhost:9002` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:9002/auth/callback`
   - `https://your-domain.com/auth/callback` (for production)

#### Enable Google OAuth (Optional)

1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Add your Google OAuth credentials:
   - **Client ID** and **Client Secret** from Google Console
   - **Redirect URL**: Use the one provided by Supabase

### 6. Restart Your Development Server

```bash
npm run dev
```

You should now see:
```
✅ Supabase client initialized successfully
```

## 🔄 Migration from Firebase

### What Changed

| Firebase | Supabase | Notes |
|----------|----------|-------|
| `firestore` | `supabase.from()` | PostgreSQL tables instead of collections |
| `auth` | `supabase.auth` | Similar API with some differences |
| `storage` | `supabase.storage` | Similar bucket-based storage |

### Key Differences

1. **Data Structure**: PostgreSQL tables with typed columns instead of NoSQL documents
2. **Queries**: SQL-like syntax instead of Firebase queries
3. **Real-time**: Built-in real-time subscriptions
4. **Row Level Security**: Fine-grained access control

## 📊 Database Schema

The project includes these main tables:

- **`products`** - Marketplace items (beats, merch, courses, sound kits)
- **`orders`** - Purchase orders from Stripe
- **`releases`** - Music releases
- **`reviews`** - Product reviews and ratings
- **`courses`** - Educational content

All tables include:
- UUID primary keys
- Timestamps (`created_at`, `updated_at`)
- Row Level Security (RLS) policies

## 🔐 Row Level Security

RLS policies are configured to:

- **Products**: Public read, authenticated insert, owner update/delete
- **Orders**: Owner access only
- **Releases**: Public read, owner management
- **Reviews**: Public read, authenticated insert
- **Courses**: Public read, instructor management

## 🛠 Development Features

### Demo Mode

When Supabase isn't configured, the app runs in demo mode:
- Mock data for all database operations
- Simulated authentication flows
- No real database connections needed

### Environment Detection

The app automatically detects:
- Valid Supabase configuration
- Development vs production environments
- Authentication state changes

## 🚀 Production Deployment

### Environment Variables

Set these in your production environment:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Stripe (if using payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Database Considerations

1. **Performance**: Add indexes for frequently queried columns
2. **Backups**: Enable automated backups in Supabase Dashboard
3. **Monitoring**: Set up alerts for database performance
4. **Scaling**: Consider read replicas for high-traffic apps

## 📚 API Examples

### Fetching Products

```typescript
const { data: products, error } = await supabase
  .from('products')
  .select('*')
  .limit(10);
```

### Creating an Order

```typescript
const { data, error } = await supabase
  .from('orders')
  .insert({
    buyer_id: userId,
    items: cartItems,
    total: totalAmount,
    status: 'Paid'
  });
```

### Authentication

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    data: { full_name: 'John Doe' }
  }
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});
```

## 🔧 Troubleshooting

### Common Issues

1. **"Demo mode" warning**: Check your environment variables
2. **RLS errors**: Verify your authentication and policies
3. **Connection errors**: Check your project URL and API key
4. **CORS errors**: Add your domain to allowed origins in Supabase

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com/)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## 🎯 Next Steps

1. Set up your Supabase project
2. Configure authentication providers
3. Customize RLS policies for your needs
4. Add real-time subscriptions
5. Set up email templates
6. Configure storage buckets for file uploads

---

**Need help?** Check the demo mode logs in your browser console for detailed information about what's happening in the background.