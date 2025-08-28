
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Release } from '@/lib/mock-data';

import { Button } from "@/components/ui/button";
import { ReleaseTable } from "@/components/dashboard/ReleaseTable";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReleaseForm } from '@/components/dashboard/ReleaseForm';


export default function ReleasesPage() {
  const { user, loading: authLoading } = useAuth();
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const fetchReleases = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const releasesCol = collection(db, 'releases');
      const q = query(releasesCol, where("artistId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const userReleases = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Release));
      setReleases(userReleases);
    } catch (error) {
      console.error("Error fetching releases: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchReleases();
    } else if (!authLoading && !user) {
      setIsLoading(false);
    }
  }, [user, authLoading, fetchReleases]);

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    fetchReleases(); 
  }

  const handleReleaseAction = () => {
    fetchReleases();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Your Releases</h1>
          <p className="text-muted-foreground">Manage your discography and distribute to platforms.</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2"/>
              New Release
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Release</DialogTitle>
              <DialogDescription>
                Fill in the details for your new release.
              </DialogDescription>
            </DialogHeader>
            <ReleaseForm onFormSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      <ReleaseTable releases={releases} isLoading={isLoading} onReleaseAction={handleReleaseAction} />
    </div>
  )
}
