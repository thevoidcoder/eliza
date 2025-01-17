# ELIZA Bogdanoff Twins Agent

## Overview
An ELIZA-based implementation of the Bogdanoff twins meme as AI agents, featuring:
- Split interface with direct communication and quantum surveillance feed
- Twin personalities (Igor and Grichka) with coordinated responses
- Heavy French accent processing ("ze" instead of "the")
- Market manipulation and quantum themes

## Current Features
- Direct communication channel with the twins
- Quantum surveillance feed showing background activities
- Balanced twin interactions
- Styled messages with formatted text
- Anthropic/Claude integration

## Technical Implementation
- React-based frontend with TypeScript
- Split channel message processing
- Character configuration system
- Anthropic integration for responses

## Project Structure
```
eliza/
├── agent/
│   └── src/               # Core agent logic
├── characters/
│   └── bogdanoff.character.json  # Character configuration
├── client/
│   └── src/
│       ├── api/           # API integrations
│       ├── components/    # UI components
│       ├── hooks/         # Custom React hooks
│       ├── lib/          # Utility functions
│       ├── Agent.tsx     # Agent component
│       ├── Agents.tsx    # Agents list
│       ├── Chat.tsx      # Main chat interface
│       └── ...
├── docs/                  # Project documentation
│   └── docs/
│       └── guides/
│           └── bogdanoff/
│               ├── overview.md
│               ├── implementation.md
│               └── changelog.md
├── package.json
└── tsconfig.json
```

## Setup
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables
4. Run the development server: `pnpm dev`

## Development Status
Currently in active development with v1.0.0 featuring the split interface implementation.