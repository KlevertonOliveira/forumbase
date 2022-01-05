import { FC } from "react";

import { Flex, Table as ChakraTable, Tbody, Td, Th, Thead, Tr, Text, useColorModeValue, Image, Center } from '@chakra-ui/react';
import { categories } from '../../data/categories';

type TableProps = {
  currentSelectedCategory: string;
  setCurrentSelectedCategory: (category: string) => void;
};

const Table: FC<TableProps> = ({ currentSelectedCategory, setCurrentSelectedCategory }) => {

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
        <Tr>
          <Th textAlign={'center'}>Categories</Th>
        </Tr>
      </Thead>

      <Tbody>
        {
          tableCategories.map(category => {
            const isCurrentSelectedCategory = (currentSelectedCategory === category.title);

            return (
              <Tr
                key={category.title}
                bg={isCurrentSelectedCategory ? categoriesBgColorHover : categoriesBgColor}
                color={categoriesTextColor}
                cursor={'pointer'}
                _hover={{ backgroundColor: isCurrentSelectedCategory ? 'none' : categoriesBgColorHover }}
                transition="background-color 200ms ease-in-out"
              >
                <Td
                  borderBottom='1px solid'
                  borderColor={TrBorderColor}
                  onClick={() => { setCurrentSelectedCategory(category.title); }}
                >
                  <Flex gap={3} alignItems={'center'}>
                    <Image src={category.iconPath} alt={category.alt} />
                    <Text fontWeight={'semibold'}>{category.title}</Text>
                  </Flex>
                </Td>
              </Tr>
            );
          }
          )
        }
      </Tbody>

    </ChakraTable>
  );
};

export default Table;