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

    <div className="w-full md:w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
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
                  ? "bg-cyan-400 text-black"
                  : "bg-zinc-900 text-white hover:bg-zinc-800"
              }
            `}
          >

            {item.name}

          </Link>

        ))}

      </div>

    </div>

  );
}

export default Sidebar;