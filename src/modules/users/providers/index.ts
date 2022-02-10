import { container } from 'tsyringe';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvier';
import IHashProvider from './HashProvider/models/IHasProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
