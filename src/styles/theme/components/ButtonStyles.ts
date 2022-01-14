import {mode} from '@chakra-ui/theme-tools';

export const ButtonStyles = {
  baseStyle:{
    transition:"background-color 350ms ease-in-out",
    _focus:{
        ring: 3,
        ringColor: 'orange.400'
    }
  },

  variants:{
    primary:(props:any)=>({
      rounded: 'md',
      color: 'white',
      backgroundColor: mode('orange.400', 'orange.500')(props),
      
      _hover: {
        backgroundColor: mode('orange.500', 'orange.600')(props),
        _disabled:{
          backgroundColor: mode('orange.400', 'orange.500')(props),
        }
      },
      
      _active: {
        backgroundColor: mode('orange.600', 'orange.700')(props)
      },

      _focus:{
        ringColor: mode('orange.500', 'orange.300')(props)
      },
    }),

    secondary:(props: any)=>({
      rounded: 'md',
      color: mode('gray.700', 'white')(props),
      border: '1px solid',
      borderColor: mode('mainGray.200', 'gray.500')(props),
      backgroundColor: mode('mainGray.200', 'gray.600')(props),
      _hover:{
        backgroundColor: mode('mainGray.300', 'gray.700')(props),
      }
    })
  }
}