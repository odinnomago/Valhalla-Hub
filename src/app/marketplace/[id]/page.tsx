
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product, Review } from '@/lib/mock-data';
import { artists } from '@/lib/mock-data'; // Keep for seller fallback for now
import { useState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/useAuth';
import { addReview } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, ShieldCheck, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';


const reviewSchema = z.object({
    rating: z.number().min(1, "Please select a rating").max(5),
    comment: z.string().min(10, "Comment must be at least 10 characters").max(500, "Comment must be 500 characters or less"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;


async function getArtist(id: string) {
    // This function can be adapted for Firestore later if needed
    return artists.find(a => a.id === id) || null;
}


export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [seller, setSeller] = useState<typeof artists[0] | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  
  const { user } = useAuth();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const reviewForm = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: '' },
  });
  const [hoverRating, setHoverRating] = useState(0);

  const fetchProductData = async () => {
      setIsLoading(true);
      const docRef = doc(db, 'products', params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const productData = { id: docSnap.id, ...docSnap.data() } as Product;
        setProduct(productData);
        if (productData.sellerId) {
          const artistData = await getArtist(productData.sellerId);
          setSeller(artistData);
        }
      } else {
        notFound();
      }
      setIsLoading(false);
  };
  
  const fetchReviews = async () => {
    setIsReviewsLoading(true);
    const reviewsCol = collection(db, 'products', params.id, 'reviews');
    const q = query(reviewsCol, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const fetchedReviews = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}) as Review);
    setReviews(fetchedReviews);
    setIsReviewsLoading(false);
  }

  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [params.id]);
  
  const handleReviewSubmit = (values: ReviewFormValues) => {
    if (!user) {
        toast({ title: "Please log in", description: "You must be logged in to leave a review.", variant: "destructive" });
        return;
    }
    startTransition(async () => {
        const result = await addReview(params.id, values, user.uid, user.displayName || 'Anonymous', user.photoURL);
        if (result.error) {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        } else {
            toast({ title: "Success!", description: "Your review has been submitted." });
            reviewForm.reset();
            // Refetch reviews and product data to show new review and updated rating
            fetchReviews();
            fetchProductData();
        }
    });
  }

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div>
          <Card className="overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={800}
              className="object-cover w-full"
              data-ai-hint="product details"
              priority
            />
          </Card>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="secondary" className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <span>by</span>
                <span className="font-semibold text-primary">
                    {product.seller}
                </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
              ))}
            </div>
            <span className="text-muted-foreground">{product.rating.toFixed(1)} ({product.reviews} reviews)</span>
          </div>

          <p className="text-foreground/80 text-lg leading-relaxed">{product.description}</p>

          <div className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1" onClick={() => addItem(product)}>
              <ShoppingCart className="mr-2" />
              Add to Cart
            </Button>
            <Button size="lg" variant="secondary" className="flex-1">
              Buy Now
            </Button>
          </div>
          
          <div className="border-t pt-4 text-sm text-muted-foreground flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <span>Secure transaction. 30-day money back guarantee.</span>
          </div>

          {seller && (
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-headline">About the Seller</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={seller.imageUrl} alt={seller.name}/>
                        <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <span className="font-bold text-lg">{seller.name}</span>
                        <p className="text-sm text-muted-foreground">{seller.genres.join(' / ')}</p>
                    </div>
                </CardContent>
             </Card>
          )}
        </div>
      </div>

       {/* Reviews Section */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold font-headline mb-6">Customer Reviews ({reviews.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                {isReviewsLoading ? (
                    <p>Loading reviews...</p>
                ) : reviews.length > 0 ? (
                    reviews.map(review => (
                        <Card key={review.id}>
                            <CardContent className="p-6">
                                <div className="flex items-center mb-2">
                                    <Avatar className="h-10 w-10 mr-4">
                                        <AvatarImage src={review.authorPhotoUrl || `https://picsum.photos/seed/${review.authorId}/100/100`} />
                                        <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{review.authorName}</p>
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`}/>)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-foreground/80">{review.comment}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>Be the first to review this product!</p>
                )}
             </div>
             <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Leave a Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user ? (
                            <Form {...reviewForm}>
                                <form onSubmit={reviewForm.handleSubmit(handleReviewSubmit)} className="space-y-4">
                                    <FormField
                                        control={reviewForm.control}
                                        name="rating"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Rating</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                className={`cursor-pointer h-6 w-6 ${
                                                                    (hoverRating || field.value) >= star
                                                                    ? 'text-amber-400 fill-amber-400'
                                                                    : 'text-muted-foreground'
                                                                }`}
                                                                onMouseEnter={() => setHoverRating(star)}
                                                                onMouseLeave={() => setHoverRating(0)}
                                                                onClick={() => field.onChange(star)}
                                                            />
                                                        ))}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={reviewForm.control}
                                        name="comment"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Comment</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Tell us what you think..." {...field} disabled={isPending}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={isPending}>
                                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                        Submit Review
                                    </Button>
                                </form>
                            </Form>
                        ) : (
                            <p className="text-muted-foreground">You must be <Link href="/auth/login" className="underline text-primary">logged in</Link> to leave a review.</p>
                        )}
                    </CardContent>
                </Card>
             </div>
          </div>
        </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
     <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Card className="overflow-hidden">
            <Skeleton className="w-full h-[600px]" />
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-1/3 mt-2" />
          </div>
           <Skeleton className="h-6 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
          <Skeleton className="h-12 w-1/3" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
           <Skeleton className="h-6 w-full" />
           <Card>
              <CardHeader>
                  <Skeleton className="h-8 w-1/2" />
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-28 mt-2" />
                  </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
