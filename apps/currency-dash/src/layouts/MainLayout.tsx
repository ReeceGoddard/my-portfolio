import { Children, ReactElement, ReactNode } from 'react';
import './MainLayout.css';

type SlotProps = {
    name: 'sidebar' | 'content';
    children: ReactNode;
};

const Slot: React.FC<SlotProps> = () => null;

type MainLayoutProps = {
    children: ReactElement<SlotProps>[];
};

export const MainLayout: React.FC<MainLayoutProps> & { Slot: React.FC<SlotProps> } = ({ children }) => {
    const childrenArray = Children.toArray(children) as unknown as React.ReactElement[];
    const sidebarSlot = childrenArray.find(child => child?.props?.name === 'sidebar');
    const contentSlot = childrenArray.find(child => child?.props?.name === 'content');

    return (
        <main>
            <div className="sidebar">{sidebarSlot?.props?.children}</div>
            <div className="content">{contentSlot?.props?.children}</div>
        </main>
    );
};

MainLayout.Slot = Slot;
