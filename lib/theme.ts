import classes from '@/styles/mantine.module.scss';
import { createTheme, rem } from '@mantine/core';
import { screens } from './app-config';

export function isiPhone() {
  return (
    typeof window !== 'undefined' && /iPhone|iPod/.test(navigator.userAgent)
  );
}

const ERROR_STYLES = {
  error: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    borderRadius: '0.375rem',
  },
};

export const theme = createTheme({
  colors: {
    custom: ['#181220', '#F0F5FF', '', '', '', '', '', '', '', ''],
    'exo-brand': [
      '#07BF62',
      '#07BF62',
      '#07BF62',
      '#0CAE5C',
      '#77FF9E',
      '#07BF62',
      '#0C3932',
      '#0C3932',
      '#0C3932',
      '#0C3932',
    ],
    'text-color': [
      '#ccd0d3',
      '#aab0b5',
      '#808991',
      '#56626c',
      '#667085',
      '#62738D',
      '#01101c',
      '#010d17',
      '#010a11',
      '#00060b',
      '#000407',
    ],
    'error-color': [
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
    ],
    'border-color': [
      '#E4E7EC',
      '#EDEDF4',
      '#E4E7EC',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
    ],
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },
  breakpoints: screens,
  // fontSizes: fontSize,
  primaryColor: 'exo-brand',
  defaultRadius: '0.5rem',
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Instrument Sans, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },

  components: {
    TimeInput: {
      defaultProps: {
        radius: '8px',
      },
      styles() {
        return {
          ...ERROR_STYLES,

          label: {
            fontWeight: 500,
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
          input: {
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderColor: '#DFE0E2 !important',
          },
        };
      },
    },
    InputBase: {
      defaultProps: {
        radius: '8px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 500,
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
          wrapper: {
            // marginBottom: 'md',
          },
          input: {
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderColor: '#DFE0E2 !important',
          },
        };
      },
    },
    TagsInput: {
      defaultProps: {
        radius: '8px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 500,
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
          input: {
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderColor: '#DFE0E2 !important',
          },
        };
      },
    },
    SegmentedControl: {
      classNames: {
        root: 'segmentedControl-custom-root',
        indicator: 'indicator',
        control: 'control',
      },
    },
    TextInput: {
      defaultProps: {
        radius: '8px',
        borderwidth: '3px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 500,
            color: '',
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
          input: {
            className: 'text',
            height: 40,
            '&:invalid': {
              borderColor: '#fff !important',
            },
            borderwidth: '1px',
            fontSize: isiPhone() ? '1rem' : '0.75rem',
          },
        };
      },
    },
    YearPickerInput: {
      defaultProps: {
        radius: '8px',
        borderwidth: '3px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 500,
            color: '',
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
          input: {
            className: 'text',
            height: 40,
            '&:invalid': {
              borderColor: '#fff !important',
            },
            borderwidth: '1px',
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderColor: 'red !important',
          },
        };
      },
    },
    Radio: {
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 500,
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
        };
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: '8px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 500,
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
          input: {
            height: 40,
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderColor: '#DFE0E2 !important',
          },
        };
      },
    },
    NumberInput: {
      defaultProps: {
        radius: '8px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            height: 40,
            fontWeight: 500,
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
          input: {
            height: 40,
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderColor: '#DFE0E2',
          },
        };
      },
    },
    Input: {
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            height: 40,
            fontWeight: 500,
            fontSize: '0.75rem !important',
          },
          input: {
            height: 40,
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderColor: '#DFE0E2',
          },
        };
      },
    },

    Checkbox: {
      defaultProps: {
        radius: '4px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 500,
            fontSize: '0.75rem',
          },
          input: {
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderColor: '#DFE0E2',
          },
        };
      },
    },

    DateInput: {
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 600,
            fontSize: '0.75rem',
          },
          input: {
            height: 40,
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderRadius: '0.275rem',
            borderColor: '#DFE0E2',
          },
        };
      },
    },
    DateTimePicker: {
      defaultProps: {
        radius: '8px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 600,
          },
          input: {
            height: 40,
            // fontSize: isiPhone() ? "1rem" : "0.75rem",
            borderColor: '#DFE0E2',
          },
        };
      },
    },
    DatePickerInput: {
      defaultProps: {
        radius: '8px',
        borderwidth: '3px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 500,
            color: '',
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
          input: {
            height: 40,
            '&:invalid': {
              borderColor: '#fff !important',
            },
            borderwidth: '1px',
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderColor: '#DFE0E2 !important',
          },
        };
      },
    },
    Textarea: {
      defaultProps: {
        radius: '8px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 500,
            color: '',
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
          input: {
            height: 40,
            '&:invalid': {
              // borderColor: '#fff !important',
            },
            borderwidth: '1px',
            // fontSize: isiPhone() ? "1rem" : "0.75rem",
            borderColor: '#DFE0E2 !important',
          },
        };
      },
    },
    Select: {
      defaultProps: {
        radius: '4px',
      },
      styles() {
        return {
          ...ERROR_STYLES,
          label: {
            fontWeight: 500,
            color: '',
            fontSize: '0.75rem',
            marginBottom: '0.3rem',
          },
          input: {
            // height: 40,
            '&:invalid': {
              borderColor: '#fff !important',
            },
            borderwidth: '1px',
            fontSize: isiPhone() ? '1rem' : '0.75rem',
            borderColor: '#DFE0E2 !important',
          },
        };
      },
    },
    // Button: Button.extend({
    //   classNames: classes,
    // }),

    Button: {
      classNames: {
        root: 'button-root',
      },
    },
    ScrollArea: {
      classNames: classes,
    },
    Tabs: {
      classNames: classes,
    },

    CloseButton: {
      styles() {
        return {
          root: {
            '&:active': {
              transform: 'none',
            },
          },
        };
      },
    },

    Avatar: {
      styles() {
        return {
          root: {
            backgroundColor: '#E4E7EC',
          },
        };
      },
    },
    Paper: {
      styles() {
        return {
          root: {
            borderColor: '#EDEDED !important',
          },
        };
      },
    },
  },
  fontFamily: 'TWKLausanne, var(--font-twk), sans-serif',
});
