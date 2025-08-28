
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/mock-data';

import { Card, CardContent } from '@/components/ui/card';
import { Star, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const CATEGORIES = ['All', 'Beats', 'Merch', 'Courses', 'Sound Kits'] as const;
type Category = typeof CATEGORIES[number];

const RATINGS = [4, 3, 2, 1] as const;

export default function MarketplacePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  
  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      try {
        const productsCol = collection(db, 'products');
        const q = query(productsCol);
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    let productsToFilter = allProducts;

    if (selectedCategory !== 'All') {
      productsToFilter = productsToFilter.filter(
        product => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedRating !== null) {
      productsToFilter = productsToFilter.filter(
        product => product.rating >= selectedRating
      );
    }
    
    setFilteredProducts(productsToFilter);

  }, [selectedCategory, selectedRating, allProducts]);

  const handleRatingFilter = (rating: number) => {
    if (selectedRating === rating) {
      setSelectedRating(null); // Toggle off if clicked again
    } else {
      setSelectedRating(rating);
    }
  }

  return (
    <div className="container mx-auto px-4 pt-24 md:pt-28 pb-12 md:px-6">
      <div className="space-y-4 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Marketplace
          </span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4 font-headline">Filters</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Category</h4>
                  <div className="space-y-2">
                    {CATEGORIES.map(category => (
                      <Button 
                        key={category} 
                        variant={selectedCategory === category ? 'secondary' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 border-t pt-4">Rating</h4>
                  <div className="space-y-2">
                     {RATINGS.map(rating => (
                        <Button 
                          key={rating} 
                          variant={selectedRating === rating ? 'secondary' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => handleRatingFilter(rating)}
                        >
                           <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">& up</span>
                           </div>
                        </Button>
                     ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-muted-foreground">
                    {isLoading ? 'Loading products...' : `Showing ${filteredProducts.length} products`}
                </p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Sort by: Relevance</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Relevance</DropdownMenuItem>
                        <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                        <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                        <DropdownMenuItem>Top Rated</DropdownMenuItem>
                        <DropdownMenuItem>Newest</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
             {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
             ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl group">
                        <Link href={`/marketplace/${product.id}`}>
                        <div className="overflow-hidden relative">
                            <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-cover w-full h-56 transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint="product image"
                            />
                            <Badge variant="secondary" className="absolute top-2 left-2">{product.category}</Badge>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="text-xl font-bold font-headline truncate">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">by {product.seller}</p>
                            <div className="flex items-center justify-between mt-4">
                            <p className="text-lg font-bold text-primary">${product.price}</p>
                            <div className="flex items-center gap-1 text-sm">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span>{product.rating}</span>
                                <span className="text-muted-foreground">({product.reviews})</span>
                            </div>
                            </div>
                        </CardContent>
                        </Link>
                    </Card>
                    ))}
                </div>
            )}
        </main>
      </div>
    </div>
  );
}
