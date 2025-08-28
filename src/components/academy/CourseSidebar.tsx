
'use client';

import Image from 'next/image';
import type { Course, Product } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, Users, BarChart, Share2, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

interface CourseSidebarProps {
  course: Course;
  isEnrolled?: boolean;
}

export function CourseSidebar({ course, isEnrolled = false }: CourseSidebarProps) {
  const { addItem } = useCart();
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

  const handleAddToCart = () => {
    const courseAsProduct: Product = {
      id: course.id,
      name: course.title,
      price: course.price,
      imageUrl: course.imageUrl,
      category: 'Course',
      seller: course.instructor,
      sellerId: course.instructor, 
      rating: course.rating,
      reviews: course.students,
      description: course.description,
    };
    addItem(courseAsProduct);
  }

  return (
    <div className="sticky top-24">
      <Card className="overflow-hidden">
        <CardHeader className="p-0 border-b">
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={600}
            height={400}
            className="object-cover w-full aspect-[3/2]"
            data-ai-hint="online course promo"
            priority
          />
        </CardHeader>
        <CardContent className="p-6">
          {isEnrolled ? (
            <div className='text-center bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 p-3 rounded-md mb-4 flex items-center justify-center gap-2'>
              <CheckCircle className="h-5 w-5"/>
              <span className="font-bold">You are enrolled</span>
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold mb-4">${course.price}</div>
              <Button size="lg" className="w-full mb-4" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5"/>
                Add to Cart
              </Button>
            </>
          )}

          <div className="space-y-3 text-sm">
             <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{totalLessons} lessons ({course.duration})</span>
              </div>
               <div className="flex items-center gap-2 text-muted-foreground">
                  <BarChart className="h-4 w-4 -rotate-90" />
                  <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{course.students.toLocaleString()} students</span>
              </div>
          </div>
          <Button variant="outline" className="w-full mt-6">
            <Share2 className="mr-2 h-4 w-4"/>
            Share
          </Button>
        </CardContent>
      </Card>
      {!isEnrolled && (
        <p className="text-xs text-muted-foreground text-center mt-4">30-Day Money-Back Guarantee</p>
      )}
    </div>
  );
}
