import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="Outfit-Light"
      rel="preload"
      href="/fonts/Outfit-Light.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
    />,
    <link
    key="Outfit-Medium"
    rel="preload"
    href="/fonts/Outfit-Medium.ttf"
    as="font"
    type="font/ttf"
    crossOrigin="anonymous"
  />
  ]);
};