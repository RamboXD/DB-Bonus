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
import { caregiverRegistartionForm } from "@/ts/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import FirstStep from "./components/FirstStep/FirstStep";
import SecondStep from "./components/SecondStep/SecondStep";
import { caregiverRegistrationSchema } from "@/zod/zod";

const SignUpFormCaregiver: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof caregiverRegistrationSchema>>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: zodResolver(caregiverRegistrationSchema),
  });
  const step = form.watch("step");
  const maxSteps = 3;

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
    await dispatch(register(form.getValues() as caregiverRegistartionForm))
      .unwrap()
      .then(() => {
        toast({
          title: "Регистрация прошла успешно",
        });
        navigate("/registration");
      })
      .catch(() => {
        console.log("AAAA OSHIBKA");
        toast({
          variant: "destructive",
          title: "Ошибка при регистрация",
        });
        navigate("/registration/");
      });
  };

  return (
    <Card className="w-full lg:w-1/2 overflow-y-scroll absolute top-10">
      <CardHeader>
        <CardTitle>Registration</CardTitle>
        <CardDescription>Enter your data</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormStep step={1} currentStep={step}>
              <FirstStep />
            </FormStep>
            <FormStep step={2} currentStep={step}>
              <SecondStep />
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

export default SignUpFormCaregiver;
