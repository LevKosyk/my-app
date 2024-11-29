import React from 'react';
import { Box, Flex, Link, Button, useColorMode, IconButton } from '@chakra-ui/react';


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); 
  const isDark = colorMode === 'dark';

  return (
    <Box bg={isDark ? 'gray.800' : 'white'} shadow="md" py={3}>
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto" px={6}>
        <Box fontWeight="bold" fontSize="xl" color={isDark ? 'white' : 'gray.800'}>
          MyApp
        </Box>
        <Flex as="nav" align="center" gap={6}>
          <Link href="/" fontWeight="semibold" color={isDark ? 'gray.200' : 'gray.600'} _hover={{ color: 'blue.400' }}>
            Home
          </Link>
          <Link href="/products" fontWeight="semibold" color={isDark ? 'gray.200' : 'gray.600'} _hover={{ color: 'blue.400' }}>
            List
          </Link>
          <Link href="/create" fontWeight="semibold" color={isDark ? 'gray.200' : 'gray.600'} _hover={{ color: 'blue.400' }}>
            Create
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
