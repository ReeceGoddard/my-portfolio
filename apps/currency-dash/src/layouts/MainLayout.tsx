import { Children, ReactElement, ReactNode } from 'react';
import './MainLayout.css';

type SlotProps = {
    name: 'selector' | 'content';
    children: ReactNode;
};

const Slot: React.FC<SlotProps> = () => null;

type MainLayoutProps = {
    children: ReactElement<SlotProps>[];
};

export const MainLayout: React.FC<MainLayoutProps> & { Slot: React.FC<SlotProps> } = ({ children }) => {
    const childrenArray = Children.toArray(children) as unknown as React.ReactElement[];
    const selectorSlot = childrenArray.find(child => child?.props?.name === 'selector');
    const contentSlot = childrenArray.find(child => child?.props?.name === 'content');

    return (
        <main>
            <div className="content">{contentSlot?.props?.children}</div>
            <aside className="selector">{selectorSlot?.props?.children}</aside>
        </main>
    );
};

MainLayout.Slot = Slot;
