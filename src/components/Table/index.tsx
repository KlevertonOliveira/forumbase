import { FC } from "react";

import { Flex, Table as ChakraTable, Tbody, Td, Th, Thead, Tr, Text, useColorModeValue, Image, Center } from '@chakra-ui/react';
import { categories } from '../../data/categories';

const Table: FC = () => {

  let tableCategories = [...categories];
  tableCategories.unshift(
    {
      title: 'ALL',
      iconPath: '/images/collection-icon.svg',
      alt: 'An icon of a collection of text files'
    }
  )

  /* Special styles (for light/dark mode) */
  const categoriesBgColor = useColorModeValue('white', 'gray.700');
  const categoriesBgColorHover = useColorModeValue('blue.100', 'gray.600');
  const categoriesTextColor = useColorModeValue('gray.900', 'white');
  const TrBorderColor = useColorModeValue('gray.300', 'gray.600');

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
            <Tr
              key={category.title}
              bg={categoriesBgColor}
              color={categoriesTextColor}
              _hover={{ backgroundColor: categoriesBgColorHover }}
              cursor={'pointer'}
            >
              <Td borderBottom='1px solid' borderColor={TrBorderColor}>
                <Flex gap={3} alignItems={'center'}>
                  <Image src={category.iconPath} alt={category.alt} />
                  <Text fontWeight={'semibold'}>{category.title}</Text>
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