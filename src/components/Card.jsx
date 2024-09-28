import React from "react";
import './Card.css';

function Card({ ticket, userImage, getStatusImgPath, groupingOption }) {
  const getPriorityIconPath = (priority) => {
    switch (priority) {
      case 0:
        return '/Untitled/icons_FEtask/No-priority.svg'; 
      case 1:
        return 'Untitled/icons_FEtask/Img - Low Priority.svg'; 
      case 2:
        return 'Untitled/icons_FEtask/Img - Medium Priority.svg'; 
      case 3:
        return 'Untitled/icons_FEtask/Img - High Priority.svg'; 
      case 4:
        return 'Untitled/icons_FEtask/SVG - Urgent Priority colour.svg'; 
      default:
        return 'Untitled/icons_FEtask/SVG - Urgent Priority grey.svg';
    }
  };

  return (
    <div className="custom-card">
      <div className="card-body">
        <div className="id-section">
          <small>{ticket.id}</small>
          <img src={userImage} alt="User" className="tag-icon" /> 
        </div>

        <div className="title-status-priority-section">
          {(groupingOption === "user" || groupingOption === "priority")&& (
            <img
              src={getStatusImgPath(ticket.status)}
              alt="Status"
              className="status-icon"
              style={{ marginRight: '8px' }}
            />
          )}
          <h6 style={{ margin: '0 8px' }}>{ticket.title}</h6>
          </div>
          <div className="tag-section" >
            <img
              src={getPriorityIconPath(ticket.priority)}
              alt="Priority"
              className="priority-icon"
            />
            <span className="tag-circle"></span>
            <p style={{ margin: '0' }}>{ticket.tag[0]}</p>
          </div>
        
      </div>
    </div>
  );
}

export default Card;
