import {dirname} from 'path';
import { fileURLToPath } from 'url';

export const __fileName = fileURLToPath(import.meta.url);
export const __dirname = dirname(__fileName);