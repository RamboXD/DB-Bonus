import { Input } from "@/components";
import { CardDescription } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PatternInput } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const SecondStep: React.FC = () => {
  const form = useFormContext();

  return (
    <div className="flex flex-col">
      <CardDescription>Caregiver Date</CardDescription>
      <div className="flex flex-row gap-4">
        <div className="w-full flex flex-col gap-1">
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <Input placeholder="Your photo" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="caregivingType"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Caregiving Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Caregiving Type" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <FormField
            control={form.control}
            name="hourlyRate"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Hourly Rate</FormLabel>
                <FormControl>
                  <Input placeholder="Your Hourly Rate" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </div>
      <br />
    </div>
  );
};

export default SecondStep;
