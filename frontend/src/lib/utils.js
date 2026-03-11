import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn() — shadcn utility for conditional Tailwind class merging.
 * Used internally by every shadcn component.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
