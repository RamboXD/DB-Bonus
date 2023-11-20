import { Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
import { SidebarProvider } from "./contexts/sidebarContext";

const user = {
  role: "CLIENT",
};

const App: React.FC = () => {
  return (
    <>
      <SidebarProvider>
        <Routes>
          {routes.map(
            (route) =>
              route.roles.find((role) => role === user.role) && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              )
          )}
        </Routes>
      </SidebarProvider>
    </>
  );
};

export default App;
