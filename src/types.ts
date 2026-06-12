export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  height?: number;
  weight?: number;
  bmiScore?: number;
  fitnessCategory?: string;
  role: 'user' | 'admin';
  createdAt: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceQuarterly: number;
  priceAnnual: number;
  features: string[];
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  status: 'active' | 'cancelled' | 'expired';
  amountPaid: number;
  startDate: number;
  endDate: number;
  receiptId: string;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  story: string;
  rating: number;
}

export interface Trainer {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  experience: string;
  socials: {
    instagram?: string;
    twitter?: string;
  };
}
