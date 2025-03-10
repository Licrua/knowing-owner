import { createTheme } from '@mui/material/styles';
declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
      iconTable: true;
    }
  }
const theme = createTheme({
    palette: {
        primary: {
            main: '#27272A',  // Черный цвет для основной палитры
        },
        text: {
            primary: '#FFFFFF',  // Белый цвет для текста
        },
        background: {
            default: '#1cd3a2', // Черный цвет фона для всего приложения
            paper: '#1cd3a2',   // Цвет фона контейнеров, бумаги и прочих элементов
        },
      
    },
    typography: {
        allVariants: {
            color: '#FFFFFF',  // Белый цвет для всех текстовых элементов
        },
        fontFamily:'Roboto',
        fontWeightRegular: 400,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none', 
                },
            },
        },
        
        MuiButton: {
            variants: [
                {
                  props: { variant: 'iconTable' },
                  style: {
                    textTransform: 'none',
                    padding: '6px',
                    minWidth: '0'
                  },
                },
            ]
        },

        MuiTableCell: {
            styleOverrides: {
              root: {
                borderBottom: '1px solid #414144',
                 // Пример изменения цвета фона
                '&.icon-cell': {
                    '.icon-cell__btn-grp': {
                        width: '70px',
                       
                        '&:hover': {
                            backgroundColor: '#414144',
                            borderRadius: '10px',
                          },
                      },
                },
              },
              head: {
                color: '#A1A1AA',  // Цвет текста в заголовках таблицы
            },
            },
    
        },

        MuiOutlinedInput: {
            styleOverrides: {
              notchedOutline: {
                borderColor: '#414144',
                padding: '4px 10px'
              },
              input: {
                padding: '4px 5px', // Здесь вы можете установить нужный padding
              },
              root: {
                padding: '0px', // если нужно переопределить padding для корневого элемента
              },
            },
        },

        MuiDivider: {
            styleOverrides: {
              root: {
               borderColor: '#414144', 
              },
            },
        },

        MuiListSubheader:{
            styleOverrides: {
                root: {
                    display: 'flex',
                    justifContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                    backgroundColor: '#27272A',
                    color:'#A1A1AA'
                },
              },
        },

        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: '#A1A1AA',
                    },
                },
            },
        }
    }
});

export default theme;