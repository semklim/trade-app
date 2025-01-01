# Currency Exchange Application

A modern web application for managing currency exchange transactions built with React, TypeScript, and Vite.

## Features

- Currency exchange transaction management
- Real-time currency conversion
- Role-based access control (Manager, Cashier, Administrator)
- Responsive modern UI with Tailwind CSS
- Transaction history and reporting

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Redux Toolkit for state management
- Tailwind CSS for styling
- React Router for navigation
- React Hook Form for form handling

## Project Structure

```
src/
├── components/     # Shared React components
├── constants/      # Shared constants
├── hooks/          # Custom React hooks
├── pages/          # Application pages
├── store/          # Redux slices and context providers
├── styles/         # Tailwind CSS configuration
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── validation/     # Validation schemas
└── App.tsx         # Main application entry point
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## ESLint Configuration

The project uses ESLint with TypeScript support. For production applications, enable type-aware lint rules:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
