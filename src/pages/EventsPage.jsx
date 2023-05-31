import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddEvent } from "../components/AddEvent";
import { EventSearch } from "../components/EventSearch";
import backgroundImage from "../components/backgroundImage.jpg";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
        setFilteredEvents(data); // Initialize filtered events with all events
      })
      .catch((error) => console.log(error));

    console.log(events);
  }, []);

  const handleDeleteEvent = (eventId) => {
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
        setFilteredEvents(updatedEvents);
        alert("Event deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to delete event!");
      });
  };

  return (
    <Flex
      mx="auto"
      sm="30em"
      md="48em"
      lg="62em"
      xl="80em"
      lineHeight={1.5}
      display="flexbox"
    >
      <Heading as="h1" fontSize={"5xl"} color={"grey"} ml={760}>
        Winc's Events
      </Heading>
      <Button
        onClick={onOpen}
        bgSize="cover"
        bgImage={`url(${backgroundImage})`}
        bgPosition="center"
        borderRadius="15px"
        border="3px solid"
        padding="0.6em 1.2em"
        fontSize="1.2em"
        color={"black"}
        mt={5}
        w="200px"
        h="150px"
        fontWeight="1000"
        fontFamily="inherit"
        cursor="pointer"
        transition="border-color 0.25s, box-shadow 0.50s"
        _hover={{
          borderColor: "purple",
          boxShadow: "0 0 8px 2px rgba(128, 78, 254, 0.8)",
        }}
        _focus={{ outline: "4px auto -webkit-focus-ring-color" }}
      >
        Click to Add Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEvent events={events} setFilteredEvents={setFilteredEvents} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box mb={30} mr={8}>
        <EventSearch events={events} setFilteredEvents={setFilteredEvents} />
      </Box>
      {/* Layout tegels */}
      <Stack
        spacing={4}
        h="20vh"
        flexDir="row"
        flexWrap="wrap"
        justifyContent="space-around"
        ml="auto"
      >
        {filteredEvents.map((event) => (
          <Box
            key={event.id}
            borderWidth="7px"
            boxShadow="dark-lg"
            w="250px"
            h="250px"
            bg="white"
            align="center"
            bgImage={`url(${event.image})`}
            bgSize="cover"
            bgPosition="center"
            borderRadius="15px"
            border="3px solid"
            padding="0.6em 1.2em"
            fontSize="1em"
            fontWeight="extrabold"
            fontFamily="inherit"
            fontStyle="bold"
            color={"black"}
            cursor="pointer"
            transition="border-color 0.25s, box-shadow 0.25s"
            _hover={{
              borderColor: "purple",
              boxShadow: "0 0 8px 2px rgba(128, 78, 254, 0.5)",
            }}
            _focus={{ outline: "4px auto -webkit-focus-ring-color" }}
          >
            <Link to={`/event/${event.id}`}>
              <Box _hover={{ color: "purple" }}>
                <Heading as="h2" mb={5} size="md" fontWeight={"extrabold"}>
                  {event.title}
                </Heading>
                <Text>{event.description}</Text>
                <Text>{event.startTime}</Text>
                <Text>{event.endTime}</Text>
                <Text>Category: {event.category}</Text>
                <Text>Created by: {event.createdBy}</Text>
              </Box>
            </Link>
            <Button
              onClick={() => handleDeleteEvent(event.id)}
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
        ))}
      </Stack>
    </Flex>
  );
};
