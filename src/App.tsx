import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./index.css";
import Map from "./components/Map";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-10 h-10 bg-elevated-bg border-b border-border-subtle shadow-md flex items-center px-4">
      </header>

      <main className="flex-1 flex pt-10 pb-10">
        <aside className="fixed left-0 top-10 bottom-10 w-64 bg-elevated-bg border-b border-border-subtle overflow-y-auto">
          Menu
        </aside>

        <section className="flex-1 pl-64 pr-10 overflow-y-auto bg-app-bg">
          <Map />
        </section>

        <aside className="fixed right-0 top-10 bottom-10 w-10 bg-elevated-bg border-b border-border-subtle overflow-y-auto" />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-elevated-bg border-b border-border-subtle text-white flex items-center justify-center">
        Footer
      </footer>
    </div>

  )
}
export default App;
