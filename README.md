# Todo List App - React + Vite

A React-based Todo List application that demonstrates component composition, state management, and API integration.

## Component Tree + Data Flow Diagram

```mermaid
graph TD
    %% Root Component
    A[App.jsx] --> TL[TodoList.jsx]
    
    %% Main TodoList Component
    TL --> ATF[AddTodoForm.jsx]
    TL --> TI[TodoItem.jsx]
    TL --> UTH[useTodos Hook]
    
    %% External API
    DJOSN[DummyJSON API<br/>https://dummyjson.com/todos] --> UTH
    
    %% Data Flow - State Management
    UTH --> |todos, isLoading, error| TL
    UTH --> |addTodo, deleteTodo, toggleTodo| TL
    
    %% Props Flow
    TL --> |onAdd: addTodo| ATF
    TL --> |todo, onDelete, onToggle| TI
    
    %% User Interactions
    ATF --> |handleSubmit| G[onAdd Function]
    TI --> |onClick| H[onDelete Function]
    TI --> |onChange| I[onToggle Function]
    
    %% Function Calls Back to Hook
    AT --> |addTodo| UTH
    DT --> |deleteTodo| UTH
    TT --> |toggleTodo| UTH
    
    %% State Updates
    UTH --> |setState| J[Local State<br/>todos, isLoading, error]

    %% Component Details
    subgraph "Component Details"
        N["AddTodoForm
        - Local state: text
        - Form submission
        - Input validation"]
        
        O["TodoItem
        - Displays todo text
        - Checkbox for completion
        - Delete button
        - Conditional styling"]
        
        P["useTodos Hook
        - Fetches todos from API
        - CRUD operations
        - Error handling
        - Loading states"]
    end
    
    %% Styling connections
    style A fill:#e1f5fe
    style TL fill:#f3e5f5
    style ATF fill:#e8f5e8
    style TI fill:#fff3e0
    style UTH fill:#fce4ec
    style DJOSN fill:#f0f4c3
```

## Architecture Overview

### Component Hierarchy
- **App.jsx**: Root component that renders the TodoList
- **TodoList.jsx**: Main container component that manages the todo list display
- **AddTodoForm.jsx**: Form component for adding new todos
- **TodoItem.jsx**: Individual todo item component with toggle and delete functionality

### Data Flow
1. **Initial Load**: `useTodos` hook fetches data from DummyJSON API
2. **State Management**: Hook manages todos array, loading, and error states
3. **User Actions**: Components trigger functions passed down as props
4. **State Updates**: Hook functions update local state and sync with API
5. **Re-rendering**: State changes trigger component re-renders

### Key Features
- **API Integration**: Fetches todos from external API
- **CRUD Operations**: Create, Read, Update, Delete functionality
- **Error Handling**: Graceful error states and fallbacks
- **Loading States**: Shows loading indicator during API calls
- **Local State**: Optimistic updates for better UX