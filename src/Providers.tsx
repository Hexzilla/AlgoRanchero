import React from 'react'
import { NotificationsProvider } from '@mantine/notifications';
import { Options } from '@randlabs/myalgo-connect';
import { AlgoProvider } from "./components/AlgoContext";

const options = {
} as Options;

const Providers = ({ children }: { children: any }) => {
  return (
    <AlgoProvider options={options}>
      <NotificationsProvider>
        { children }
      </NotificationsProvider>
    </AlgoProvider>
  )
}

export default Providers
