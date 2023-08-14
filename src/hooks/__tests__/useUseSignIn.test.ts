import { renderHook, act } from '@testing-library/react-hooks';
import { useSignIn } from '../useSignIn';

// Mock Firebase and other external functions
jest.mock('../../config/firebaseConfig', () => ({
  firestore: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(),
}));

jest.mock('../../utils/zodiacHelpers', () => ({
  getZodiacSign: jest.fn(),
}));

describe('useSignIn', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set error for invalid email', async () => {
    const { result } = renderHook(() => useSignIn());
    await act(async () => {
        result.current.signIn({ email: 'invalidEmail', password: 'ValidPassword123@' },true);
    });
    expect(result.current.error).toBe('Veuillez entrer une adresse e-mail valide.');
  });

  it('should set error for invalid password', async () => {
    const { result } = renderHook(() => useSignIn());
    await act(async () => {
        result.current.signIn({ email: 'test@example.com', password: 'invalid' }, true );
    });
    expect(result.current.error).toBe('Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial.');
  });

  it('should set error if policy is not accepted', async () => {
    const { result } = renderHook(() => useSignIn());
    await act(async () => {
        result.current.signIn({ email: 'test@example.com', password: 'ValidPassword123@' },false);
    });
    expect(result.current.error).toBe("Vous devez accepter les conditions générales d'utilisation.");
  });

  // Add more tests for successful user creation, failed user creation, etc.
});
