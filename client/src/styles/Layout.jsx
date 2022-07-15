import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main className="absolute inset-0 overflow-auto bg-gray-50 p-4 dark:bg-primary 2xl:px-[25rem]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
