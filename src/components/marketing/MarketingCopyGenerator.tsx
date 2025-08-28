'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateMarketingCopy } from '@/ai/flows/marketing-copy-generator';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Copy, Check } from 'lucide-react';

const formSchema = z.object({
  musicAttributes: z.string().min(10, 'Please describe your music in a bit more detail.'),
  targetAudience: z.string().min(3, 'Please describe your target audience.'),
  promotionGoal: z.string().min(3, 'Please describe your promotion goal.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function MarketingCopyGenerator() {
  const [generatedCopy, setGeneratedCopy] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      musicAttributes: '',
      targetAudience: '',
      promotionGoal: '',
    },
  });

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);
    setGeneratedCopy([]);
    try {
      const result = await generateMarketingCopy(values);
      setGeneratedCopy(result.marketingCopyOptions);
    } catch (error) {
      console.error('Failed to generate marketing copy:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate marketing copy. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="musicAttributes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Music Attributes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Upbeat synthwave with dreamy vocals, 80s retro vibe..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Fans of retro gaming and sci-fi movies" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="promotionGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promotion Goal</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Promote new single 'Neon Dreams'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Copy
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || generatedCopy.length > 0) && (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center font-headline">Generated Options</h2>
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className="p-6">
                           <div className="space-y-3 animate-pulse">
                               <div className="h-4 bg-muted rounded w-3/4"></div>
                               <div className="h-4 bg-muted rounded w-full"></div>
                               <div className="h-4 bg-muted rounded w-5/6"></div>
                           </div>
                        </Card>
                    ))}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedCopy.map((copy, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Option {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-foreground/90 whitespace-pre-wrap">{copy}</p>
                        </CardContent>
                        <div className="p-4 pt-0">
                             <Button variant="ghost" size="sm" onClick={() => handleCopy(copy, index)}>
                                {copiedIndex === index ? (
                                    <Check className="mr-2 h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="mr-2 h-4 w-4" />
                                )}
                                {copiedIndex === index ? 'Copied!' : 'Copy'}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
