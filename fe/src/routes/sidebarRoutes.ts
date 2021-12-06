import { BiCheckSquare, BiEdit } from 'react-icons/bi';

const sidebarRoutes = [
    {
        label: 'Board',
        icon: BiEdit,
        path: '/board',
        exact: false,
    },
    {
        label: 'Todo',
        icon: BiCheckSquare,
        path: '/todo',
        exact: false,
    },
];

export default sidebarRoutes;

export type SidebarMenuRoute = typeof sidebarRoutes[0];
