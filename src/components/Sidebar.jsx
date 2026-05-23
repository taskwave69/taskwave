import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard"
    },

    {
      name: "Tasks",
      path: "/tasks"
    },

    {
      name: "Wallet",
      path: "/wallet"
    },

    {
      name: "History",
      path: "/history"
    },

    {
      name: "Admin",
      path: "/admin"
    }

  ];

  return (

    <div className="w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6 hidden md:flex flex-col">

      <h1 className="text-4xl font-bold text-cyan-400 mb-12">
        TaskWave
      </h1>

      <div className="flex flex-col gap-4">

        {menuItems.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            className={`px-5 py-4 rounded-2xl font-semibold transition-all duration-300

              ${
                location.pathname === item.path
                  ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/20"
                  : "bg-zinc-900 text-white hover:bg-zinc-800"
              }
            `}
          >

            {item.name}

          </Link>

        ))}

      </div>

      <div className="mt-auto pt-10">

        <p className="text-zinc-500 text-sm">
          TaskWave © 2026
        </p>

      </div>

    </div>

  );
}

export default Sidebar;