
'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { courses } from '@/lib/mock-data';
import { EnrolledCourseContent } from '@/components/academy/EnrolledCourseContent';
import { Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { user, loading: authLoading } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const course = courses.find((c) => c.id === params.id);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (authLoading) return;
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const ordersCol = collection(db, 'orders');
        const q = query(
          ordersCol,
          where('buyerId', '==', user.uid),
          where('items', 'array-contains-any', [{ id: params.id, name: course?.title, price: course?.price, category: 'Course', sellerId: course?.instructor, seller: course?.instructor }])
        );
        
        const querySnapshot = await getDocs(q);

        // A simple check to see if any order contains the course ID.
        let enrolled = false;
        querySnapshot.forEach(doc => {
            const orderItems = doc.data().items as any[];
            if (orderItems.some(item => item.id === params.id)) {
                enrolled = true;
            }
        });
        
        setIsEnrolled(enrolled);

      } catch (error) {
        console.error("Error checking enrollment: ", error);
        setIsEnrolled(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkEnrollment();
  }, [user, authLoading, params.id, course]);

  if (!course) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Checking your enrollment...</p>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Lock className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold font-headline">Access Denied</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          You are not enrolled in this course. Please purchase it to gain access.
        </p>
        <Button asChild className="mt-6">
          {/* We link to the main academy page for simplicity, but could link to product page */}
          <Link href="/academy">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  return <EnrolledCourseContent course={course} />;
}
