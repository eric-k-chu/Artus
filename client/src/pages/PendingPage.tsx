// import { usePendingFiles } from "../lib";
// // import { PendingVideoCard } from "../components/PendingVideoCard";
// import { IoCheckmark } from "react-icons/io5";
// import { LoadingCircle } from "../components";
// export function PendingPage() {
//   const { pendingFiles, error } = usePendingFiles();

//   if (error) {
//     return (
//       <main className="flex w-full flex-col items-center gap-y-4 rounded-md border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
//         <span className="font-poppins text-red-600">
//           {error instanceof Error ? error.message : "Unknown error."}
//         </span>
//       </main>
//     );
//   }

//   return (
//     <main className="flex w-full flex-col items-center gap-y-4 rounded-md border border-l-brdr bg-l-bg-1 p-4 shadow-sm shadow-l-shdw dark:border-none dark:bg-d-bg-03dp dark:shadow-none">
//       {pendingFiles.map((n, i) => (
//         <section className="flex w-full items-center py-2" key={i}>
//           <h2>{n.filename}</h2>
//           <div className="ml-auto">
//             {n.status ? (
//               <LoadingCircle size="sm" />
//             ) : (
//               <IoCheckmark className="h-6 w-6 text-green-400" />
//             )}
//           </div>
//         </section>
//       ))}
//     </main>
//   );
// }

// /*

//       {files.length > 0 ? (
//         files.map((n, i) => (
//           <PendingVideoCard file={n} isPending={isPending} key={i} />
//         ))
//       ) : (
//         <section className="text-red-400">
//           <h2 className="text-gray dark:text-white/60">
//             No videos are currently being processed.
//           </h2>
//         </section>
//       )}

// */
