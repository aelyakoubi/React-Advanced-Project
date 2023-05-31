import { Input } from "@chakra-ui/react";

import React, { useState } from "react";

export const EventSearch = ({ events, setFilteredEvents }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm)
    );
    setFilteredEvents(filteredEvents);
  };

  return (
    <Input
      type="text"
      placeholder="Search events"
      value={searchTerm}
      onChange={handleSearch}
      mt={50}
    />
  );
};
