import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Sign } from "./components";
import SignUpFormCaregiver from "./components/Form/SignUpFormCaregiver";
import SignUpFormMember from "./components/Form/SignUpFormMember";

const Registration: React.FC = () => {
  const [isCaregiver, setIsCaregiver] = useState<number>(0);
  const { toast } = useToast();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {isCaregiver === 0 ? (
        <Sign setIsCaregiver={setIsCaregiver} />
      ) : isCaregiver === 1 ? (
        <SignUpFormCaregiver />
      ) : (
        <SignUpFormMember />
      )}
    </div>
  );
};

export default Registration;
