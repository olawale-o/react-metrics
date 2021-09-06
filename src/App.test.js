import { render, screen, fireEvent } from './test-utils';
import App from './App';

jest.mock('./utils/utils.js');

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
