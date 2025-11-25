
// import React from 'react'

// function page() {
//   return (
   
//   <section className="text-gray-600 body-font">
//   <div className="container px-5 py-24 mx-auto">
//     <div className="flex flex-col text-center w-full mb-20">
//       <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Ticket</h1>
//       {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p> */}
//     </div>
//     <div className="lg:w-2/3 w-full mx-auto overflow-auto">
//       <table className="table-auto w-full text-left whitespace-no-wrap">
//         <thead>
//           <tr>
//             <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">category</th>
//             <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">title</th>
//             <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">desc</th>
//             <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
//             <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">priority</th>
//              <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">status</th>
//             <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">createdBy</th>
//               <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">assignedTO</th>


//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="px-4 py-3"></td>
//             <td className="px-4 py-3"></td>
//             <td className="px-4 py-3"></td>
//             <td className="px-4 py-3 text-lg text-gray-900"></td>
//                         <td className="px-4 py-3 text-lg text-gray-900"></td>
//             <td className="px-4 py-3 text-lg text-gray-900"></td>
//             <td className="px-4 py-3 text-lg text-gray-900"></td>

//             <td className="w-10 text-center">
//               <input name="plan" type="radio"/>
//             </td>
//           </tr>
//           <tr>
//             <td className="border-t-2 border-gray-200 px-4 py-3"></td>
//             <td className="border-t-2 border-gray-200 px-4 py-3"></td>
//             <td className="border-t-2 border-gray-200 px-4 py-3"></td>
//             <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900"></td>
//             <td className="border-t-2 border-gray-200 w-10 text-center">
//               <input name="plan" type="radio"/>
//             </td>
//           </tr>
//           <tr>
//             <td className="border-t-2 border-gray-200 px-4 py-3"></td>
//             <td className="border-t-2 border-gray-200 px-4 py-3"></td>
//             <td className="border-t-2 border-gray-200 px-4 py-3"></td>
//             <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900"></td>
//             <td className="border-t-2 border-gray-200 w-10 text-center">
//               <input name="plan" type="radio"/>
//             </td>
//           </tr>
//           <tr>
//             <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3"></td>
//             <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3"></td>
//             <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3"></td>
//             <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900"></td>
//             <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center">
//               <input name="plan" type="radio"/>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
//       <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
//         <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
//           <path d="M5 12h14M12 5l7 7-7 7"></path>
//         </svg>
//       </a>
//       <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
//     </div>
//   </div>
// </section>
  
  
//   )
// }

// export default page;



// "use client";

// import React, { useState } from "react";
// import { StatusChip } from "@/app/components/StatusChip";
// import { TicketStatus } from "@/types/ticket";
// import  pagination  from "@/app/ticket/page"

// const TicketsPage = () => {
//   const [status, setStatus] = useState<string>("all");
//   const [search, setSearch] = useState<string>("");
//   const [limit, setLimit] = useState<number>(5);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [data, setData] = useState<any[]>([]);
//   const [ticket, setTicket] = useState<any>(null);
//   return (
//     <div className="p-6">
//       {/* Filters */}
//       <div className="flex gap-3 mb-4">
//         {/* <select
//           className="border px-3 py-2 rounded"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="open">Open</option>
//           <option value="in_progress">In Progress</option>
//           <option value="resolved">Resolved</option>
//         </select> */}

//         {/* <input
//           className="border px-3 py-2 rounded"
//           placeholder="Search ticket..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         /> */}

//         {/* <select
//           className="border px-3 py-2 rounded"
//           value={limit}
//           onChange={(e) => setLimit(Number(e.target.value))}
//         >
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={25}>25</option>
//         </select> */}
//       </div>

//       {/* Table */}
//       <div className="border rounded overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="text-left p-3"> category</th>
//               <th className="text-left p-3">title</th>
//               <th className="text-left p-3">desc</th>
//               <th className="text-left p-3">priority</th>
//               <th className="text-left p-3">status</th>
//               <th className="text-left p-3">price</th>
//               <th className="text-left p-3">createdBy</th>
//               <th className="text-left p-3">created</th>

//             </tr>
//           </thead>

//   <tbody>
//     {loading ? (
//       <tr>
//         <td className="p-5 text-center" colSpan={8}>
//           Loading...
//         </td>
//       </tr>
//     ) : (
//       data.map((th) => (
//         <tr key={th._id} className="border-b">
//           <td className="p-3">{th.category}</td>
//           <td className="p-3">{th.title}</td>
//           <td className="p-3">{th.desc}</td>
//           <td className="p-3">{th.priority}</td>
//           <td className="p-3">
//             <StatusChip status={th.status} />
//           </td>
//           <td className="p-3">{th.price}</td>
//           <td className="p-3">
//             {th.createdAt
//               ? new Date(th.createdAt).toLocaleString()
//               : "N/A"}
//           </td>
//         </tr>
//       ))
//     )}
//   </tbody>
//         </table>
//       </div>
//       <div>
      
//       </div>
//     </div>
//   );
// };

// export default TicketsPage;



"use client";

import React, { useState } from "react";
import { StatusChip } from "@/app/components/StatusChip";
import Pagination from "@/app/components/pagination/page";
import { useTickets } from "@/lib/hooks/useTickets";

const TicketsPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [status] = useState("all");
  const [search] = useState("");

  const { data, loading } = useTickets(page, limit, status, search);

  return (
    <div className="p-6">
 <div className="text-3xl text-blue-500 text-center">Ticket Details</div>
      <div className=" rounded overflow-x-auto">
       
        <table className="w-full text-sm">
          <thead className="bg-cyan-500">
            <tr>
              <th className="p-3">Category</th>
              <th className="p-3">Title</th>
              <th className="p-3">Desc</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Price</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="p-5 text-center" colSpan={8}>
                  Loading...
                </td>
              </tr>
            ) : (
              data?.docs?.map((ticket: any) => (
                <tr key={ticket._id} className="border-b">
                  <td className="p-3">{ticket.category}</td>
                  <td className="p-3">{ticket.title}</td>
                  <td className="p-3">{ticket.desc}</td>
                  <td className="p-3">{ticket.priority}</td>
                  <td className="p-3">
                    <StatusChip status={ticket.status} />
                  </td>
                  <td className="p-3">{ticket.price}</td>
                  <td className="p-3">{new Date(ticket.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && (
        <Pagination page={page} setPage={setPage} data={data} />
      )}
    </div>
  );
};

export default TicketsPage;
