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
  contentPerPage: number;
  contentTotalSize: number;
  setCurrentSelectedPage: (page: number) => void;
};

const CustomPagination: FC<CustomPaginationProps> = ({ contentPerPage, contentTotalSize, setCurrentSelectedPage }) => {

  const {
    currentPage,
    setCurrentPage,
    pagesCount,
    pages
  } = usePagination({
    total: contentTotalSize,
    initialState: {
      currentPage: 1,
      pageSize: contentPerPage,
      isDisabled: false,
    }
  });

  setCurrentSelectedPage(currentPage);

  /* Special styles from Chakra (for light/dark mode) */

  const pageButtonStyles = {
    bg: useColorModeValue('blue.600', 'whiteAlpha.900'),
    _hover: {
      bg: useColorModeValue('blue.700', 'whiteAlpha.800'),
    },
    _active: { bg: useColorModeValue('blue.800', 'whiteAlpha.700') },
    color: useColorModeValue('white', 'blue.600')
  }

  const currentPageButtonStyles = {
    backgroundColor: useColorModeValue('orange.400', 'orange.500'),
    color: 'white',
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
      >
        <PaginationPrevious {...pageButtonStyles}>
          Previous
        </PaginationPrevious>
        <PaginationPageGroup>
          {
            pages.map((page: number) => (
              <PaginationPage
                key={`pagination_page_${page}`}
                {...pageButtonStyles}
                page={page}
                w={7}
                fontSize="sm"
                _current={{ ...currentPageButtonStyles }}
              >
              </PaginationPage>
            ))
          }
        </PaginationPageGroup>
        <PaginationNext {...pageButtonStyles}>
          Next
        </PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
};

export default CustomPagination;