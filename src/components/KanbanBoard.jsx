import React, { useState, useEffect } from "react";
import { fetchData } from "../api/api";
import Card from "./Card";
import './KanbanBoard.css';

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(localStorage.getItem("groupingOption") || "user");
  const [sortingOption, setSortingOption] = useState(localStorage.getItem("sortingOption") || "priority");

  const priority = ["No priority", "Low", "Medium", "High", "Urgent"];
  let available = false;

  useEffect(() => {
    fetchData().then((data) => {
      setTickets(data.tickets);
      setUsers(data.users);
    });
  }, []);

  const groupAndSortTickets = (tickets, groupingOption, sortingOption) => {
  localStorage.setItem("groupingOption", groupingOption);
  localStorage.setItem("sortingOption", sortingOption);

  const groupedTickets = {};

  tickets.forEach((ticket) => {
    const groupKey =
      groupingOption === "status"
        ? ticket.status
        : groupingOption === "user"
        ? (ticket.userId
            ? users.find((user) => user.id === ticket.userId).name
            : "")
        : groupingOption === "priority"
        ? ticket.priority
        : "Other";

    if (!groupedTickets[groupKey]) {
      groupedTickets[groupKey] = [];
    }
    groupedTickets[groupKey].push(ticket);
  });

  if (groupingOption === "status") {
    if (!groupedTickets["Cancelled"]) {
      groupedTickets["Cancelled"] = [];
    }
    if (!groupedTickets["Backlog"]) {
      groupedTickets["Backlog"] = [];
    }
    if (!groupedTickets["Todo"]) {
      groupedTickets["Todo"] = [];
    }
    if (!groupedTickets["In progress"]) {
      groupedTickets["In Progress"] = [];
    }
    if (!groupedTickets["Done"]) {
      groupedTickets["Done"] = [];
    }
  }

  Object.keys(groupedTickets).forEach((groupKey) => {
    groupedTickets[groupKey].sort((a, b) => {
      if (sortingOption === "priority") {
        return b.priority - a.priority;
      } else if (sortingOption === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });

  return groupedTickets;
};

  
  const groupedAndSortedTickets = groupAndSortTickets(tickets, groupingOption, sortingOption);

  const getStatusImgPath = (status) => {
    switch (status.toLowerCase()) {
      case "todo":
        return "Untitled/icons_FEtask/To-do.svg";
      case "in progress":
        return "Untitled/icons_FEtask/in-progress.svg";
      case "backlog":
        return "Untitled/icons_FEtask/Backlog.svg";
      case "done":
        return "Untitled/icons_FEtask/Done.svg"; 
      case "cancelled":
        return "Untitled/icons_FEtask/Cancelled.svg"; 
      default:
        return "/icons/status/default.svg"; 
    }
  };

  const getPriorityImgPath = (priority) => {
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

  const getImagePath = (userName) => {
    const user = users.find((user) => user.name === userName);
    available = user?.available;

    return `./images/users/${user?.id}.jpg`;
  };

  const getOrderedGroupKeys = (groupedTickets) => {
    const groupKeys = Object.keys(groupedTickets);
    const filteredKeys = groupKeys.filter((key) => key !== "Cancelled");
    if (groupingOption === "status") {
      return [...filteredKeys,"Cancelled"];

    }
    return [...filteredKeys];
  };

  return (
    <div className="kanban-board">
      {/* NAVBAR SECTION */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="dropdown">
            <button className="dropdown-toggle">
              <img src="Untitled/icons_FEtask/Display.svg" alt="Sliders" className="me-1" width="20px" />
              Display
              <img src="Untitled/icons_FEtask/down.svg" alt="Arrow" className="arrow-icon" width="12px" />
            </button>
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <span>Grouping</span>
                <select
                  value={groupingOption}
                  onChange={(e) => setGroupingOption(e.target.value)}
                  className="form-select"
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-item">
                <span>Ordering</span>
                <select
                  value={sortingOption}
                  onChange={(e) => setSortingOption(e.target.value)}
                  className="form-select"
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN SECTION */}
      <div className="groups">
        {groupedAndSortedTickets &&
          getOrderedGroupKeys(groupedAndSortedTickets).map((group) => (
            <div key={group} className="group">
              {/* GROUP HEADER SECTION*/}
              <div className="group-header">
                <div className="group-title">
                  {groupingOption === "status" && (
                    <div className="group-status">
                      <img src={getStatusImgPath(group)} alt="" width="16px" />
                      <h4>{group}</h4>
                    </div>
                  )}
                  {groupingOption === "user" && (
                    <div className="group-user">
                      <div className="img-section">
                        <img src={getImagePath(group)} alt="" width="36px" className="user-img" />
                        <div className={`available-status ${available ? 'available' : 'not-available'}`}></div>
                      </div>
                      <h4>{group}</h4>
                    </div>
                  )}
                  {groupingOption === "priority" && (
                    <div className="group-priority">
                      <img src={getPriorityImgPath(Number(group))} alt={priority[Number(group)]} width="16px" />
                      <h4>{priority[Number(group)]}</h4>
                    </div>
                  )}
<span className="ticket-count">{groupedAndSortedTickets[group]?.length || 0}</span>
</div>
                {group !== "Cancelled" && (
    <div className="header-options">
      <img src="Untitled/icons_FEtask/add.svg" alt="Add" width="16px" />
      <img src="Untitled/icons_FEtask/3 dot menu.svg" alt="Options" width="16px" />
    </div>
  )}
              </div>
              {/* CARDS SECTION */}
              <div className="cards">
                {groupedAndSortedTickets[group]?.map((ticket) => (
                  <Card
                    key={ticket.id}
                    ticket={ticket}
                    users={users}
                    groupingOption={groupingOption}
                    userImage={getImagePath(users.find(user => user.id === ticket.userId)?.name)}
                    getStatusImgPath={getStatusImgPath}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
