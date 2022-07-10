import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main className="absolute inset-0 p-8 2xl:px-[50rem]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
