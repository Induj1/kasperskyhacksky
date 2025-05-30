import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  name: string;
  email: string;
  role: string;
}

interface RegistrationData {
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  institution: string;
  track: string;
  teamMembers: TeamMember[];
  termsAccepted: boolean;
  dataConsent: boolean;
}

export const useRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitRegistration = async (data: RegistrationData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting registration data:', data);
      
      // Use type assertion to work with the registrations table
      const { error } = await (supabase as any)
        .from('registrations')
        .insert([
          {
            team_name: data.teamName,
            team_size: 3, // Fixed team size of 3
            leader_name: data.leaderName,
            leader_email: data.leaderEmail,
            leader_phone: data.leaderPhone,
            institution: data.institution,
            track: data.track,
            team_members: data.teamMembers,
            terms_accepted: data.termsAccepted,
            data_consent: data.dataConsent,
          },
        ]);

      if (error) {
        console.error('Registration error:', error);
        toast({
          title: 'Registration Failed',
          description: 'There was an error submitting your registration. Please try again.',
          variant: 'destructive',
        });
        return false;
      }

      toast({
        title: 'Registration Successful!',
        description: 'Your team registration has been submitted. Check your email for confirmation.',
      });
      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Registration Failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitRegistration, isSubmitting };
};
