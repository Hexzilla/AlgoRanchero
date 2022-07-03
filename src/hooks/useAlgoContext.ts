import { useContext } from "react";
import { AlgoContext } from "../components/AlgoContext/Context";
import type { AlgoContextValue } from "../components/AlgoContext/Context";

/**
 * A hook to access the value of the `AlgoContext`. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @returns {any} the value of the `AlgoContext`
 *
 * @example
 *
 * import React from 'react'
 * import { useReduxContext } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */
export function useAlgoContext(): AlgoContextValue | null {
  const contextValue = useContext(AlgoContext);

  if (process.env.NODE_ENV !== "production" && !contextValue) {
    throw new Error(
      "could not find react-redux context value; please ensure the component is wrapped in a <AlgoProvider>"
    );
  }

  return contextValue;
}
