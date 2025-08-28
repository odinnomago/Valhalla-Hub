
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { CourseTable } from "@/components/dashboard/CourseTable";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CourseForm } from '@/components/dashboard/CourseForm';
import { useAuth } from '@/hooks/useAuth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Course } from '@/lib/mock-data';

export default function CoursesPage() {
  const { user, loading: authLoading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchCourses = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const coursesCol = collection(db, 'courses');
      const q = query(coursesCol, where("instructorId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const userCourses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
      setCourses(userCourses);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchCourses();
    } else if (!authLoading && !user) {
      setIsLoading(false);
    }
  }, [user, authLoading, fetchCourses]);

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    fetchCourses();
  }

  const handleCourseAction = () => {
    fetchCourses();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Your Courses</h1>
          <p className="text-muted-foreground">Manage your educational content.</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2"/>
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new course. You can add modules and lessons later.
              </DialogDescription>
            </DialogHeader>
            <CourseForm onFormSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      <CourseTable onCourseAction={handleCourseAction} courses={courses} isLoading={isLoading} />
    </div>
  )
}
