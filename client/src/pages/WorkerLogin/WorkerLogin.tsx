import { useToast } from "@/components/ui/use-toast";
import { signXML } from "@/constants/signXml";
import { useAppDispatch } from "@/hooks/redux";
import { useSocket } from "@/hooks/useSocket";
import { authSlice } from "@/store/reducers/authReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { workerLogin } from "./api";
import { Sign } from "./components";

const WorkerLogin: React.FC = () => {
  const socket = useSocket();
  const { toast } = useToast();
  const { setAuth } = authSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        try {
          if (data.responseObject) {
            const result = await workerLogin(data.responseObject);
            localStorage.setItem("token", result.data.token);
            dispatch(setAuth(true));
            navigate("/administration/organizations");
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

      return () => {
        socket.close();
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

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Sign handleSignUp={handleSignUp} />
    </div>
  );
};

export default WorkerLogin;
