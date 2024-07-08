import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="px-4 lg-px:12">
        {/* <div className="mt-12 w-12 h-12 flex items-center justify-center dark:bg-primary/20 dark:border-white bg-gray-200 border border-black">
          <PencilSquareIcon className="w-8 h-8 text-black dark:text-white" />
        </div> */}

        <div className="relative w-auto md:h-48 lg:h-96 border border-white ">
          {/* Banner */}
          <Image
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            layout="fill"
            objectFit="cover"
            alt="Profile Banner"
            className="opacity-80 hover:opacity-100 transition hover:ease-in-out"
          />
          {/* Profile */}
          <div className="absolute bottom-0 transform ml-24 z-2 translate-y-1/2 w-48 h-48 border border-white bg-black">
            <Image
              src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              layout="fill"
              objectFit="cover"
              alt="Profile Picture"
              className="opacity-80 hover:opacity-100 transition hover:ease-in-out"
            />
          </div>
        </div>
      </div>
    </>
  );
}
