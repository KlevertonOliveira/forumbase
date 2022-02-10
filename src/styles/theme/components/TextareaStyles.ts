import {mode} from '@chakra-ui/theme-tools';

export const TextareaStyles = {
  variants:{
    outline: (props:any)=> ({
      transition:"background-color 350ms ease-in-out",

      backgroundColor: mode('white', 'gray.700')(props),

      _placeholder:{
        color: mode('gray.900', 'gray.100')(props) 
      },

      border: '2px solid',
      borderColor: mode('mainGray.300', 'gray.600')(props),

      _hover:{
          borderColor: mode('gray.400', 'gray.500')(props),
        },

      _focus:{
        borderColor: mode('orange.500', 'orange.400')(props),
        boxShadow: 'none'
      }
    })
  }
}