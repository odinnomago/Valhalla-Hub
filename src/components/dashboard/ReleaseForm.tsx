
'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { addRelease, updateRelease } from '@/lib/actions';
import type { Release } from '@/lib/mock-data';
import { format, parseISO } from 'date-fns';
import { generateCoverArt } from '@/ai/flows/cover-art-generator';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Wand2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Textarea } from '../ui/textarea';

const releaseSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.enum(['Single', 'EP', 'Album']),
  releaseDate: z.date({
    required_error: "A release date is required.",
  }),
  coverArt: z.string().url({ message: 'Please enter a valid image URL or generate one.' }),
  artPrompt: z.string().optional(),
});

type ReleaseFormValues = z.infer<typeof releaseSchema>;

interface ReleaseFormProps {
    onFormSubmit: () => void;
    release?: Release | null;
}

export function ReleaseForm({ onFormSubmit, release = null }: ReleaseFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isGeneratingArt, startArtGeneration] = useTransition();
  const [generatedArt, setGeneratedArt] = useState<string | null>(null);
  const isEditMode = release !== null;

  const form = useForm<ReleaseFormValues>({
    resolver: zodResolver(releaseSchema),
    defaultValues: {
      title: '',
      type: 'Single',
      releaseDate: undefined,
      coverArt: '',
      artPrompt: '',
    },
  });

  useEffect(() => {
    if (isEditMode && release) {
      form.reset({
        title: release.title,
        type: release.type,
        releaseDate: release.releaseDate ? parseISO(release.releaseDate) : undefined,
        coverArt: release.coverArt,
      });
      setGeneratedArt(release.coverArt);
    }
  }, [isEditMode, release, form]);

  const handleGenerateArt = () => {
    const prompt = form.getValues('artPrompt');
    if (!prompt || prompt.length < 10) {
        toast({ title: "Prompt too short", description: "Please provide a more detailed description for the cover art.", variant: "destructive" });
        return;
    }
    startArtGeneration(async () => {
        try {
            const result = await generateCoverArt({ prompt });
            setGeneratedArt(result.coverArtUrl);
            form.setValue('coverArt', result.coverArtUrl, { shouldValidate: true });
            toast({ title: "Art Generated!", description: "Your new cover art has been generated and applied." });
        } catch (error) {
            console.error("Art generation failed:", error);
            toast({ title: "Generation Failed", description: "Something went wrong. Please try again.", variant: "destructive" });
        }
    });
  }

  const onSubmit = (values: ReleaseFormValues) => {
    if (!user) {
        toast({ title: 'Error', description: 'You must be logged in.', variant: 'destructive' });
        return;
    }
    
    startTransition(async () => {
      const { artPrompt, ...releaseData } = {
        ...values,
        releaseDate: format(values.releaseDate, "yyyy-MM-dd"),
      };
      
      const result = isEditMode && release
        ? await updateRelease(release.id, releaseData, user.uid)
        : await addRelease(releaseData, user.uid, user.displayName || 'Anonymous');

      if (result.error) {
        toast({
          title: `Failed to ${isEditMode ? 'Update' : 'Add'} Release`,
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success!',
          description: `Your release has been ${isEditMode ? 'updated' : 'added'}.`,
        });
        onFormSubmit();
        if (!isEditMode) {
            form.reset();
            setGeneratedArt(null);
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Neon Dreams" {...field} disabled={isPending || isGeneratingArt} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} disabled={isPending || isGeneratingArt}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a release type" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="EP">EP</SelectItem>
                        <SelectItem value="Album">Album</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Release Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isPending || isGeneratingArt}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
            <FormField
            control={form.control}
            name="artPrompt"
            render={({ field }) => (
                <FormItem>
                <FormLabel>AI Cover Art Prompt</FormLabel>
                <FormControl>
                    <Textarea placeholder="e.g., An astronaut floating in a neon ocean, digital art" {...field} disabled={isPending || isGeneratingArt}/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="button" variant="secondary" onClick={handleGenerateArt} disabled={isPending || isGeneratingArt}>
                {isGeneratingArt ? <Loader2 className="mr-2 h-4 animate-spin"/> : <Wand2 className="mr-2"/>}
                {isGeneratingArt ? 'Generating...' : 'Generate Art'}
            </Button>
        </div>
        
        <FormField
          control={form.control}
          name="coverArt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Art URL</FormLabel>
               {generatedArt && (
                <div className="relative aspect-square w-full max-w-sm mx-auto rounded-md overflow-hidden border">
                    <Image src={generatedArt} alt="Generated cover art" layout="fill" objectFit="cover" />
                </div>
               )}
              <FormControl>
                <Input placeholder="https://... or generate with AI" {...field} disabled={isPending || isGeneratingArt} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending || isGeneratingArt}>
          {isPending ? <Loader2 className="mr-2 h-4 animate-spin" /> : isEditMode ? 'Save Changes' : 'Add Release'}
        </Button>
      </form>
    </Form>
  );
}
