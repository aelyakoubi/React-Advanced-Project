import { Box, Heading, Input, Stack, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

export const AddEvent = ({ setFilteredEvents, events }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const startTime = new Date(form.startTime.value);
    const endTime = new Date(form.endTime.value);

    if (endTime <= startTime) {
      alert("End time must be after start time");
      form.reset();
      return;
    }

    const newEvent = {
      id: id,
      title: form.title.value,
      description: form.description.value,
      image: photoUrl,
      startTime: form.startTime.value,
      endTime: form.endTime.value,
      category: form.category.value,
      createdBy: form.createdBy.value,
    };

    fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        setFilteredEvents([...events, data]); // Update filtered events array
        form.reset();
        alert("Event added successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to add event!");
      });
  };

  const handlePhotoUrlChange = (event) => {
    setPhotoUrl(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  return (
    <Flex>
      <Box
        bg={"white"}
        boxShadow="dark-lg"
        borderWidth="5px"
        p={4}
        ml={5}
        mt={70}
      >
        <Heading mb={2} ml={5}>
          Add Event
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4} mt={50}>
            <Input name="title" placeholder="Title" required />
            <Input name="description" placeholder="Description" required />
            <Input
              name="photoUrl"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={handlePhotoUrlChange}
              required
            />
            <Input type="datetime-local" name="startTime" required />
            <Input type="datetime-local" name="endTime" required />
            <Input name="category" placeholder="Category" required />
            <Input
              name="createdBy"
              placeholder="Created By"
              required
              onChange={handleIdChange}
            />
            <Button
              type="submit"
              borderRadius="15px"
              border="3px solid"
              padding="0.6em 1.2em"
              fontSize="1em"
              fontWeight="500"
              fontFamily="inherit"
              backgroundColor="grey.500"
              cursor="pointer"
              transition="border-color 0.25s"
              _hover={{ borderColor: "purple" }}
              _focus={{ outline: "4px auto -webkit-focus-ring-color" }}
            >
              Click to Add an Event
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};
