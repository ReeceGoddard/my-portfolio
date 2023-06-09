import { AppProvider } from '@providers/app';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes';
import './styles/reset.css';
import './styles/global.css';

function App() {
    return (
        <AppProvider>
            <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </AppProvider>
    );
}

export default App;
