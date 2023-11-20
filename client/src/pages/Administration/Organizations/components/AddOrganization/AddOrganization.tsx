import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormStep,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { signXML } from "@/constants/signXml";
import { useAddressSearch } from "@/hooks/useAddressSearch";
import { useSocket } from "@/hooks/useSocket";
import { cn } from "@/lib/utils";
import { sign_xml } from "@/pages/Registration/api";
import SecondStep from "@/pages/Registration/components/Form/components/SecondStep/SecondStep";
import { ecpData } from "@/ts/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createOrganization } from "../../api";

const addOrganizationSchema = z.object({
  step: z.literal(1),
  official_name: z.string(),
  legalAddress: z.string().optional(),
  legalStreet: z.string(),
  legalHouse: z.string(),
  legalOffice: z.string(),
  factAddress: z.string().optional(),
  factStreet: z.string(),
  factHouse: z.string(),
  factOffice: z.string().min(1),
  BIN: z.string(),
});

const addTypeSchema = z.object({
  step: z.literal(2),
  organization_type: z.string().array(),
});

type addOrgType = {
  step: number;
  official_name: string;
  legalAddress: string;
  legalStreet: string;
  legalHouse: string;
  legalOffice: string;
  factAddress: string;
  factStreet: string;
  factHouse: string;
  factOffice: string;
  BIN: string;
  organization_type: string[];
};

export const addOrgSchema = z.discriminatedUnion("step", [
  addOrganizationSchema,
  addTypeSchema,
]);

const AddOrganization: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [initialData, setInitialData] = useState<ecpData>({} as ecpData);
  const [sameAddress, setSameAddress] = useState(false);
  const { searchAddress, setSearchAddress, addresses } = useAddressSearch();
  const {
    searchAddress: searchFactAddress,
    setSearchAddress: setSearchFactAddress,
    addresses: factAddresses,
  } = useAddressSearch();

  useEffect(() => {
    if (sameAddress) {
      form.setValue("factAddress", form.getValues("legalAddress"));
      form.setValue("factStreet", form.getValues("legalStreet"));
      form.setValue("factHouse", form.getValues("legalHouse"));
      form.setValue("factOffice", form.getValues("legalOffice"));
      form.trigger();
    }
  }, [sameAddress]);
  const socket = useSocket();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof addOrgSchema>>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: zodResolver(addOrgSchema),
    defaultValues: {
      step: 1,
    },
  });

  async function onSubmit() {
    const values: addOrgType = form.getValues() as any;
    await createOrganization({
      organization_params: {
        fact_address:
          values.factAddress +
          ", ул. " +
          values.factStreet +
          ", дом " +
          values.factHouse +
          ", офис " +
          values.factOffice,
        bin: values.BIN,
        official_address:
          values.legalAddress +
          ", ул. " +
          values.legalStreet +
          ", дом " +
          values.legalHouse +
          ", офис " +
          values.legalOffice,
        official_name: values.official_name,
      },
      organization_type: values.organization_type,
    });
    toast({ title: "Организация успешно добавлена" });
  }

  useEffect(() => {
    if (socket) {
      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        try {
          if (data.responseObject) {
            const result = await sign_xml(data.responseObject);
            const init: ecpData = {
              BIN:
                result.data.signed_xml.bin.length == 0
                  ? "НЕТ БИН"
                  : result.data.signed_xml.bin,
              email: result.data.signed_xml.email,
              IIN: result.data.signed_xml.iin,
              name: result.data.signed_xml.cn.split(" ")[1],
              surname: result.data.signed_xml.cn.split(" ")[0],
              organization: result.data.signed_xml.org,
              patronymic: result.data.signed_xml.givenname,
              organization_types: result.data.organization_types,
            };
            form.setValue("BIN", init.BIN);
            form.setValue("official_name", init.organization);
            setInitialData(init);
            setFormOpen(true);
          }
        } catch (error) {
          console.log("ERROR");
        }
      };

      socket.onerror = () => {
        toast({
          variant: "destructive",
          title: "NCA Layer не запущен!",
          description: "Пожалуйста запустите NCA Layer.",
        });
      };
    }
  }, [socket]);

  const handleSignUp = () => {
    try {
      if (socket) socket.send(JSON.stringify(signXML));
    } catch (error) {
      console.log("ERROR");
    }
  };

  const step = form.watch("step");
  const maxSteps = 2;

  const prevStep = () => {
    if (step > 1) {
      form.setValue("step", 1, { shouldValidate: true });
    }
  };
  const nextStep = () => {
    console.log(form.formState.errors);
    form.trigger();
    if (step < maxSteps && form.formState.isValid) {
      form.setValue("step", 2, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (open == false) {
      setInitialData({} as ecpData);
      setFormOpen(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Добавить организацию</Button>
      </DialogTrigger>
      {!formOpen || !initialData ? (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавление организации</DialogTitle>
            <DialogDescription>
              Выполните вход через ЭЦП для того чтобы добавить организацию
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button type="submit" className="w-full" onClick={handleSignUp}>
              Выберите сертификат
            </Button>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Введите ваши данные</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormStep step={1} currentStep={step}>
                <div className="flex flex-col gap-4">
                  <div className="w-full flex flex-col">
                    <FormField
                      control={form.control}
                      name="BIN"
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormLabel>БИН</FormLabel>
                          <FormControl>
                            <Input readOnly placeholder="БИН" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="official_name"
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormLabel>Название организации</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Название организации"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <CardDescription>Адрес юридический</CardDescription>
                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col gap-1 w-1/2">
                      <FormField
                        control={form.control}
                        name="legalAddress"
                        render={({ field }) => (
                          <FormItem className="space-y-0 w-full">
                            <FormLabel>Юридический адрес</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between overflow-hidden",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? field.value
                                      : "Выберите адрес"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <ScrollArea className="h-80">
                                    <CommandInput
                                      value={searchAddress}
                                      onValueChange={setSearchAddress}
                                      placeholder="Введите адрес"
                                      className="h-9"
                                    />
                                    <CommandEmpty>
                                      Адреса не найдены
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {addresses.map((address, idx) => (
                                        <CommandItem
                                          value={address}
                                          key={idx}
                                          onSelect={() => {
                                            form.setValue(
                                              "legalAddress",
                                              address
                                            );
                                          }}
                                        >
                                          {address}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              address === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </ScrollArea>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="legalHouse"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormLabel>Дом</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите номер дома"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <FormField
                        control={form.control}
                        name="legalStreet"
                        render={({ field }) => (
                          <FormItem className="space-y-0 w-full">
                            <FormLabel>Улица</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите название улицы"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="legalOffice"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormLabel>Офис</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите номер офиса"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <CardDescription>Адрес фактический</CardDescription>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={sameAddress}
                      onCheckedChange={setSameAddress as () => void}
                      id="terms"
                    />
                    <CardDescription>
                      Совпадает с юридическим адресом
                    </CardDescription>
                  </div>
                  <div className="flex flex-row gap-4">
                    <div className="w-1/2 flex flex-col gap-1">
                      <FormField
                        control={form.control}
                        name="factAddress"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormLabel>Фактический адрес</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between overflow-hidden",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? field.value
                                      : "Выберите адрес"}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <ScrollArea className="h-80">
                                    <CommandInput
                                      value={searchFactAddress}
                                      onValueChange={setSearchFactAddress}
                                      placeholder="Введите адрес"
                                      className="h-9"
                                    />
                                    <CommandEmpty>
                                      Адреса не найдены
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {factAddresses.map((address, idx) => (
                                        <CommandItem
                                          value={address}
                                          key={idx}
                                          onSelect={() => {
                                            form.setValue(
                                              "factAddress",
                                              address
                                            );
                                          }}
                                        >
                                          {address}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              address === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </ScrollArea>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="factHouse"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormLabel>Дом</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите номер дома"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <FormField
                        control={form.control}
                        name="factStreet"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormLabel>Улица</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите название улицы"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="factOffice"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormLabel>Офис</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите номер офиса"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </FormStep>
              <FormStep step={2} currentStep={step}>
                <SecondStep
                  organization_types={initialData.organization_types}
                />
              </FormStep>
              <div className="w-full flex flex-row justify-between">
                <Button
                  type="button"
                  variant="default"
                  disabled={!(step > 1)}
                  onClick={prevStep}
                >
                  Назад
                </Button>
                <Button
                  key={step === maxSteps ? "submit-btn" : "next-step-btn"}
                  type={step === maxSteps ? "submit" : "button"}
                  variant="default"
                  onClick={step === maxSteps ? undefined : nextStep}
                >
                  {step === maxSteps ? "Отправить" : "Далее"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddOrganization;
