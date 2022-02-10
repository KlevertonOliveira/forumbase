import { extendTheme, theme as base, withDefaultVariant } from '@chakra-ui/react';
import { ButtonStyles as Button } from './components/ButtonStyles';
import { TextareaStyles as Textarea } from './components/TextareaStyles';
import { CommonInputSelectStyles } from './components/CommonInputSelectStyles';
import {LinkStyles as Link} from './components/LinkStyles';

const theme = extendTheme({
  colors:{
    mainGray: {
      100: '#F1F3F4',
      200: '#E8EAED',
      300: '#d1d3d5',
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