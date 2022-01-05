import {mode} from '@chakra-ui/theme-tools';

export const CommonInputSelectStyles = {
  variants:{
    outline:(props: any)=>({
      field:{
        backgroundColor: mode('white', 'gray.700')(props), 
        _placeholder:{
          color: mode('gray.900', 'gray.200')(props) 
        },
        
        border: '3px solid',

        _focus:{
          borderColor: mode('orange.500', 'orange.400')(props),
          boxShadow: 'none'
        }
      }
    })
  },
}