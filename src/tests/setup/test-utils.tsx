import React, { PropsWithChildren, JSX } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { setupStore } from '../../state/store';
import type { AppStore, RootState } from '../../state/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

/**
 * Render the given React element tree with the Redux `<Provider>` component.
 *
 * If no `store` is provided, a new store instance will be created and passed
 * as a prop to the `Provider` component.
 *
 * @param ui The React element tree to render. This should include your Redux-connected components.
 * @param options
 * @param options.preloadedState Initial state to pass to the store.
 * @param options.store The store instance to use. If not provided, a new store will be created.
 * @param options.renderOptions Options to pass to the `render` method from `@testing-library/react`.
 * @returns The rendered tree, plus the store instance.
 */
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
