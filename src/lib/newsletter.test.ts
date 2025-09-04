// A standalone script to test the newsletter service bug.
// To run: `npx tsx src/lib/newsletter.test.ts`

import { newsletterService, NewsletterSubscriber } from './newsletter';
import { supabase } from './supabase';
import assert from 'assert';

// This is a simplified mock of the Supabase client for this specific test.
let updateCalledWith: any = null;

const mockSupabaseClient = {
  from: (tableName: string) => {
    return {
      select: () => {
        const queryBuilder = {
          eq: (column: string, value: any) => {
            // Return the same object to allow chaining .eq calls
            return queryBuilder;
          },
          single: async () => {
            // The logic to return an existing subscriber for the test
            const existingSubscriber: NewsletterSubscriber = {
              id: 'user-123',
              email: 'test@example.com',
              interests: ['Produção Musical'],
              source: 'organic_search', // The original source
              segments: [],
              subscribed_at: new Date().toISOString(),
              status: 'active',
              preferences: { frequency: 'weekly', content_types: ['tutorials'] },
              metadata: {},
            };
            return { data: existingSubscriber, error: null };
          }
        };
        return queryBuilder;
      },
      update: (payload: any) => {
        updateCalledWith = payload;
        return {
          eq: () => ({
            select: () => ({
              single: async () => ({ data: { id: 'user-123', ...payload }, error: null }),
            }),
          }),
        };
      },
      insert: (payload: any) => {
        // Not used in this test case
        return {
            select: () => ({
                single: async () => ({ data: {id: 'new-user', ...payload}, error: null})
            })
        }
      }
    };
  },
};

// Overwrite the actual supabase instance with our mock
Object.assign(supabase, mockSupabaseClient);

async function testFixVerification() {
  console.log('Running test to verify the fix...');

  await newsletterService.subscribe({
    email: 'test@example.com',
    source: 'blog_post_promo', // The new source, which should be ignored
    interests: ['Marketing Musical'],
  });

  assert(updateCalledWith, 'The update method was not called, something is wrong with the test setup.');

  console.log('The update method was called with this payload:', updateCalledWith);

  // The fix is successful if the `source` property is not in the update payload.
  assert.strictEqual(
    updateCalledWith.source,
    undefined,
    `FIX FAILED: The source was updated to '${updateCalledWith.source}' but should not have been.`
  );

  console.log("Test successful: The fix is verified.");
}

testFixVerification().catch(err => {
  console.error("Test failed to run:", err);
  process.exit(1);
});
