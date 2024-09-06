import "./App.css";

import { Vulnerabilities } from "./app/Vulnerabilities/Vulnerabilities";

function App() {
  return (
    <div className="bg-gray-200 h-full">
      <div className="container mx-auto p-4 lg:p-6 xl:p-8">
        <Vulnerabilities />
      </div>
    </div>
  );
}

export default App;