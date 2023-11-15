import { useState } from "react";
import { IoPerson } from "react-icons/io5";

export function UserAccount() {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="relative">
      <IoPerson
        className="text-black hover:cursor-pointer dark:text-white"
        size={24}
        onClick={() => setShowSideBar(!showSideBar)}
      />
      {showSideBar && (
        <div className="absolute right-0 top-8 flex h-96 w-48 flex-col items-center rounded-xl bg-white shadow-2xl dark:bg-void">
          <h2>test</h2>
          <h2>test</h2>
          <h2>test</h2>
          <h2>test</h2>
        </div>
      )}
    </div>
  );
}
