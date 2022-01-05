import {mode} from '@chakra-ui/theme-tools';

export const LinkStyles = {
  baseStyle:(props:any)=>({
    fontWeight:'semibold',

    color:mode('orange.400', 'orange.500')(props),
    _hover:{
      color: mode("orange.500", "orange.400")(props),
      textDecoration: 'underline',
    },

    _focus:{
      border: '3px solid',
      borderColor: mode('orange.500', 'orange.400')(props),
      boxShadow: 'none',
    }
  }),
}