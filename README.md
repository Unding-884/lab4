# Todo List App - React + Vite

A React-based Todo List application that demonstrates component composition, state management, and API integration.

## Component Tree + Data Flow Diagram

```mermaid
graph TD
    %% Root Component
    A[App.jsx] --> B[TodoList.jsx]
    
    %% Main TodoList Component
    B --> C[AddTodoForm.jsx]
    B --> D[TodoItem.jsx]
    B --> E[useTodos Hook]
    
    %% External API
    F[DummyJSON API<br/>https://dummyjson.com/todos] --> E
    
    %% Data Flow - State Management
    E --> |todos, isLoading, error| B
    E --> |addTodo, deleteTodo, toggleTodo| B
    
    %% Props Flow
    B --> |onAdd: addTodo| C
    B --> |todo, onDelete, onToggle| D
    
    %% User Interactions
    C --> |handleSubmit| G[onAdd Function]
    D --> |onClick| H[onDelete Function]
    D --> |onChange| I[onToggle Function]
    
    %% Function Calls Back to Hook
    G --> |addTodo| E
    H --> |deleteTodo| E
    I --> |toggleTodo| E
    
    %% State Updates
    E --> |setState| J[Local State<br/>todos, isLoading, error]
    
    %% Styling
    K[TodoList.css] --> B
    L[AddTodoForm.css] --> C
    M[TodoItem.css] --> D
    
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
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style E fill:#fce4ec
    style F fill:#f0f4c3
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