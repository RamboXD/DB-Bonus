import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormStep } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/hooks/redux";
import { register } from "@/store/reducers/authReducer";
import { ecpData, registartionForm } from "@/ts/types";
import { registrationSchema } from "@/zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import FirstStep from "./components/FirstStep/FirstStep";
import SecondStep from "./components/SecondStep/SecondStep";

interface FormProps {
  initialData: ecpData;
}

const SignUpFormMember: React.FC<FormProps> = ({ initialData }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof registrationSchema>>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      step: 1,
      name: initialData.name,
      surname: initialData.surname,
      patronymic: initialData.patronymic,
      organization: initialData.organization.length
        ? initialData.organization
        : "Нет организации",
      IIN: initialData.IIN,
      BIN: initialData.BIN.length ? initialData.BIN : "Нет БИН",
      email: initialData.email,
      legalAddress: "",
      factAddress: "",
    },
  });
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

  const onSubmit = async () => {
    await dispatch(register(form.getValues() as registartionForm))
      .unwrap()
      .then(() => {
        toast({
          title: "Регистрация прошла успешно",
        });
        navigate("/administration/organizations");
      })
      .catch(() => {
        console.log("AAAA OSHIBKA");
        toast({
          variant: "destructive",
          title: "Ошибка при регистрация",
        });
        navigate("/registration");
      });
  };

  return (
    <Card className="w-full lg:w-1/2 overflow-y-scroll absolute top-10">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>Введите ваши данные</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormStep step={1} currentStep={step}>
              <FirstStep />
            </FormStep>
            <FormStep step={2} currentStep={step}>
              <SecondStep organization_types={initialData.organization_types} />
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
      </CardContent>
    </Card>
  );
};

export default SignUpFormMember;
