-- Newsletter Subscribers Table
-- Add this to your Supabase SQL Editor or migration file

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  interests TEXT[] DEFAULT '{}',
  source VARCHAR(100) NOT NULL,
  segments TEXT[] DEFAULT '{}',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferences JSONB DEFAULT '{
    "frequency": "weekly",
    "content_types": ["general"],
    "time_preference": "morning"
  }',
  metadata JSONB DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'unsubscribed', 'bounced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_segments ON newsletter_subscribers USING GIN(segments);
CREATE INDEX IF NOT EXISTS idx_newsletter_interests ON newsletter_subscribers USING GIN(interests);
CREATE INDEX IF NOT EXISTS idx_newsletter_source ON newsletter_subscribers(source);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_newsletter_subscribers_updated_at 
  BEFORE UPDATE ON newsletter_subscribers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication setup)
-- Allow anonymous inserts (for subscriptions)
CREATE POLICY "Allow anonymous subscriptions" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Allow users to view their own subscription
CREATE POLICY "Users can view own subscription" ON newsletter_subscribers
  FOR SELECT USING (email = auth.jwt() ->> 'email');

-- Allow users to update their own preferences
CREATE POLICY "Users can update own preferences" ON newsletter_subscribers
  FOR UPDATE USING (email = auth.jwt() ->> 'email');

-- Admin access (adjust based on your admin role setup)
-- CREATE POLICY "Admin full access" ON newsletter_subscribers
--   FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Newsletter Analytics View
CREATE OR REPLACE VIEW newsletter_analytics AS
SELECT 
  COUNT(*) as total_subscribers,
  COUNT(*) FILTER (WHERE status = 'active') as active_subscribers,
  COUNT(*) FILTER (WHERE status = 'unsubscribed') as unsubscribed_count,
  COUNT(*) FILTER (WHERE subscribed_at >= NOW() - INTERVAL '30 days') as recent_subscribers,
  COUNT(*) FILTER (WHERE subscribed_at >= NOW() - INTERVAL '7 days') as weekly_growth,
  
  -- Segment distribution
  UNNEST(segments) as segment,
  COUNT(*) FILTER (WHERE status = 'active') as segment_count
FROM newsletter_subscribers
GROUP BY segment;

-- Newsletter Segments Performance View
CREATE OR REPLACE VIEW newsletter_segments AS
SELECT 
  segment,
  COUNT(*) as subscriber_count,
  ROUND(AVG(EXTRACT(DAYS FROM (NOW() - subscribed_at)))) as avg_days_subscribed,
  COUNT(*) FILTER (WHERE last_activity >= NOW() - INTERVAL '30 days') as active_last_30_days
FROM newsletter_subscribers,
     UNNEST(segments) as segment
WHERE status = 'active'
GROUP BY segment
ORDER BY subscriber_count DESC;

-- Source Performance View
CREATE OR REPLACE VIEW newsletter_sources AS
SELECT 
  source,
  COUNT(*) as subscriber_count,
  COUNT(*) FILTER (WHERE status = 'active') as active_count,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'active')::FLOAT / COUNT(*)) * 100, 2
  ) as retention_rate,
  COUNT(*) FILTER (WHERE subscribed_at >= NOW() - INTERVAL '30 days') as recent_count
FROM newsletter_subscribers
GROUP BY source
ORDER BY subscriber_count DESC;