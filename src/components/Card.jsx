import React from "react";

// function Card({ ticket, users, groupingOption }) {
//   let available = false;

//   const getImagePath = (userID) => {
//     const user = users.find((user) => {
//       return user.id === userID;
//     });
//     console.log(user);
//     available = user.available;

//     return `./images/users/${userID}.jpg`;
//   };

//   return (
//     <div className="card mb-3 shadow p-3 mb-5 bg-white rounded">
//       <div className="card-body">
//         <div className="d-flex justify-content-between align-items-centre mb-2">
//           <div className="id align-self-center">
//             <span>{ticket.id}</span>
//           </div>
//           {groupingOption !== "user" && (
//             <div className="img-section">
//               <div className="user-img">
//                 <img
//                   src={getImagePath(ticket.userId)}
//                   alt=""
//                   width="36px"
//                   className="rounded-circle"
//                 />
//               </div>
//               {available ? (
//                 <div className="available-status">
//                   <i className="fa fa-circle text-success" aria-hidden="true"></i>
//                 </div>
//               ) : (
//                 <div className="available-status">
//                   <i className="fa fa-circle text-secondary" aria-hidden="true"></i>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="title-section">
//           <h6>{ticket.title}</h6>
//         </div>
//         <div className="feature-request d-flex align-items-center p-1">
//           <i className="fa fa-circle pe-2 text-secondary" aria-hidden="true"></i>
//           <p className="align-self-center m-0">{ticket.tag}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

function Card({ ticket }) {
  return (
    <div className="card mb-2 p-2 shadow-sm bg-white rounded">
      <div className="card-body">
        {/* Ticket ID Section */}
        <div className="d-flex justify-content-start align-items-center mb-1">
          <div className="id align-self-center">
            <small className="text-muted">{ticket.id}</small>
          </div>
        </div>
        
        {/* Title Section */}
        <div className="title-section">
          <h6 className="m-0">{ticket.title}</h6>
        </div>

        {/* Feature Request Tag */}
        <div className="feature-request d-flex align-items-center mt-2">
          <i className="fa fa-circle text-secondary me-2" aria-hidden="true"></i>
          <p className="m-0">{ticket.tag}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;

// export default Card;
