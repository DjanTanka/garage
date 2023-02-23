import { Column } from 'react-table';
import { TCar, Icarousel } from '../store/interfaces';

export const menu: TMenu[] = [
  { name: 'About us', path: 'pageInDevelopment' },
  { name: 'Parking', path: 'pageInDevelopment' },
  { name: 'Contacts', path: 'pageInDevelopment' },
];

export const сarousel: Icarousel[] = [
  {
    title: 'convenient parking location',
    picture: '/converoment.png',
    order: 1,
  },
  {
    title: 'Experienced craftsmen are always ready to service your auto',
    picture: '/sexyCraftmen.png',
    order: 2,
  },
  {
    title: '24/7 contactless car wash',
    picture: '/contactlessWashing.png',
    order: 3,
  },
];

export const joinUs = [
  {
    title: 'vkontakte',
    src: '/vk.png',
    link: 'https://vk.com',
  },
  {
    title: 'twitter',
    src: '/twitter.png',
    link: 'https://twitter.com',
  },
  {
    title: 'instagram',
    src: '/instagram.png',
    link: 'https://www.instagram.com',
  },
];

export const columnsTableApp: Column<TCar>[] = [
  {
    Header: 'Model',
    accessor: 'model', // accessor is the "key" in the data
  },
  {
    Header: 'Number car',
    accessor: 'registrationNumber',
  },
  {
    Header: 'VehicalWeare',
    accessor: 'vehicalWeare',
  },
  {
    Header: 'Delete',
    accessor: 'del',
  },
];
