import { screen, fireEvent } from '@testing-library/dom';
import { render } from './test-utils';
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
  expect(await screen.findByText(/228/i)).toBeInTheDocument();
  expect(await screen.findByText(/NYSE/i)).toBeInTheDocument();
  expect(await screen.findByText(/23/i)).toBeInTheDocument();
  expect(await screen.findByText(/TSX/i)).toBeInTheDocument();
  expect(await screen.findByText(/25/i)).toBeInTheDocument();
  expect(await screen.findByText(/AMEX/i)).toBeInTheDocument();
  expect(await screen.findByText(/10/i)).toBeInTheDocument();
  expect(await screen.findByText(/NASDAQ/i)).toBeInTheDocument();
  expect(await screen.findByText(/80/i)).toBeInTheDocument();
  expect(await screen.findByText(/EURONEXT/i)).toBeInTheDocument();
  expect(await screen.findByText(/90/i)).toBeInTheDocument();
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

test('Should sort exchanges by id in alphabetically in ascending order', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Sort by/i));
  fireEvent.click(screen.getByText(/A - Z/i));
  const items = screen.queryAllByRole('heading', { level: 1 });
  expect(items[1]).toHaveTextContent(/AMEX/i);
  expect(items[items.length - 1]).toHaveTextContent(/TSX/i);
});

test('Should sort exchanges by id in alphabetically in descending order', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Sort by/i));
  fireEvent.click(screen.getByText(/Z - A/i));
  const items = screen.queryAllByRole('heading', { level: 1 });
  expect(items[1]).toHaveTextContent(/TSX/i);
  expect(items[items.length - 1]).toHaveTextContent(/AMEX/i);
});

test('Should sort exchanges by volume lowest to highest', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Sort by/i));
  fireEvent.click(screen.getByText(/Volume - Lowest/i));
  const items = screen.queryAllByRole('heading', { level: 1 });
  expect(items[1]).toHaveTextContent(/AMEX/i);
  expect(items[items.length - 1]).toHaveTextContent(/EURONEXT/i);
});

test('Should sort exchanges by volume highest to lowest', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Sort by/i));
  fireEvent.click(screen.getByText(/Volume - Highest/i));
  const items = screen.queryAllByRole('heading', { level: 1 });
  expect(items[1]).toHaveTextContent(/EURONEXT/i);
  expect(items[items.length - 1]).toHaveTextContent(/AMEX/i);
});
