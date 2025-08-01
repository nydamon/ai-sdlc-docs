# Cursor Guidelines

## ✅ Best Practices

- Use AI for **repetitive scaffolding**, boilerplate code, and test generation.
- Standardize reusable prompts in `.ai-prompts/`.
- Use AI to **refactor legacy code** or enhance readability.
- Use **structured prompt chaining** for multi-step logic creation.

## ❌ Anti-Patterns

- Don’t accept raw AI output without human review.
- Avoid vague prompts like "make it better" — be specific.
- Don’t generate business logic without clear acceptance criteria.

## 💡 Prompt Examples

```
Refactor this method to improve readability and reduce complexity.
Add Vitest unit tests with 80%+ coverage for this component.
Generate a Laravel controller with validation for the following fields...
```

## 📂 Cursor Configuration (`.cursorrc.json`)

```json
{
  "promptContext": ["./ai-prompts/"],
  "codebaseSize": "medium",
  "extensions": ["eslint", "prettier"],
  "contextRetention": true
}
```

## 📌 Developer Checklist

- [ ] Prompt is specific and goal-oriented.
- [ ] Code review includes AI output diff.
- [ ] All tests pass after AI-generated changes.
- [ ] AI usage logged via PostHog (optional).