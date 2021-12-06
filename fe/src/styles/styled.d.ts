import 'styled-components';
import { Theme } from 'src/styles/themes';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
