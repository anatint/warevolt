import { wixClient } from '@/lib/wixClient';
import { trackMeta } from '@/lib/metaPixel';

/** Wix CMS collection that stores every form submission as its own item (see "Form Submissions" in the Wix dashboard). */
const COLLECTION = 'FormSubmissions';

export type SubmissionData = {
  formSource: 'Contact Page Form' | 'Popup Form';
  fullName: string;
  workEmail: string;
  phone: string;
  companyName: string;
  // Contact Page Form only
  serviceInterestedIn?: string;
  monthlyOrderVolume?: string;
  message?: string;
  // Popup Form only
  orders?: string;
  orderCount?: string;
};

/** Saves one submission as a NEW item (never overwrites earlier ones). Rejects if Wix could not store it. */
export async function saveSubmission(data: SubmissionData): Promise<void> {
  const item: Record<string, string> = { pageUrl: typeof window !== 'undefined' ? window.location.href : '' };
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== '') item[key] = String(value).trim();
  }
  await wixClient.items.insert(COLLECTION, item);
  // Only counted as a Lead once Wix has actually stored the enquiry.
  trackMeta('Lead', { content_name: data.formSource });
}
