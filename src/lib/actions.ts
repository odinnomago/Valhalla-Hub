
'use server';

import { supabase, isDemoMode } from './supabase';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import type { Product, Review, Release, Course, Order } from './mock-data';
import { stripe } from './stripe';
import type Stripe from 'stripe';

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  category: z.enum(['Beat', 'Merch', 'Course', 'Sound Kit']),
  imageUrl: z.string().url(),
});

export async function addProduct(
    values: unknown, 
    sellerId: string, 
    sellerName: string
) {
  const validatedFields = productSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  if (isDemoMode) {
    return { error: 'Demo mode - please configure Supabase to add products.' };
  }

  const { name, description, price, category, imageUrl } = validatedFields.data;

  try {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        description,
        price,
        category,
        image_url: imageUrl,
        seller_id: sellerId,
        seller: sellerName,
        rating: 0,
        reviews: 0,
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error("Error adding product:", error);
      return { error: 'Failed to add product.' };
    }

    revalidatePath('/marketplace');
    revalidatePath('/');
    revalidatePath('/dashboard/products');
    return { success: 'Product added successfully!' };
  } catch (error: any) {
    console.error("Error adding product:", error);
    return { error: 'Failed to add product.' };
  }
}

export async function updateProduct(
    productId: string,
    values: unknown,
    userId: string
) {
    const validatedFields = productSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    if (isDemoMode) {
        return { error: 'Demo mode - please configure Supabase to update products.' };
    }

    const { name, description, price, category, imageUrl } = validatedFields.data;

    try {
        // First check if the product exists and user has permission
        const { data: product, error: fetchError } = await supabase
            .from('products')
            .select('seller_id')
            .eq('id', productId)
            .single();

        if (fetchError || !product) {
            return { error: 'Product not found.' };
        }

        if (product.seller_id !== userId) {
            return { error: 'You are not authorized to edit this product.' };
        }

        // Update the product
        const { error: updateError } = await supabase
            .from('products')
            .update({
                name,
                description,
                price,
                category,
                image_url: imageUrl,
            })
            .eq('id', productId);

        if (updateError) {
            console.error("Error updating product:", updateError);
            return { error: 'Failed to update product.' };
        }

        revalidatePath('/marketplace');
        revalidatePath(`/marketplace/${productId}`);
        revalidatePath('/');
        revalidatePath('/dashboard/products');
        
        return { success: 'Product updated successfully!' };
    } catch (error: any) {
        console.error("Error updating product:", error);
        return { error: 'Failed to update product.' };
    }
}


export async function deleteProduct(productId: string, userId: string) {
    if (!productId || !userId) {
        return { error: 'Missing product ID or user ID.' };
    }

    if (isDemoMode) {
        return { error: 'Demo mode - please configure Supabase to delete products.' };
    }

    try {
        // First check if the product exists and user has permission
        const { data: product, error: fetchError } = await supabase
            .from('products')
            .select('seller_id')
            .eq('id', productId)
            .single();

        if (fetchError || !product) {
            return { error: 'Product not found.' };
        }

        if (product.seller_id !== userId) {
            return { error: 'You are not authorized to delete this product.' };
        }

        const { error: deleteError } = await supabase
            .from('products')
            .delete()
            .eq('id', productId);

        if (deleteError) {
            console.error("Error deleting product:", deleteError);
            return { error: 'Failed to delete product.' };
        }

        revalidatePath('/marketplace');
        revalidatePath('/');
        revalidatePath('/dashboard/products');
        return { success: 'Product deleted successfully!' };

    } catch (error) {
        console.error("Error deleting product:", error);
        return { error: 'Failed to delete product.' };
    }
}


const releaseSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.enum(['Single', 'EP', 'Album']),
  releaseDate: z.string().min(1, { message: 'Release date is required'}),
  coverArt: z.string().url({ message: 'Please enter a valid image URL' }),
});

export async function addRelease(
    values: unknown, 
    artistId: string, 
    artistName: string
) {
  const validatedFields = releaseSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { title, type, releaseDate, coverArt } = validatedFields.data;
  
  const statuses = ['Live', 'Pending', 'Rejected', 'Draft'] as const;
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];


  try {
    await addDoc(collection(db, 'releases'), {
      title,
      type,
      releaseDate,
      coverArt,
      artistId,
      artist: artistName,
      status: randomStatus,
      platforms: ['spotify', 'apple', 'deezer'], // Default platforms
      createdAt: serverTimestamp(),
    });
    revalidatePath('/dashboard/releases');
    return { success: 'Release added successfully!' };
  } catch (error: any) {
    console.error("Error adding document: ", error);
    return { error: 'Failed to add release.' };
  }
}

export async function updateRelease(
    releaseId: string,
    values: unknown,
    userId: string
) {
    const validatedFields = releaseSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { title, type, releaseDate, coverArt } = validatedFields.data;

    try {
        const releaseRef = doc(db, 'releases', releaseId);
        const releaseSnap = await getDoc(releaseRef);

        if (!releaseSnap.exists()) {
            return { error: 'Release not found.' };
        }

        if (releaseSnap.data().artistId !== userId) {
            return { error: 'You are not authorized to edit this release.' };
        }

        await updateDoc(releaseRef, {
            title,
            type,
            releaseDate,
            coverArt,
        });

        revalidatePath('/dashboard/releases');
        
        return { success: 'Release updated successfully!' };
    } catch (error: any) {
        console.error("Error updating document: ", error);
        return { error: 'Failed to update release.' };
    }
}

export async function deleteRelease(releaseId: string, userId: string) {
    if (!releaseId || !userId) {
        return { error: 'Missing release ID or user ID.' };
    }

    try {
        const releaseRef = doc(db, 'releases', releaseId);
        const releaseSnap = await getDoc(releaseRef);

        if (!releaseSnap.exists()) {
            return { error: 'Release not found.' };
        }

        const releaseData = releaseSnap.data();
        if (releaseData.artistId !== userId) {
            return { error: 'You are not authorized to delete this release.' };
        }

        await deleteDoc(releaseRef);
        revalidatePath('/dashboard/releases');
        return { success: 'Release deleted successfully!' };

    } catch (error) {
        console.error("Error deleting release: ", error);
        return { error: 'Failed to delete release.' };
    }
}

export async function createPaymentIntent(
  items: Product[],
  buyerId: string
) {
  if (!items || items.length === 0) {
    return { error: "Your cart is empty." };
  }

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;
  const totalInCents = Math.round(total * 100);

  // In a real app, you would retrieve the customer or create a new one
  const customerId = 'cus_Pj9s2YnF1Zq3zX'; // Example customer ID

  try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalInCents,
        currency: 'usd',
        customer: customerId, // Associate with a customer
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            buyerId,
            items: JSON.stringify(items.map(item => ({ id: item.id, name: item.name, price: item.price, category: item.category, seller: item.seller, sellerId: item.sellerId })))
        }
    });

    return { clientSecret: paymentIntent.client_secret };

  } catch (error) {
    console.error("Error creating payment intent: ", error);
    return { error: 'Failed to create payment intent.' };
  }
}

// This function will now be called from a Stripe webhook handler
export async function createOrder(paymentIntent: Stripe.PaymentIntent) {
  const { buyerId, items: itemsJsonString } = paymentIntent.metadata;
  
  if (!buyerId || !itemsJsonString) {
    console.error("Webhook Error: Missing buyerId or items in metadata");
    return { error: 'Missing metadata from payment intent.' };
  }

  if (isDemoMode) {
    console.log("Demo mode: Order creation simulated");
    return { success: 'Order created successfully! (Demo mode)' };
  }

  const items = JSON.parse(itemsJsonString);
  const total = paymentIntent.amount_received ? paymentIntent.amount_received / 100 : 0;

   try {
    const orderData = {
        buyer_id: buyerId,
        stripe_payment_intent_id: paymentIntent.id,
        items,
        total,
        shipping_details: paymentIntent.shipping,
        status: 'Paid',
        created_at: new Date().toISOString(),
    };
    
    const { error } = await supabase
      .from('orders')
      .insert([orderData]);

    if (error) {
      console.error("Error creating order:", error);
      return { error: 'Failed to create order in Supabase.' };
    }
    
    // Invalidate user-specific paths after order creation
    revalidatePath(`/dashboard`);
    revalidatePath(`/dashboard/orders`);

    return { success: 'Order created successfully!' };
  } catch (error) {
    console.error("Error creating order:", error);
    return { error: 'Failed to create order in Supabase.' };
  }
}


const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(500),
});

export async function addReview(
  productId: string,
  values: unknown,
  authorId: string,
  authorName: string,
  authorPhotoUrl: string | null
) {
  const validatedFields = reviewSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { rating, comment } = validatedFields.data;

  try {
    const productRef = doc(db, 'products', productId);
    const reviewsCol = collection(productRef, 'reviews');

    // Add the new review in a subcollection
    await addDoc(reviewsCol, {
      authorId,
      authorName,
      authorPhotoUrl,
      rating,
      comment,
      createdAt: serverTimestamp(),
    });

    // Update the aggregate rating on the main product document in a transaction
    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);
      if (!productDoc.exists()) {
        throw "Product does not exist!";
      }

      const currentReviews = productDoc.data().reviews || 0;
      const currentRating = productDoc.data().rating || 0;
      
      const newReviewsCount = currentReviews + 1;
      const newRating = (currentRating * currentReviews + rating) / newReviewsCount;

      transaction.update(productRef, {
        reviews: newReviewsCount,
        rating: newRating,
      });
    });

    revalidatePath(`/marketplace/${productId}`);
    return { success: 'Review added successfully!' };
  } catch (error: any) {
    console.error("Error adding review: ", error);
    return { error: 'Failed to add review.' };
  }
}


const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be a positive number'),
  category: z.enum(['Production', 'Business', 'Instrument', 'Theory']),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  imageUrl: z.string().url('Please enter a valid image URL'),
});

export async function addCourse(values: unknown, instructorId: string, instructorName: string) {
  const validatedFields = courseSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const data = validatedFields.data;

  try {
    await addDoc(collection(db, 'courses'), {
      ...data,
      instructorId,
      instructor: instructorName,
      rating: 0,
      students: 0,
      modules: [], // Start with no modules
      createdAt: serverTimestamp(),
    });
    revalidatePath('/academy');
    revalidatePath('/dashboard/courses');
    return { success: 'Course created successfully!' };
  } catch (error) {
    console.error("Error adding course: ", error);
    return { error: 'Failed to create course.' };
  }
}

export async function updateCourse(courseId: string, values: unknown, userId: string) {
    const validatedFields = courseSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }
    const data = validatedFields.data;

    try {
        const courseRef = doc(db, 'courses', courseId);
        const courseSnap = await getDoc(courseRef);

        if (!courseSnap.exists() || courseSnap.data().instructorId !== userId) {
            return { error: 'Course not found or you do not have permission to edit it.' };
        }

        await updateDoc(courseRef, data);
        revalidatePath('/academy');
        revalidatePath(`/academy/${courseId}`);
        revalidatePath('/dashboard/courses');
        return { success: 'Course updated successfully!' };
    } catch (error) {
        console.error("Error updating course: ", error);
        return { error: 'Failed to update course.' };
    }
}

export async function deleteCourse(courseId: string, userId: string) {
    try {
        const courseRef = doc(db, 'courses', courseId);
        const courseSnap = await getDoc(courseRef);

        if (!courseSnap.exists() || courseSnap.data().instructorId !== userId) {
            return { error: 'Course not found or you do not have permission to delete it.' };
        }
        
        await deleteDoc(courseRef);
        revalidatePath('/academy');
        revalidatePath('/dashboard/courses');
        return { success: 'Course deleted successfully!' };
    } catch (error) {
        console.error("Error deleting course: ", error);
        return { error: 'Failed to delete course.' };
    }
}
