# Core Development Rules - Cline AI Assistant Configuration

## Workflow Management - Plan & Act Mode

### Always Use Plan Mode First

- Start all complex tasks in **Plan Mode** for analysis and strategy
- Analyze existing codebase structure and patterns before making changes
- Create implementation roadmap with clear steps
- Review security and compliance implications before execution
- Switch to **Act Mode** only after planning is complete and approved

### Plan Mode Best Practices

```
When given a complex task:
1. PLAN: Analyze the codebase structure and existing patterns
2. PLAN: Identify all files that need to be created or modified
3. PLAN: Consider security, compliance, and testing requirements
4. PLAN: Create step-by-step implementation strategy
5. ASK: Confirm the plan before proceeding to Act Mode
6. ACT: Execute the plan systematically with checkpoints
```

### Act Mode Execution

- Execute changes systematically following the approved plan
- Create checkpoints after each major change
- Validate results before proceeding to next step
- Maintain audit trail of all modifications made

## AI Model Usage Strategy

### Smart Model Selection

- **GPT-4o-mini**: Use for routine tasks, code generation, standard testing (80% of work)
- **Claude 3.5 Sonnet**: Use for complex analysis, architecture decisions, compliance review
- **DeepSeek-R1**: Use for planning-heavy tasks, cost optimization (97% cost reduction)
- **Template-based**: Fallback when APIs unavailable or for simple patterns

### Context Optimization

- Leverage repository awareness through memory bank
- Use MCP servers for enhanced tool integration
- Implement smart context management for large codebases
- Cache frequently used patterns and templates

## Code Quality Standards

### TypeScript/JavaScript Requirements

- **TypeScript strict mode** enabled for all new code
- **ESLint**: Zero errors allowed (warnings acceptable)
- **Prettier**: Automatic formatting on all files
- **Import organization**: External, internal, relative imports in order
- **Error boundaries**: Implement for all React components
- **Defensive programming**: Validate all inputs and handle edge cases

### React Component Standards

```typescript
// Required component structure
interface ComponentProps {
  // Explicit prop types
}

export const ComponentName: React.FC<ComponentProps> = ({
  prop1,
  prop2 = 'defaultValue'
}) => {
  // 1. State hooks first
  const [state, setState] = useState(initial);

  // 2. Effect hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // 3. Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // 4. Render logic with data-testid attributes
  return (
    <div data-testid="component-name">
      {/* JSX */}
    </div>
  );
};
```

### Laravel/PHP Standards

- **PHP 8.2+** features preferred
- **Service layer pattern** for business logic
- **Request validation classes** for all API endpoints
- **Resource classes** for API responses
- **Policy classes** for authorization
- **Repository pattern** for database access when complex

## File Management Rules

### Never Modify These Files

- `.env` files (contain sensitive API keys)
- `package-lock.json`, `composer.lock` (dependency locks)
- `.git/` directory and git hooks (unless specifically requested)
- `node_modules/`, `vendor/` directories
- Database migration files (unless explicitly asked to create new ones)

### Always Verify Before Changes

- Check import/require statements are correct
- Ensure proper TypeScript types are used
- Validate that async functions are properly awaited
- Confirm test files have proper structure and assertions
- Verify database tests use appropriate traits

## Memory Bank Integration

### Always Reference Memory Bank

Before starting any task, review relevant memory bank files:

- `project_brief.md` - Understanding business context
- `tech_stack.md` - Current technology choices
- `coding_standards.md` - Detailed code conventions
- `compliance_rules.md` - FCRA/FACTA requirements
- `architecture.md` - System design patterns
- `common_patterns.md` - Reusable code templates

### Update Memory Bank When Needed

If you discover new patterns or requirements during development:

1. Note the new pattern or requirement
2. Suggest updating the appropriate memory bank file
3. Maintain consistency with existing documentation

## Integration with AI-SDLC Framework

### Leverage Existing Tools

- Use `npm run ai:generate-tests` for batch test generation
- Work with existing Vitest/Playwright configurations
- Utilize the `real-ai-test-generator.js` for OpenAI integration
- Maintain compatibility with current git hooks and CI/CD pipelines

### Enhance Current Capabilities

- Add interactive debugging and test refinement
- Provide real-time feedback during development
- Offer intelligent suggestions for code improvement
- Help with complex multi-file refactoring scenarios

## Documentation Standards

### Function Documentation

Use JSDoc for TypeScript/JavaScript:

````typescript
/**
 * Brief description of function purpose
 *
 * @param parameter - Description of parameter
 * @returns Description of return value
 * @throws {ErrorType} When error condition occurs
 *
 * @example
 * ```typescript
 * const result = functionName(param);
 * ```
 */
````

### Code Comments

- Explain **why**, not **what**
- Document complex business logic
- Add TODO comments for future improvements
- Include links to relevant compliance documentation

### Git Commit Messages

Use conventional commit format:

```
type(scope): description

feat(auth): add FCRA compliance validation
fix(api): resolve PII encryption issue
docs(readme): update installation instructions
test(e2e): add credit dispute workflow tests
chore(deps): update dependencies
```

These core rules establish the foundation for all Cline AI interactions within The Credit Pros AI-SDLC framework, ensuring consistency, quality, and compliance across all development activities.
