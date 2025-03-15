import { z } from "zod";

//  1 - Define the full fields for the entire form
export const CampaignFormSchema = z.object({
  name: z.string().min(5),
  owner: z.string().min(5),
  url: z.string().url(),
});

//  2 - create the type
export type CampaignFormType = z.infer<typeof CampaignFormSchema>;
