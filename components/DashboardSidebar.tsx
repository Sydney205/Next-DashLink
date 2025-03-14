// import 

export default function DashboardSidebar() {
  const routes: [number, string, string][] = [
    [1, "Home", "home"],
    [2, "Links", "links"],
  ];

  const routesMap = routes.map(
    ([index, title, route]) =>
      typeof route === "string" && (
        <a 
          href={`dashboard/${route}`} 
          key={index} 
          className="w-full border-b border-green-600 p-2 text-left hover:bg-green-600 hover:text-white transition-all" 
        >
          <span>{title}</span>
        </a>
      )
  );
  
  return (
    <>
      <div className="absolute top-[10%] left-0 w-[20%] h-full flex flex-col justify-between bg-white dark:bg-stone-900">
        <div className="flex flex-col">
          {routesMap}
        </div>
      </div>
    </>
  )
}
