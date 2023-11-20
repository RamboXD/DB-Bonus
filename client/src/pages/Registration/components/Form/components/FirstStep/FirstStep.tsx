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

const FirstStep: React.FC = () => {
  const form = useFormContext();

  return (
    <div className="flex flex-col">
      <CardDescription>User Date</CardDescription>
      <div className="flex flex-row gap-4">
        <div className="w-full flex flex-col gap-1">
          <FormField
            control={form.control}
            name="givenName"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ваше имя" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileDescription"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Profile Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter profile description" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <PatternInput
                    format="+7-(###)-###-####"
                    mask="_"
                    placeholder="Phone number"
                    onValueChange={(value) => field.onChange(value.value)}
                    type="tel"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Your surname" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="City"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel>City</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Astana">Astana</SelectItem>
                    <SelectItem value="Almaty">Almaty</SelectItem>
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

export default FirstStep;
