import { render, screen, fireEvent } from './test-utils';
import App from './App';

jest.mock('./utils/utils.js');

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

test('Should fetch and display symbols on homepage', async () => {
  render(<App />);
  expect(await screen.findByText(/48/i)).toBeInTheDocument();
  expect(await screen.findByText(/NYSE/i)).toBeInTheDocument();
  expect(await screen.findByText(/23/i)).toBeInTheDocument();
  expect(await screen.findByText(/TSX/i)).toBeInTheDocument();
  expect(await screen.findByText(/25/i)).toBeInTheDocument();
});

test('Should fetch and display symbols for selected symbol on detail page', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/NYSE/i));
  expect(await screen.findByText(/23/i)).toBeInTheDocument();
  expect(await screen.findByText(/VIT/i)).toBeInTheDocument();
  expect(await screen.findByText(/JPM/i)).toBeInTheDocument();
  expect(await screen.findByText(/10/i)).toBeInTheDocument();
  expect(await screen.findByText(/13/i)).toBeInTheDocument();
});

test('Should navigate to back homepage', async () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('back'));
  expect(await screen.findByText(/NYSE/i)).toBeInTheDocument();
  expect(await screen.findByText(/TSX/i)).toBeInTheDocument();
  expect(await screen.findByText(/25/i)).toBeInTheDocument();
});

test('Should type in search field', async () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Search Market')).toBeInTheDocument();
  const input = screen.getByPlaceholderText('Search Market');
  fireEvent.change(input, { target: { value: 'TSX' } });
  expect(input.value).not.toBe('NYSE');
  expect(input.value).toBe('TSX');
  expect(await screen.queryByText(/NYSE/i)).not.toBeInTheDocument();
  expect(await screen.queryByText(/TSX/i)).toBeInTheDocument();
});
