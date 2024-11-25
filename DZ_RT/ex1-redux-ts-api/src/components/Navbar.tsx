import React from 'react';
import { Box, Flex, Link, Button, IconButton } from '@chakra-ui/react';


const Navbar = () => {

  return (
    <Box bg={ 'white'} shadow="md" py={3}>
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto" px={6}>
        <Box fontWeight="bold" fontSize="xl" color={'gray.800'}>
          MyApp
        </Box>
        <Flex as="nav" align="center" gap={6}>
          <Link href="/" fontWeight="semibold" color={ 'gray.600'} _hover={{ color: 'blue.400' }}>
            Home
          </Link>
          <Link href="/products" fontWeight="semibold" color={ 'gray.600'} _hover={{ color: 'blue.400' }}>
            List
          </Link>
          <Link href="/create" fontWeight="semibold" color={ 'gray.600'} _hover={{ color: 'blue.400' }}>
            Create
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
