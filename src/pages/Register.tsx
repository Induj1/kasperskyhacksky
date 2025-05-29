import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { HackathonRulesDialog } from '@/components/HackathonRulesDialog';
import { CodeOfConductDialog } from '@/components/CodeOfConductDialog';
import TeamMemberForm from '@/components/TeamMemberForm';
import { useRegistration } from '@/hooks/useRegistration';
import { Plus } from 'lucide-react';

const teamMemberSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  role: z.string().min(2, { message: 'Please specify the role.' }),
});

const teamFormSchema = z.object({
  teamName: z.string().min(2, { message: 'Team name must be at least 2 characters.' }),
  teamSize: z.string({ required_error: 'Please select team size.' }),
  leaderName: z.string().min(2, { message: 'Leader name must be at least 2 characters.' }),
  leaderEmail: z.string().email({ message: 'Please enter a valid email address.' }),
  leaderPhone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  institution: z.string().min(2, { message: 'Please enter your institution or company name.' }),
  track: z.string({ required_error: 'Please select a track.' }),
  teamMembers: z.array(teamMemberSchema).max(3, { message: 'Maximum 3 team members allowed.' }),
  termsAccepted: z.boolean()
    .refine(val => val === true, {
      message: 'You must accept the terms and conditions.',
    }),
  dataConsent: z.boolean()
    .refine(val => val === true, {
      message: 'You must consent to data sharing to participate.',
    }),
});

type TeamFormValues = z.infer<typeof teamFormSchema>;

const Register = () => {
  const { submitRegistration, isSubmitting } = useRegistration();

  const teamForm = useForm<TeamFormValues>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      teamName: '',
      leaderName: '',
      leaderEmail: '',
      leaderPhone: '',
      institution: '',
      teamMembers: [],
      termsAccepted: false,
      dataConsent: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: teamForm.control,
    name: 'teamMembers',
  });

  const teamSize = teamForm.watch('teamSize');
  const currentTeamMembers = teamForm.watch('teamMembers');

  const addTeamMember = () => {
    if (fields.length < 3) {
      append({ name: '', email: '', role: '' });
    }
  };

  const removeTeamMember = (index: number) => {
    remove(index);
  };

  const onTeamSubmit = async (data: TeamFormValues) => {
    console.log('Form submission started with data:', data);
    
    // Validate team size matches team members
    const expectedMembers = parseInt(data.teamSize) - 1; // -1 for leader
    if (data.teamMembers.length !== expectedMembers) {
      teamForm.setError('teamMembers', {
        message: `Please add exactly ${expectedMembers} team member${expectedMembers !== 1 ? 's' : ''} for a team of ${data.teamSize}.`,
      });
      return;
    }

    // Convert form data to registration data with proper types
    const registrationData = {
      teamName: data.teamName,
      teamSize: data.teamSize,
      leaderName: data.leaderName,
      leaderEmail: data.leaderEmail,
      leaderPhone: data.leaderPhone,
      institution: data.institution,
      track: data.track,
      teamMembers: data.teamMembers.map(member => ({
        name: member.name || '',
        email: member.email || '',
        role: member.role || ''
      })),
      termsAccepted: data.termsAccepted,
      dataConsent: data.dataConsent,
    };

    const success = await submitRegistration(registrationData);
    if (success) {
      teamForm.reset();
    }
  };

  // Update team members when team size changes
  React.useEffect(() => {
    if (teamSize) {
      const requiredMembers = parseInt(teamSize) - 1; // -1 for leader
      const currentMembersCount = fields.length;
      
      if (currentMembersCount < requiredMembers) {
        // Add missing members
        for (let i = currentMembersCount; i < requiredMembers; i++) {
          append({ name: '', email: '', role: '' });
        }
      } else if (currentMembersCount > requiredMembers) {
        // Remove extra members
        for (let i = currentMembersCount - 1; i >= requiredMembers; i--) {
          remove(i);
        }
      }
    }
  }, [teamSize, fields.length, append, remove]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen binary-bg pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center glow-text">Register for the Hackathon</h1>
              <p className="text-xl text-gray-300 text-center mb-12">
                Join us for an exciting weekend of innovation and problem-solving.
              </p>
              
              <div className="bg-cyber-darker p-6 rounded-lg border border-cyber-green/20 mb-10">
                <h2 className="text-xl font-bold mb-4">Registration Details</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Registration is free for all participants</li>
                  <li>Last date to register: July 1, 2025</li>
                  <li>Teams must have exactly 1-3 members</li>
                  <li>Confirmation emails will be sent within 48 hours</li>
                </ul>
              </div>
              
              <div className="bg-cyber-gray/30 p-6 rounded-lg border border-cyber-green/10">
                <Form {...teamForm}>
                  <form onSubmit={teamForm.handleSubmit(onTeamSubmit)} className="space-y-6">
                    
                    <FormField
                      control={teamForm.control}
                      name="teamName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Name</FormLabel>
                          <FormControl>
                            <Input placeholder="CyberDefenders" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teamForm.control}
                      name="teamSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team Size</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Member (Solo)</SelectItem>
                              <SelectItem value="2">2 Members</SelectItem>
                              <SelectItem value="3">3 Members</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="p-4 border border-cyber-green/10 rounded-md bg-cyber-gray/20 space-y-6">
                      <h3 className="text-lg font-semibold">Team Leader Information</h3>
                      
                      <FormField
                        control={teamForm.control}
                        name="leaderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={teamForm.control}
                          name="leaderEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="john.doe@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={teamForm.control}
                          name="leaderPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 12345 67890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={teamForm.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution/Company</FormLabel>
                          <FormControl>
                            <Input placeholder="MIT-BLR / Kaspersky" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teamForm.control}
                      name="track"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selected Track</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a track" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ics-transformation">The Transformation of ICS and the Emergence of Cyber Threats</SelectItem>
                              <SelectItem value="ai-deepfake">AI vs AI – Detecting Deepfake & Misinformation</SelectItem>
                              <SelectItem value="honey-trapper">Trapping the Honey Trapper</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {teamSize && parseInt(teamSize) > 1 && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold">Team Members</h3>
                          <span className="text-sm text-gray-400">
                            {fields.length} of {parseInt(teamSize) - 1} members added
                          </span>
                        </div>
                        
                        {fields.map((field, index) => (
                          <TeamMemberForm
                            key={field.id}
                            control={teamForm.control}
                            memberIndex={index}
                            onRemove={() => removeTeamMember(index)}
                            canRemove={false} // Members are automatically managed based on team size
                          />
                        ))}
                        
                        <FormMessage>{teamForm.formState.errors.teamMembers?.message}</FormMessage>
                      </div>
                    )}
                    
                    <FormField
                      control={teamForm.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-cyber-gray/20">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I accept the terms and conditions
                            </FormLabel>
                            <div className="text-sm text-muted-foreground">
                              By registering, you agree to the <HackathonRulesDialog /> and <CodeOfConductDialog />.
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={teamForm.control}
                      name="dataConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-cyber-gray/20">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Data Sharing Consent
                            </FormLabel>
                            <div className="text-sm text-muted-foreground">
                              I consent to share my registration data with Kaspersky, its affiliates, and partners for event-related communications and future opportunities.
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Register;
