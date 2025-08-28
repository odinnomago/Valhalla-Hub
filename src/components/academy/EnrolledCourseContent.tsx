
'use client';

import { useState } from 'react';
import type { Course } from '@/lib/mock-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, PlayCircle, Star } from 'lucide-react';
import { CourseSidebar } from '@/components/academy/CourseSidebar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface EnrolledCourseContentProps {
  course: Course;
}

export function EnrolledCourseContent({ course }: EnrolledCourseContentProps) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

  const handleLessonClick = (lessonTitle: string) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonTitle)) {
        newSet.delete(lessonTitle);
      } else {
        newSet.add(lessonTitle);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-muted/40">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid lg:grid-cols-[1fr_350px] gap-8 lg:gap-12">
          
          <div className="lg:col-start-2">
             <CourseSidebar course={course} isEnrolled={true} />
          </div>

          <div className="lg:col-start-1 lg:row-start-1">
             <div className="mb-8">
                <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                <h1 className="text-3xl lg:text-4xl font-bold font-headline mb-3">{course.title}</h1>
                <p className="text-lg text-foreground/80">{course.description}</p>
                 <div className="flex items-center gap-4 mt-4 text-sm">
                    <p className="text-muted-foreground">By <span className="font-semibold text-foreground">{course.instructor}</span></p>
                     <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold">{course.rating}</span>
                        <span className="text-muted-foreground">({course.students.toLocaleString()} ratings)</span>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold font-headline mb-4">Course Content</h2>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>{course.modules.length} modules</span>
                    <span>{totalLessons} lessons</span>
                    <span>{course.duration} total length</span>
                </div>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {course.modules.map((module, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="bg-card border-b-0 mb-2 rounded-lg">
                            <AccordionTrigger className="p-4 hover:no-underline">
                                <div className="text-left">
                                    <h3 className="font-bold">{module.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{module.lessons.length} lessons</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-2">
                                <ul className="divide-y divide-border">
                                    {module.lessons.map((lesson, lessonIndex) => {
                                        const isCompleted = completedLessons.has(lesson.title);
                                        return (
                                            <li 
                                                key={lessonIndex} 
                                                className="flex justify-between items-center p-3 hover:bg-muted rounded-md cursor-pointer"
                                                onClick={() => handleLessonClick(lesson.title)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {isCompleted ? (
                                                        <CheckCircle className="h-5 w-5 text-green-500"/>
                                                    ) : (
                                                        <PlayCircle className="h-5 w-5 text-muted-foreground"/>
                                                    )}
                                                    <span className={cn("text-foreground/80", { "line-through text-muted-foreground": isCompleted })}>
                                                        {lesson.title}
                                                    </span>
                                                </div>
                                                <span className="text-muted-foreground text-sm">{lesson.duration}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
             </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

