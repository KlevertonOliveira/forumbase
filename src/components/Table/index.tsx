import { FC } from "react";

import { Flex, Table as ChakraTable, Tbody, Td, Th, Thead, Tr, Text, useColorModeValue, Image, Center, Button } from '@chakra-ui/react';
import { categories } from '../../data/categories';

type TableProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const Table: FC<TableProps> = ({ selectedCategory, setSelectedCategory }) => {

  let tableCategories = [...categories];
  tableCategories.unshift(
    {
      title: 'ALL',
      iconPath: '/images/all-topics-icon.svg',
      alt: 'An icon of a collection of files'
    }
  )

  /* Special styles (for light/dark mode) */
  const categoriesBgColor = useColorModeValue('white', 'gray.700');
  const categoriesBgColorHover = useColorModeValue('blue.100', 'gray.500');
  const currentSelectedCategoryBg = useColorModeValue('blue.200', 'gray.600');
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
            const isCurrentSelectedCategory = (selectedCategory === category.title);

            return (
              <Tr
                key={category.title}
                title={category.title}
                bg={isCurrentSelectedCategory ? currentSelectedCategoryBg : categoriesBgColor}
                color={categoriesTextColor}
                cursor={'pointer'}
                _hover={{ backgroundColor: isCurrentSelectedCategory ? 'none' : categoriesBgColorHover }}
                _focus={{
                  border: '3px solid',
                  borderColor: 'orange.400'
                }}
                tabIndex={0}
                onClick={() => { setSelectedCategory(category.title); }}
                onKeyPress={(event) => {
                  (event.key === 'Enter' || event.key === ' ') &&
                    setSelectedCategory(category.title);
                }}
              >
                <Td
                  borderBottom='1px solid'
                  borderColor={TrBorderColor}
                >
                  <Flex gap={3} alignItems={'center'}>
                    <Image src={category.iconPath} alt={category.alt} />
                    <Text fontWeight={isCurrentSelectedCategory ? 'bold' : 'medium'}>{category.title}</Text>
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