import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className='relative h-3 w-full grow overflow-hidden rounded-full bg-slate-200 shadow-inner'>
      <SliderPrimitive.Range className='absolute h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-teal-500 shadow-md' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='block h-6 w-6 rounded-full border-3 border-indigo-600 bg-white shadow-lg ring-offset-background transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer' />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
