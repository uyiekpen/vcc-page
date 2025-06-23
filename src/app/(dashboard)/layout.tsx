"use client";



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full min-h-screen overflow-y-auto font-Montserrat">
     

  

      <main>{children}</main>
    </div>
  );
};

export default Layout;
