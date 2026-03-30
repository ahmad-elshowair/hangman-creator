# Data Model: Config Payload

## Entities

### `CompactConfig`

This entity is the serialized state of the current game, used strictly for embedding inside the URL search parameter `?config=`.

**Fields:**

- `w` (`string[]`): The configured array of words to test the student against.
- `m` (`number`): The configured maximum mistakes allowed before game failure.

**Validation Rules:**

- `w` must be a non-empty array of valid length strings.
- `m` must be a positive integer > 0.

**Relationships:**

- Sent statelessly via Base64URL encoding to `useHangman` core logic state upon App Router hydration.
