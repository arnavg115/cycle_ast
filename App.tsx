import { AppComponent } from "./src";
import { LocProvider } from "./src/store";

export default function App() {
  // useEffect(() => {}, []);

  return (
    <LocProvider>
      <AppComponent />
    </LocProvider>
  );
}
