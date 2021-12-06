import produce from 'immer';
import { ActionType, createAction, createReducer } from 'typesafe-actions';

// Action Types
const TOGGLE_THEME = 'core/TOGGLE_THEME';

// Payload & Response Types
export type ThemeMode = 'LIGHT' | 'DARK';

// Action Creators
const toggleTheme = createAction(TOGGLE_THEME)<ThemeMode>();

export const coreActions = {
    toggleTheme,
};

// State & Actions Types
export type CoreState = {
    themeMode: ThemeMode;
};

export type CoreActions = ActionType<typeof coreActions>;

// Initial State
const initState: CoreState = {
    themeMode: 'LIGHT',
};

// Reducer
const core = createReducer<CoreState, CoreActions>(initState, {
    [TOGGLE_THEME]: (state, { payload: theme }) => {
        return produce(state, (draft) => {
            draft.themeMode = theme;
        });
    },
});

export default core;
