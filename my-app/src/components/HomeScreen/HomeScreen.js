import React from "react";
import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";

const HomeScreen = () => {
    return (
        <div>
            <Navbar />
            <Box
                bg="blue.50"
                py="12"
                px="6"
                maxW="container.xl"
                mx="auto"
                textAlign="center"
            >
                <Stack spacing="6" align="center">
                    <Heading as="h1" size="2xl" color="teal.600">
                        Welcome to Our Store
                    </Heading>
                    <Text fontSize="lg" color="gray.700" maxW="600px">
                        Discover amazing products across various categories. Shop now and enjoy exclusive offers with fast delivery and quality service!
                    </Text>
                    <Button
                        colorScheme="teal"
                        size="lg"
                        px="8"
                        py="6"
                        fontSize="xl"
                        onClick={() => window.location.href = "/products"}
                    >
                        Shop Now
                    </Button>
                </Stack>
            </Box>
        </div>
    );
};

export default HomeScreen;
