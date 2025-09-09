# CupidEcho Bot Integration

This module provides a complete Botkit integration for the CupidEcho dating app, implemented with TypeScript and following proper code structure patterns.

## Features

- **TypeScript Support**: Fully typed bot implementation
- **Modular Architecture**: Organized handlers, middleware, and utilities
- **React Native Integration**: Seamless integration with existing chat system
- **Dating-Focused AI**: Specialized handlers for dating advice and assistance

## Structure

```
src/bot/
├── types/           # TypeScript interfaces and types
├── controllers/     # Main bot controller logic
├── handlers/        # Message handlers for different topics
├── middleware/      # Processing middleware
├── utils/          # Utility functions
├── plugins/        # Bot plugins (extensible)
├── BotManager.ts   # Main bot manager (singleton)
└── index.ts        # Module exports
```

## Usage

### Basic Bot Integration

```typescript
import { botManager } from '../bot';

// Initialize bot
await botManager.initialize();

// Process a message
const response = await botManager.processMessage(
  "I need help with my dating profile",
  userId,
  conversationId
);

// Check if message should trigger bot
const shouldRespond = botManager.shouldHandleMessage(message, conversationId);
```

### Using in React Native Components

```typescript
import { useBotIntegration } from '../hooks/useBotIntegration';

const ChatScreen = () => {
  const {
    botMessages,
    isProcessing,
    sendToBotAsync,
    shouldShowBot,
    initializeBotConversation
  } = useBotIntegration({
    userId: currentUser.id,
    conversationId: conversation.id,
    enabled: true
  });

  // Use botMessages to display bot responses
  // Call sendToBotAsync to send messages to bot
};
```

## Available Handlers

### 1. Welcome Handler
- Greets new users
- Introduces bot capabilities
- Provides navigation help

**Triggers**: "hello", "hi", "start", "help"

### 2. Profile Handler
- Profile optimization tips
- Photo selection advice
- Bio writing help

**Triggers**: "profile", "bio", "photo", "picture"

### 3. Matching Handler
- Compatibility advice
- Matching tips
- Preference optimization

**Triggers**: "match", "find", "compatible", "preferences"

### 4. Conversation Handler
- Conversation starters
- First message advice
- Flirting tips

**Triggers**: "conversation", "message", "starter", "icebreaker"

## Bot Commands

Users can interact with the bot using these commands:

- `help profile` - Get profile optimization tips
- `find matches` - Learn about finding compatible matches
- `conversation tips` - Get conversation starters and advice
- `dating advice` - General dating and relationship advice
- `photo tips` - Advice for choosing great profile photos
- `bio help` - Tips for writing an engaging bio

## Customization

### Adding New Handlers

```typescript
import { BotHandler, BotContext, BotResponse } from '../types';

export class CustomHandler implements BotHandler {
  canHandle(message: string, context: BotContext): boolean {
    // Your logic to determine if this handler should process the message
    return message.toLowerCase().includes('custom');
  }

  async handle(message: string, context: BotContext): Promise<BotResponse> {
    // Your custom response logic
    return {
      messages: [{
        id: 'custom-id',
        content: 'Custom response',
        timestamp: new Date(),
        type: 'text'
      }]
    };
  }
}
```

### Adding Middleware

```typescript
import { BotMiddleware, BotContext } from '../types';

export class CustomMiddleware implements BotMiddleware {
  async process(message: string, context: BotContext): Promise<BotContext> {
    // Process and enrich context
    return {
      ...context,
      // Your modifications
    };
  }
}
```

## Integration with Existing Chat

The bot integrates seamlessly with the existing chat system:

1. **Enhanced Chat Detail**: `EnhancedChatDetail.tsx` shows how to integrate bot into existing chat
2. **Bot Message Component**: `BotMessage.tsx` renders bot messages with special styling
3. **Chat Input Enhancement**: `ChatInput.tsx` enhanced to support bot toggle

## TypeScript Types

### Core Types

```typescript
interface BotMessage {
  id: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'suggestion' | 'action';
  metadata?: Record<string, any>;
}

interface BotContext {
  userId: string;
  conversationId: string;
  userProfile?: UserProfile;
  currentState?: BotState;
  history: BotMessage[];
}

interface BotResponse {
  messages: BotMessage[];
  nextState?: BotState;
  actions?: BotAction[];
}
```

## Configuration

The bot can be configured through the `BotManager`:

```typescript
// Register custom handlers
botManager.registerHandler('custom', new CustomHandler());

// Register middleware
botManager.registerMiddleware(new CustomMiddleware());

// Get bot statistics
const stats = botManager.getBotStats();
```

## Best Practices

1. **Handler Specificity**: Make handlers specific to avoid conflicts
2. **Context Management**: Use context to maintain conversation state
3. **Error Handling**: Always handle errors gracefully
4. **TypeScript**: Leverage TypeScript for better development experience
5. **Testing**: Test handlers independently

## Development

To extend the bot functionality:

1. Create new handlers in `src/bot/handlers/`
2. Add them to the controller in `CupidEchoBotController.ts`
3. Update types if needed in `src/bot/types/`
4. Test integration in chat components

## Examples

See the `EnhancedChatDetail.tsx` for a complete example of bot integration in a chat interface.