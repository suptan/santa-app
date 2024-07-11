import { MouseEventHandler, useEffect, Suspense } from "react";
import { Toaster } from 'react-hot-toast';
import { Footer, Header, Wish } from "@/components";

function App() {
  return (
    <div className="p-5 bg-white dark:bg-gray-900">
      <Suspense fallback={<p>Loading...</p>}>
        <Header />
        <main>
          <Wish />
        </main>
        <Footer />
        <Toaster />
      </Suspense>
    </div>
  );
}

export default App;
