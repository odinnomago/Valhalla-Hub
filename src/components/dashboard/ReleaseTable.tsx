
'use client';

import { useState, useTransition } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Release } from "@/lib/mock-data";
import { deleteRelease } from "@/lib/actions";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MoreHorizontal, Loader2 } from "lucide-react";
import { cva } from "class-variance-authority";
import { ReleaseForm } from "./ReleaseForm";

// Define an SVG icon component for Spotify
const SpotifyIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"><title>Spotify</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.923 17.15c-.24.36-.69.48-1.05.24-2.94-1.8-6.6-2.16-11.04-.6- .42.12-.84-.12-.96-.54s.12-.84.54-.96c4.74-1.68 8.7-1.26 11.94.66.36.24.48.69.24 1.05zm1.5-3.3c-.3.45-.87.6-1.32.3-3.24-1.98-8.16-2.58-12.06-.9- .48.18-.99-.15-1.17-.63s.15-.99.63-1.17c4.32-1.8 9.6-1.14 13.26 1.02.45.3.6.87.3 1.32zm.12-3.42c-3.72-2.34-9.84-2.52-13.62-.96-.54.24-1.14-.09-1.38-.63s.09-1.14.63-1.38c4.26-1.74 10.74-1.5 14.94 1.08.54.36.72.99.36 1.53-.36.54-.99.72-1.53.36z"/></svg>
);
// Define an SVG icon component for Apple Music
const AppleMusicIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"><title>Apple Music</title><path d="M12.16,4.63c.27-.42,1.23-1.8,2.7-1.95,1.06-.08,2.32.59,2.94,1.17a5.72,5.72,0,0,1,1.5,3.95C19.34,12.29,15.6,12.8,15.6,12.8s.08,4.24,0,4.32c-.17.17-1,.5-1.79.48-.89-.08-1.89-.68-2.61-1.34s-1.28-1.5-1.92-2.91C8,11.33,7,8.07,8.23,6.2A5.13,5.13,0,0,1,12.16,4.63Zm-1-2.48A5.5,5.5,0,0,0,7.5,3.7C4.6,5.3,4.48,9.08,6.2,12.28c.9,1.67,1.8,2.83,3,3.75s2.21,1.15,3.23,1.07c1.1-.08,1.93-.5,2.44-.86s.6-.8.6-1.23-.27-1.11-.27-1.11.39,2.15,2.1,2.15,2.58-2.4,2.58-4.75a6.65,6.65,0,0,0-1.88-4.73c-.93-.83-2.1-1.31-3.18-1.23-1.75.08-3,1.49-3.48,2.13Z"/></svg>
);
// Define an SVG icon component for Deezer
const DeezerIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"><title>Deezer</title><path d="M12.585 5.582H24v2.736h-5.021v2.775H24v2.737h-5.021v2.775H24V19.34h-5.021v2.775H12.585V5.582zM6.292 5.582h5.022v2.736H0V5.582h6.292zm0 5.511h5.022v2.775H0v-2.775h6.292zm0 5.512h5.022v2.737H0v-2.737h6.292z"/></svg>
);

const statusVariants = cva("capitalize", {
  variants: {
    status: {
      Live: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
      Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
      Rejected: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
      Draft: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    },
  },
});

interface ReleaseTableProps {
  releases: Release[];
  isLoading: boolean;
  onReleaseAction: () => void;
}

export function ReleaseTable({ releases, isLoading, onReleaseAction }: ReleaseTableProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  const platformIcons = {
    spotify: <SpotifyIcon />,
    apple: <AppleMusicIcon />,
    deezer: <DeezerIcon />,
  };

  const handleEditClick = (release: Release) => {
    setSelectedRelease(release);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (release: Release) => {
    setSelectedRelease(release);
    setIsDeleteDialogOpen(true);
  };
  
  const handleFormSubmit = () => {
    setIsEditDialogOpen(false);
    onReleaseAction();
  };

  const handleDeleteConfirm = () => {
    if (!selectedRelease || !user) return;

    startTransition(async () => {
      const result = await deleteRelease(selectedRelease.id, user.uid);
      if (result.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Release deleted successfully." });
        onReleaseAction();
      }
      setIsDeleteDialogOpen(false);
      setSelectedRelease(null);
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Releases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[80px] sm:table-cell">
                  <span className="sr-only">Cover Art</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Release Date</TableHead>
                <TableHead className="hidden md:table-cell">Platforms</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {releases.length > 0 ? (
                releases.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={release.title}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={release.coverArt}
                        width="64"
                        data-ai-hint="album cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{release.title}</TableCell>
                    <TableCell>{release.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusVariants({ status: release.status })}>
                        {release.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{release.releaseDate}</TableCell>
                    <TableCell className="hidden md:table-cell">
                       <div className="flex items-center gap-2">
                         {release.platforms.map(p => <div key={p} className="text-muted-foreground">{platformIcons[p as keyof typeof platformIcons]}</div>)}
                       </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onSelect={() => handleEditClick(release)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onSelect={() => handleDeleteClick(release)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    You haven't submitted any releases yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Release</DialogTitle>
            <DialogDescription>Make changes to your release details below.</DialogDescription>
          </DialogHeader>
          <ReleaseForm onFormSubmit={handleFormSubmit} release={selectedRelease} />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your release.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 animate-spin" />}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
