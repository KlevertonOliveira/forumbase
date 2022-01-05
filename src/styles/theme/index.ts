import { extendTheme, theme as base, withDefaultVariant } from '@chakra-ui/react';
import { ButtonStyles as Button } from './components/ButtonStyles';
import { TextareaStyles as Textarea } from './components/TextareaStyles';
import { CommonInputSelectStyles } from './components/CommonInputSelectStyles';
import {LinkStyles as Link} from './components/LinkStyles';

const theme = extendTheme({
  colors:{
      mainGray: {
        100: '#E9F2DA',
        200: '#D2DAC4',
        300: '#A3A999'
      },
  },
  
  fonts:{
      heading: `Inter, ${base.fonts.heading}`,
      body: `Inter, ${base.fonts.body}`
  },

  components:{
    Button,
    Link,
    Textarea,
    Input: {...CommonInputSelectStyles},
    Select: {...CommonInputSelectStyles}
  },
},

  withDefaultVariant({
    variant:'outline',
    components: ['Input', 'Select', 'Textarea'],
  }),

);

export default theme;