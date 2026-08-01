import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16">
        <h1 className="text-2xl text-green-600 shadow-sm px-7 py-1 rounded-2xl shadow-green-400 tracking-widest font-bold">
          Note App
        </h1>
      </main>
    </div>
  );
}
