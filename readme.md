# Wolf Charm Calculator Bot

A [wolf.live](https://wolf.live) bot for calculating charm prices, converting points, browsing store offers, and viewing daily tipping summaries.

## Features

| Command     | Description                                       |
| ----------- | ------------------------------------------------- |
| **help**    | Displays the help message.                        |
| **levels**  | Sends the charm levels image.                     |
| **offer**   | Lists available offers or shows a specific offer. |
| **point**   | Converts points to charms (multiples of 25).      |
| **price**   | Converts charms to points.                        |
| **prices**  | Sends the charms pricing image.                   |
| **summary** | Displays the daily tipping summary.               |

## Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- [pnpm](https://pnpm.io)

## Installation

```bash
pnpm install
```

## Configuration

Create a `.env` file in the project root:

```env
EMAIL=your_email
PASSWORD=your_password
```

## Usage

```bash
pnpm start
```

## Scripts

| Script             | Description                       |
| ------------------ | --------------------------------- |
| `pnpm start`       | Starts the bot.                   |
| `pnpm lint`        | Runs ESLint.                      |
| `pnpm lint:fix`    | Runs ESLint with auto-fix.        |
| `pnpm format`      | Formats code with Prettier.       |
| `pnpm format:check`| Checks formatting without changes.|

## Project Structure

```
wolf-charm-calc/
├── index.js              # Entry point - client setup and command registration
├── commands/
│   ├── index.js          # Command exports
│   ├── main.js           # Default command handler
│   ├── help.js           # Help command
│   ├── levels.js         # Levels image command
│   ├── offer.js          # Offers command
│   ├── point.js          # Points to charms converter
│   ├── price.js          # Charms to points converter
│   ├── prices.js         # Prices image command
│   └── summary.js        # Tipping summary command
├── charms/
│   ├── offer.js          # Offer fetching and formatting
│   ├── store.js          # Store API interactions
│   ├── tip.js            # Tipping leaderboard logic
│   ├── utility.js        # Shared formatting utilities
│   └── validate.js       # Input validation helpers
├── phrases/
│   ├── ar.json           # Arabic translations
│   └── en.json           # English translations
└── config/
    └── default.yaml      # Bot configuration
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
