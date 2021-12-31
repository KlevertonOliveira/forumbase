import { FC } from "react";

import { Flex, Icon, Table as ChakraTable, Tbody, Td, Th, Thead, Tr, Text, useColorModeValue, Center } from '@chakra-ui/react';
import { BsCollectionFill } from 'react-icons/bs';
import { FaHtml5 } from 'react-icons/fa';
import { categories } from '../../data/categories';

const Table: FC = () => {

  let tableCategories = [...categories];
  tableCategories.unshift('All Topics');

  /* Special styles (for light/dark mode) */
  const categoriesBgColor = useColorModeValue('white', 'gray.700');
  const categoriesTextColor = useColorModeValue('gray.900', 'white');

  return (
    <ChakraTable variant='simple' maxW={'max-content'} size={'md'}>

      <Thead>
        <Center>
          <Th>Categories</Th>
        </Center>
      </Thead>

      <Tbody>
        {
          tableCategories.map(category => (
            <Tr key={category} bg={categoriesBgColor} color={categoriesTextColor}>
              <Td border='1px solid gray'>
                <Flex gap={2} alignItems={'center'}>
                  <Icon as={FaHtml5} h={6} w={6} />
                  <Text>{category}</Text>
                </Flex>
              </Td>
            </Tr>
          ))
        }
      </Tbody>

    </ChakraTable>
  );
};

export default Table;