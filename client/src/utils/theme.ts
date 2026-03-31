import { createTheme } from "@mantine/core";

export const theme = createTheme({
    fontFamily: 'JetBrains Mono, monospace',
    fontFamilyMonospace: 'JetBrains Mono, monospace',
    primaryColor: 'green',
    colors: {
        brand: [
            '#0A190F', // 0
            '#0A190F', // 1
            '#0B2E18', // 2
            '#0D4422', // 3
            '#0F5A2C', // 4
            '#047A4F', // 5
            '#04BF7B', // 6 - primary
            '#05D98C', // 7
            '#06F09B', // 8
            '#80F8CD', // 9
        ],
    },
    primaryShade: 6,
    defaultRadius: 'sm',
    black: '#030303',
    white: '#F7F0EE',
    components: {
        Button: {
            defaultProps: {
                variant: 'filled',
            },
        },
    },
    other: {
        background: '#030303',
    },
});