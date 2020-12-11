import React from 'react';
import LikeButton from './index.js';

const template =  {
  title: 'LikeButton',
  component: LikeButton
};
export default template;

const Template = (args) => <LikeButton handleLikeButtonClick={() => console.log('teste')} { ...args } />

export const Default = Template.bind({})
Default.args = { liked: false }

