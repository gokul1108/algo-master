import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950">
      {children}
    </div>
  );
};

export default AuthLayout;
