
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Control } from 'react-hook-form';

interface TeamMember {
  name: string;
  email: string;
  role: string;
}

interface TeamMemberFormProps {
  control: Control<any>;
  memberIndex: number;
  onRemove: () => void;
  canRemove: boolean;
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ 
  control, 
  memberIndex, 
  onRemove, 
  canRemove 
}) => {
  return (
    <div className="p-4 border border-cyber-green/10 rounded-md bg-cyber-gray/20 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-semibold">Team Member {memberIndex + 1}</h4>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-400 hover:text-red-300"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <FormField
        control={control}
        name={`teamMembers.${memberIndex}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Jane Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name={`teamMembers.${memberIndex}.email`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="jane.doe@example.com" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name={`teamMembers.${memberIndex}.role`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role/Specialization</FormLabel>
            <FormControl>
              <Input placeholder="Frontend Developer, ML Engineer, etc." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TeamMemberForm;
