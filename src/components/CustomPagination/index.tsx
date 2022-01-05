import { FC } from "react";
import {
  Pagination,
  usePagination,
  PaginationPrevious,
  PaginationNext,
  PaginationPage,
  PaginationContainer,
  PaginationPageGroup
} from '@ajna/pagination';

import { useColorModeValue } from '@chakra-ui/react';

type CustomPaginationProps = {
  postsPerPage: number;
  postsTotal: number;
  setCurrentSelectedPage: (page: number) => void;
};

const CustomPagination: FC<CustomPaginationProps> = ({ postsPerPage, postsTotal, setCurrentSelectedPage }) => {

  const {
    currentPage,
    setCurrentPage,
    pagesCount,
    pages
  } = usePagination({
    total: postsTotal,
    initialState: {
      currentPage: 1,
      pageSize: postsPerPage,
      isDisabled: false,
    }
  });

  setCurrentSelectedPage(currentPage);

  /* Custom Styles for Current Page Button */

  const currentPageButtonStyles = {
    backgroundColor: useColorModeValue('orange.400', 'orange.500'),
    _hover: {
      backgroundColor: useColorModeValue('orange.500', 'orange.600'),
    },
    _active: {
      backgroundColor: useColorModeValue('orange.600', 'orange.700'),
    },
    _focus: {
      ring: 3,
      ringColor: useColorModeValue('orange.500', 'orange.300')
    }
  };

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      <PaginationContainer
        w='full'
        justifyContent={'center'}
        gap={8}
        p={2}
        mt={'2px'}
        borderRadius={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        borderBottom={'1px solid'}
        borderColor={useColorModeValue('gray.300', 'gray.600')}
      >
        <PaginationPrevious
          bg={'blue.600'}
          _hover={{ bg: 'blue.700' }}
          _active={{ bg: 'blue.800' }}
          color='white'
        >
          Previous
        </PaginationPrevious>
        <PaginationPageGroup>
          {
            pages.map((page: number) => (
              <PaginationPage
                key={`pagination_page_${page}`}
                page={page}
                w={7}
                fontSize="sm"
                color='white'
                bg={'blue.600'}
                _hover={{ bg: 'blue.700' }}
                _active={{ bg: 'blue.800' }}
                _current={{ ...currentPageButtonStyles }}
              >
              </PaginationPage>
            ))
          }
        </PaginationPageGroup>
        <PaginationNext
          bg={'blue.600'}
          _hover={{ bg: 'blue.700' }}
          _active={{ bg: 'blue.800' }}
          color='white'
        >
          Next
        </PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
};

export default CustomPagination;