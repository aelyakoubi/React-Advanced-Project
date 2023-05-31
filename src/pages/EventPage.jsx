import React, { useState, useEffect } from "react";
import { Box, Heading, Button, Input, Flex } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        setEditedEvent(data);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleUpdateEvent = () => {
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
        setEditedEvent(data);
        alert("Event updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to update event!");
      });
  };

  const handleDeleteEvent = () => {
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    })
      .then(() => {
        navigate("/");
        alert("Event deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to delete event!");
      });
  };

  if (!event) {
    return <Box>Loading...</Box>;
  }

  return (
    <Flex
      gap="1"
      maxW="960px"
      mx="auto"
      sm="30em"
      md="48em"
      lg="62em"
      xl="80em"
      display="flexbox"
      lineHeight="base"
      align={"center"}
    >
      <Box mt={45}>
        <Heading as="h1" mb={4}>
          {event.title}
        </Heading>
        <form>
          <label>
            Description:
            <Input
              type="text"
              name="description"
              value={editedEvent.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Start Time:
            <Input
              type="text"
              name="startTime"
              value={editedEvent.startTime}
              onChange={handleInputChange}
            />
          </label>
          <label>
            End Time:
            <Input
              type="text"
              name="endTime"
              value={editedEvent.endTime}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Category:
            <Input
              type="text"
              name="category"
              value={editedEvent.category}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Created by:
            <Input
              type="text"
              name="createdBy"
              value={editedEvent.createdBy}
              onChange={handleInputChange}
            />
          </label>
        </form>
        <Box mt={4}>
          <Button
            onClick={handleUpdateEvent}
            type="submit"
            borderRadius="15px"
            border="3px solid"
            padding="0.6em 1.2em"
            fontSize="1em"
            fontWeight="500"
            fontFamily="inherit"
            backgroundColor="grey.500"
            cursor="pointer"
            transition="border-color 0.25s, box-shadow 0.25s"
            _hover={{
              borderColor: "purple",
              boxShadow: "0 0 8px 2px rgba(128, 78, 254, 0.5)",
            }}
            _focus={{ outline: "4px auto -webkit-focus-ring-color" }}
          >
            Edit Event
          </Button>

          <Button
            onClick={handleDeleteEvent}
            borderRadius="15px"
            border="3px solid"
            padding="0.6em 1.2em"
            fontSize="1em"
            fontWeight="500"
            fontFamily="inherit"
            backgroundColor="grey.500"
            cursor="pointer"
            transition="border-color 0.25s, box-shadow 0.25s"
            _hover={{
              borderColor: "purple",
              boxShadow: "0 0 8px 2px rgba(128, 78, 254, 0.5)",
            }}
            _focus={{ outline: "4px auto -webkit-focus-ring-color" }}
          >
            Delete Event
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
