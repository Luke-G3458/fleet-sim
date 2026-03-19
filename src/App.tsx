import "./index.css";
import View from "./components/View";
import { useState } from "react";
import { Tool } from "./types/types";

function App() {
  const [pointerTool, setPointerTool] = useState<Tool>("pan");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-10 h-10 bg-elevated-bg border-b border-border-subtle shadow-md flex items-center px-4">
      </header>

      <main className="flex-1 flex pt-10 pb-10">
        <aside className="fixed left-0 top-10 bottom-10 w-45 bg-elevated-bg border-b border-border-subtle overflow-y-auto flex flex-col gap-4 items-center p-10">
          <p className="text-md text-text-muted selection:bg-rail/20">Tools</p>
          <div
            className={`flex h-20 w-20 items-center justify-center
              bg-panel-bg border border-2 border-border-subtle rounded-xl
              transition duration-200 text-sm text-text-muted
              ${pointerTool === "pan" ? `opacity-50` :
                `hover:scale-105 hover:bg-rail/10 hover:border-rail hover:animate-pulse hover:text-text-primary active:scale-99`}`
            }
            onClick={() => setPointerTool("pan")}
          >
            Pan
          </div>
          <div
            className={`flex h-20 w-20 items-center justify-center
              bg-panel-bg border border-2 border-border-subtle rounded-xl
              transition duration-200 text-sm text-text-muted
              ${pointerTool === "node" ? `opacity-50` :
                `hover:scale-105 hover:bg-rail/10 hover:border-rail hover:animate-pulse hover:text-text-primary active:scale-99`}`
            }
            onClick={() => setPointerTool("node")}
          >
            Nodes
          </div>
        </aside>

        <section className="flex-1 pl-45 pr-10 overflow-y-auto bg-app-bg">
          <View tool={pointerTool} />
        </section>

        <aside className="fixed right-0 top-10 bottom-10 w-10 bg-elevated-bg border-b border-border-subtle overflow-y-auto" />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-elevated-bg border-b border-border-subtle text-white flex items-center justify-center">
        Footer
      </footer>
    </div >

  )
}
export default App;
