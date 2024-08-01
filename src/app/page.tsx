"use client";

import { SignInButton } from "@clerk/clerk-react";

function page() {
  return (
    <div className="flex flex-col max-w-2xl items-center space-y-3">
      <h1 className="text-2xl text-center">
        HEY MANI IN ALTO, DOVE VAI CON QUEL PISTOLONE... PER QUELLO CARO MIO...
        CI VUOLE IL PORTO D'ARMI. LOGGA O NON ANDRAI PROPRIO DA NESSUNA PARTE
      </h1>
      <SignInButton forceRedirectUrl="/chat">
        <button className="bg-blue-600 text-white p-7 rounded-l-lg rounded-lg text-4xl">
          LOGGA BANDITO
        </button>
      </SignInButton>
    </div>
  );
}

export default page;
