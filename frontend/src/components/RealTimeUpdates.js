import React, { useState, useEffect } from "react";
import useSocket from "../hooks/useSocket";
import {
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaBell } from "react-icons/fa"; 

const RealTimeUpdates = () => {
  const [messages, setMessages] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useSocket("update", (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
  });

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleMarkAsRead = () => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => ({ ...msg, read: true }))
    );
  };

  useEffect(() => {
    if (dropdownOpen) {
      handleMarkAsRead();
    }
  }, [dropdownOpen]);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle nav style={{ cursor: "pointer", position: "relative" }}>
        <FaBell size={24} color="#333" />
        {messages.length > 0 && (
          <Badge
            color="danger"
            style={{ position: "absolute", top: "-8px", right: "-8px" }}
          >
            {messages.length}
          </Badge>
        )}
      </DropdownToggle>
      <DropdownMenu right>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <DropdownItem
              key={index}
              className={message.read ? "text-muted" : ""}
            >
              <p>{message.text}</p>
              <small className="text-muted">
                {new Date(message.timestamp).toLocaleTimeString()}
              </small>
            </DropdownItem>
          ))
        ) : (
          <DropdownItem disabled>No new updates</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default RealTimeUpdates;
