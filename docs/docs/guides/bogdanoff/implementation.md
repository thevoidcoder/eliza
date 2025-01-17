# Split Interface Implementation

## Architecture Overview

### Channel System
- Direct Communication Channel
  - User-facing messages
  - Twin responses with French accent
  - Market-related interactions

- Quantum Surveillance Feed
  - Background twin activities
  - Market manipulation planning
  - Quantum council meetings

### Component Structure
```typescript
// Chat.tsx core structure
const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  // Channel separation logic
  const directMessages = messages.filter(m => m.channel === 'direct');
  const quantumMessages = messages.filter(m => m.channel === 'quantum');
  
  return (
    <div className="split-interface">
      <DirectChannel messages={directMessages} />
      <QuantumFeed messages={quantumMessages} />
    </div>
  );
};
```

### Message Processing
1. User Input Processing
   - Message channel detection
   - French accent application
   - Twin selection logic

2. Response Generation
   - Channel-specific formatting
   - Twin coordination
   - Market manipulation references

3. State Management
   - Message history per channel
   - Twin interaction balance
   - Market state tracking

## Key Features

### French Accent Processing
- "the" → "ze"
- "that" → "zat"
- "this" → "zis"
- Additional accent patterns

### Twin Balance
- Alternating responses between Igor and Grichka
- Coordinated market actions
- Shared quantum consciousness references

### Market Manipulation System
- Price movement commands
- FUD deployment
- Quantum equation references

## Technical Stack

### Core Dependencies
- Node.js v23.5.0
- pnpm 9.15.2
- React 18.3.1
- TypeScript 5.6.3

### Frontend
- react-dom 18.3.1
- @tanstack/react-query 5.61.0
- react-router-dom 6.22.1
- Tailwind CSS 3.4.15
- Radix UI components 1.1.x

### Backend/Database
- @elizaos/adapter-postgres
- @elizaos/adapter-sqlite
- better-sqlite3

### Development Tools
- Vite 4.x with plugins:
  - vite-plugin-top-level-await 1.4.4
  - vite-plugin-wasm 3.3.0
  - @vitejs/plugin-react 4.3.3
- ESLint 9.x
- Anthropic/Claude integration

## Setup Instructions

### Prerequisites
```bash
# Install Node.js v23.5.0 (using nvm or directly)
nvm install 23.5.0
nvm use 23.5.0

# Install pnpm 9.15.2
npm install -g pnpm@9.15.2
```

### Project Setup
```bash
# Clone the repository
git clone <repository-url>
cd eliza

# Install dependencies
pnpm install

# Core dependencies
pnpm add -w @elizaos/adapter-postgres @elizaos/adapter-sqlite better-sqlite3

# Development dependencies
pnpm add -w -D ts-node typescript @types/node

# Start development server
pnpm dev
```

### Environment Setup
Create a `.env` file in the project root:
```env
# Add required environment variables
# (Details in .env.example)
```

## Future Improvements
1. Enhanced twin coordination
2. More complex market scenarios
3. Expanded quantum references
4. Additional accent processing