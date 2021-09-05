import "./assets/tailwind.css";
import { Route, Switch } from "react-router-dom";

export interface AppProps {
  ssr?: boolean;
  routes: {
    path: string;
    Component: React.FC;
  }[];
}

export function App({ routes }: AppProps) {
  return (
    <Switch>
      {routes.map(({ path, Component }) => {
        return (
          <Route exact key={path} path={[path, path + ".html"]}>
            <Component />
          </Route>
        );
      })}
    </Switch>
  );
}
