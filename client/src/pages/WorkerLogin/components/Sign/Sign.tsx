import logo from "@/assets/images/logo.png";
import { Button, LangSwitch } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SignProps {
  handleSignUp: () => void;
}

const Sign: React.FC<SignProps> = ({ handleSignUp }) => {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <img src={logo} alt="Digital Store" className="w-16 ml-5" />
        </CardTitle>
        <CardTitle className="flex justify-center">Confluence</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="password" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="password">ЭЦП</TabsTrigger>
          </TabsList>
          <TabsContent value="password">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex justify-center">
                  Вход сотрудника
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-0 flex justify-center">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={handleSignUp}
                  >
                    Выберите сертификат
                  </Button>
                  <div className="w-full justify-center flex flex-row mt-1 text-sm">
                    <p className="text-left underline underline-offset-2 cursor-pointer">
                      Назад
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <div className="absolute top-0 right-0 mr-6 mt-6">
        <LangSwitch />
      </div>
    </Card>
  );
};

export default Sign;
