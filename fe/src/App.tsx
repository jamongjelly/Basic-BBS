import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from 'src/components/ui/scroll/ScrollToTop';
import { ACCESS_TOKEN } from 'src/constants';
import { Core, SidebarContainer } from 'src/pages/containers';
import { RootState } from 'src/redux';
import { userActions } from 'src/redux/modules/user';
import RootRouter from 'src/routes/RootRouter';
import GlobalStyles from 'src/styles/GlobalStyles';
import { darkTheme, lightTheme } from 'src/styles/themes';
import styled, { ThemeProvider } from 'styled-components';

const Section = styled.section`
  min-width: 90rem;
  flex: 1;
  overflow-y: scroll;
`;

const App = () => {
  const dispatch = useDispatch();
  const { currentUser, themeMode } = useSelector((state: RootState) => ({
    currentUser: state.user.currentUser,
    themeMode: state.core.themeMode,
  }));

  useEffect(() => {
    if (!currentUser && localStorage.getItem(ACCESS_TOKEN)) {
      dispatch(userActions.loadCurrentUserAsync.request());
    }
  }, [currentUser]);

  return (
    <ThemeProvider theme={themeMode === 'LIGHT' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Core />
      <section>
        <SidebarContainer />
      </section>
      <Section>
        <ScrollToTop>
          <RootRouter />
        </ScrollToTop>
      </Section>
    </ThemeProvider>
  );
};

export default App;
