# Todo List App - React + Vite

A React-based Todo List application that demonstrates component composition, state management, and API integration.

## Component Tree + Data Flow Diagram

```mermaid
flowchart TD
    App[App.jsx] --> TL[TodoList.jsx]
    TL --> AF[AddTodoForm.jsx]
    TL --> SB[SearchBar.jsx]
    TL --> PC[PaginationControls.jsx]
    TL --> TI[TodoItem.jsx]
    TL --> UH[useTodos.js]

    UH -->|Initial fetch| API[(DummyJSON API)]
    TL -->|User Input| UH
    AF -->|onAdd| UH
    TI -->|onToggle, onDelete, onEdit| UH
    SB -->|onChange| UH
    PC -->|goToNextPage, goToPrevPage, changeLimit| UH

    UH -->|Updates state: allTodos, todos, searchTerm, pagination| TL
    TL -->|Re-renders UI with filtered + paginated list| TI
```

## Architecture Overview

### Component Hierarchy
- **App.jsx**: Root component that renders the TodoList
- **TodoList.jsx**: Main container component that manages the todo list display
- **AddTodoForm.jsx**: Form component for adding new todos
- **TodoItem.jsx**: Individual todo item component with toggle and delete functionality
- **useTodos.js**: Custom hook that handles data fetching. CRUD operations, loading and error states. 

### Data Flow
1. **Initial Load**: `useTodos` hook fetches data from DummyJSON API
2. **State Management**: Hook manages todos array, loading, and error states
3. **User Actions**: Components trigger functions passed down as props
4. **State Updates**: Hook functions update local state and sync with API
5. **Re-rendering**: State changes trigger component re-renders

### Patterns
Container + Presentational Components
Custom Hook
Unidirectional Data Flow
Graceful Degradation
