import { FC } from 'react';
import { ConstructorCalculator } from '../pages/constructor-calculator';
import { Provider } from 'react-redux';
import { store } from '../pages/store';
import './App.scss'

interface AppProps {

}

const App: FC<AppProps> = ({ }) => {
	return (
		<Provider store={store}>
			<div className='app'>
				<main className='content'>
					<ConstructorCalculator />
				</main>
			</div >
		</Provider>
	);
}

export { App };
